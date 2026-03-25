import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

// Получить или создать игровую сессию
export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })

  // Ищем активную сессию
  let session = await prisma.gameSession.findFirst({
    where: { userId: user.userId, status: 'in_progress' },
    include: {
      rounds: { orderBy: { roundNumber: 'asc' } },
    },
  })

  if (!session) {
    session = await prisma.gameSession.create({
      data: { userId: user.userId },
      include: { rounds: true },
    })
  }

  // Получаем критерии пользователя
  const criteria = await prisma.criterion.findMany({
    where: { userId: user.userId },
    orderBy: { createdAt: 'asc' },
  })

  return NextResponse.json({ session, criteria })
}

// Завершить сессию
export async function PATCH(request: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })

  const { sessionId } = await request.json()

  const session = await prisma.gameSession.update({
    where: { id: sessionId },
    data: { status: 'completed' },
  })

  return NextResponse.json({ session })
}
