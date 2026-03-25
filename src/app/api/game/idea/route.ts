import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { generateIdea } from '@/lib/ai'

// Генерация новой идеи для текущего раунда
export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })

  const { sessionId } = await request.json()

  const session = await prisma.gameSession.findUnique({
    where: { id: sessionId },
    include: { rounds: { orderBy: { roundNumber: 'asc' } } },
  })

  if (!session) return NextResponse.json({ error: 'Сессия не найдена' }, { status: 404 })

  // Проверяем, нет ли уже активного раунда (pending)
  const pendingRound = session.rounds.find((r: { result: string }) => r.result === 'pending')
  if (pendingRound) {
    return NextResponse.json({ round: pendingRound })
  }

  const roundNumber = session.hits + 1
  const previousIdeas = session.rounds.map((r: { ideaText: string }) => r.ideaText)

  // Генерируем идею
  const ideaText = await generateIdea(roundNumber, previousIdeas)

  // Создаём раунд
  const round = await prisma.round.create({
    data: {
      sessionId: session.id,
      roundNumber,
      ideaText,
    },
  })

  return NextResponse.json({ round })
}
