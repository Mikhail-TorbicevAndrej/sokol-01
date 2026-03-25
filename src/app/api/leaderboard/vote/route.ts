import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })

  const { candidateId } = await request.json()

  if (candidateId === user.userId) {
    return NextResponse.json({ error: 'Нельзя голосовать за себя' }, { status: 400 })
  }

  // Проверяем, что голосовавший завершил игру
  const session = await prisma.gameSession.findFirst({
    where: { userId: user.userId, status: 'completed' },
  })
  if (!session) {
    return NextResponse.json({ error: 'Нужно завершить игру' }, { status: 403 })
  }

  // Проверяем, не голосовал ли уже
  const existing = await prisma.vote.findUnique({
    where: {
      voterId_candidateId: {
        voterId: user.userId,
        candidateId,
      },
    },
  })

  if (existing) {
    // Убираем голос (toggle)
    await prisma.vote.delete({ where: { id: existing.id } })
    return NextResponse.json({ voted: false })
  }

  await prisma.vote.create({
    data: {
      voterId: user.userId,
      candidateId,
    },
  })

  return NextResponse.json({ voted: true })
}
