import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { evaluateArguments } from '@/lib/ai'

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })

  const { roundId, arguments: args } = await request.json()

  if (!roundId || !args || args.length !== 3) {
    return NextResponse.json({ error: 'Нужны 3 аргумента' }, { status: 400 })
  }

  const round = await prisma.round.findUnique({
    where: { id: roundId },
    include: { session: true },
  })

  if (!round) return NextResponse.json({ error: 'Раунд не найден' }, { status: 404 })

  // Оценка AI
  const evaluation = await evaluateArguments(round.ideaText, args as [string, string, string])

  // Обновляем раунд
  const result = evaluation.hit ? 'hit' : 'miss'
  await prisma.round.update({
    where: { id: roundId },
    data: {
      argument1: args[0],
      argument2: args[1],
      argument3: args[2],
      aiResponse: JSON.stringify(evaluation),
      result,
    },
  })

  if (evaluation.hit) {
    // Обновляем счётчик попаданий
    await prisma.gameSession.update({
      where: { id: round.sessionId },
      data: { hits: { increment: 1 } },
    })

    // Сохраняем критерии из принятых аргументов
    const acceptedCriteria = evaluation.arguments
      .filter(a => a.accepted && a.criterion)
      .map(a => ({
        userId: user.userId,
        text: a.criterion,
        roundId: round.id,
      }))

    if (acceptedCriteria.length > 0) {
      await prisma.criterion.createMany({ data: acceptedCriteria })
    }
  }

  // Проверяем, завершена ли игра (5 попаданий)
  const session = await prisma.gameSession.findUnique({
    where: { id: round.sessionId },
  })

  const gameComplete = session && session.hits >= 5

  return NextResponse.json({
    evaluation,
    result,
    gameComplete,
    hits: session?.hits || 0,
  })
}
