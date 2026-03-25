import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  // Получаем всех пользователей, завершивших игру
  const users = await prisma.user.findMany({
    where: {
      sessions: { some: { status: 'completed' } },
    },
    include: {
      criteria: true,
      votesReceived: true,
      _count: {
        select: {
          criteria: true,
          votesReceived: true,
        },
      },
    },
    orderBy: {
      votesReceived: { _count: 'desc' },
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leaderboard = users.map((u: any) => ({
    id: u.id,
    name: u.name,
    criteriaCount: u._count.criteria,
    votesCount: u._count.votesReceived,
    criteria: u.criteria.map((c: { text: string }) => c.text),
  }))

  return NextResponse.json({ leaderboard })
}
