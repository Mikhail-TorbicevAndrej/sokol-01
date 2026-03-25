'use client'

import { useState, useEffect } from 'react'

interface LeaderboardEntry {
  id: string
  name: string
  criteriaCount: number
  votesCount: number
  criteria: string[]
}

interface Props {
  userId: string
  onComplete: () => void
}

export default function Screen08Leaderboard({ userId, onComplete }: Props) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<LeaderboardEntry | null>(null)
  const [votedFor, setVotedFor] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadLeaderboard()
  }, [])

  async function loadLeaderboard() {
    const res = await fetch('/api/leaderboard')
    const data = await res.json()
    setEntries(data.leaderboard || [])
    setLoading(false)
  }

  async function handleVote(candidateId: string) {
    const res = await fetch('/api/leaderboard/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ candidateId }),
    })
    const data = await res.json()

    setVotedFor(prev => {
      const next = new Set(prev)
      if (data.voted) next.add(candidateId)
      else next.delete(candidateId)
      return next
    })

    loadLeaderboard()
  }

  return (
    <section className="screen" style={{ justifyContent: 'flex-start', paddingTop: 60 }}>
      <div style={{
        position: 'absolute', inset: 0, background: 'var(--color-bg)', zIndex: 0,
      }} />
      <div className="screen__content" style={{ maxWidth: 800, width: '100%' }}>
        <h2 className="animate-up delay-1" style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.5vw, 52px)',
          fontWeight: 700, lineHeight: 1.1, textTransform: 'uppercase', marginBottom: 8,
        }}>
          <span style={{ color: 'var(--color-warm)' }}>Лидерборд</span>
        </h2>
        <p className="animate-up delay-2" style={{
          fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 1.5vw, 17px)',
          color: 'var(--color-text-dim)', marginBottom: 32,
        }}>Голосуй за лучшие критерии. Нажми на имя, чтобы посмотреть список.</p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <span className="spinner" />
          </div>
        ) : entries.length === 0 ? (
          <div className="card card--warm" style={{ textAlign: 'center', padding: 40 }}>
            <p style={{ color: 'var(--color-text-dim)', marginBottom: 16 }}>Пока никто не завершил миссию. Ты первый!</p>
          </div>
        ) : (
          <div className="animate-up delay-3" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {entries.map((entry, i) => (
              <div key={entry.id} className="card card--warm" style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700,
                  color: i < 3 ? 'var(--color-warm-bright)' : 'var(--color-text-dim)',
                  width: 30, textAlign: 'center',
                }}>{i + 1}</div>
                <button
                  onClick={() => setSelectedUser(entry)}
                  style={{
                    flex: 1, background: 'none', border: 'none', textAlign: 'left',
                    cursor: 'pointer', fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(15px, 1.5vw, 17px)', color: 'var(--color-text)',
                  }}
                >
                  {entry.name}
                  <span style={{ color: 'var(--color-text-dim)', fontSize: 13, marginLeft: 8 }}>
                    {entry.criteriaCount} критериев
                  </span>
                </button>
                {entry.id !== userId && (
                  <button
                    onClick={() => handleVote(entry.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      background: votedFor.has(entry.id) ? 'rgba(212,160,74,0.15)' : 'transparent',
                      border: '1px solid rgba(212,160,74,0.3)',
                      borderRadius: 4, padding: '6px 12px',
                      cursor: 'pointer', color: 'var(--color-warm)',
                      fontFamily: 'var(--font-mono)', fontSize: 13,
                      transition: 'all 0.2s',
                    }}
                  >
                    ▲ {entry.votesCount}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="animate-up delay-4" style={{ marginTop: 32 }}>
          <button className="btn btn--green" onClick={onComplete}>
            Миссия выполнена <span className="btn__arrow">→</span>
          </button>
        </div>
      </div>

      {/* Попап с критериями */}
      {selectedUser && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setSelectedUser(null) }}>
          <div className="modal">
            <button onClick={() => setSelectedUser(null)} style={{
              position: 'absolute', top: 16, right: 16, background: 'none',
              border: 'none', color: 'var(--color-text-dim)', fontSize: 28,
              cursor: 'pointer', lineHeight: 1, padding: 4,
            }}>×</button>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.5vw, 26px)',
              fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-warm)',
              marginBottom: 20,
            }}>Критерии: {selectedUser.name}</h2>
            {selectedUser.criteria.map((c, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                marginBottom: 12, fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.6,
              }}>
                <span style={{ color: 'var(--color-green)', flexShrink: 0 }}>◆</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
