'use client'

import { useState, useEffect } from 'react'

interface RoundData {
  id: string
  roundNumber: number
  ideaText: string
}

interface Props {
  round: RoundData | null
  onGenerateIdea: () => Promise<void>
  onFire: (args: [string, string, string]) => Promise<unknown>
  hits: number
}

export default function Screen04Attack({ round, onGenerateIdea, onFire, hits }: Props) {
  const [args, setArgs] = useState(['', '', ''])
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    if (!round) {
      setGenerating(true)
      onGenerateIdea().finally(() => setGenerating(false))
    }
    setArgs(['', '', ''])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!round && !generating) {
      setGenerating(true)
      onGenerateIdea().finally(() => setGenerating(false))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round])

  async function handleFire() {
    if (args.some(a => !a.trim())) return
    setLoading(true)
    await onFire(args as [string, string, string])
    setLoading(false)
  }

  return (
    <section className="screen">
      <div className="screen__bg">
        <img src="/images/target.png" alt="" style={{ objectPosition: 'center center' }} />
      </div>
      <div className="screen__content">
        <div className="animate-up delay-1 status status--red">
          <div className="status__dot" />
          тревога — входящий объект
        </div>

        <h2 className="animate-up delay-2" style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5.5vw, 64px)',
          fontWeight: 700, lineHeight: 1.1, textTransform: 'uppercase', marginBottom: 28,
        }}>
          Тебя <span style={{ color: 'var(--color-danger-bright)' }}>атакуют!</span>
        </h2>

        {/* Карточка с идеей */}
        <div className="animate-up delay-3 card card--warm" style={{ marginBottom: 32 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--color-warm)', marginBottom: 12,
          }}>/// входящая идея</div>
          {generating ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="spinner" style={{ width: 24, height: 24, borderWidth: 2 }} />
              <span style={{ color: 'var(--color-text-dim)', fontStyle: 'italic' }}>Сканирование цели...</span>
            </div>
          ) : (
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.6vw, 18px)',
              lineHeight: 1.7,
            }}>{round?.ideaText}</div>
          )}
        </div>

        {/* Пушки */}
        <div className="animate-up delay-4" style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--color-danger-bright)', background: 'rgba(231,76,60,0.1)',
                border: '1px solid rgba(231,76,60,0.3)',
                padding: '8px 12px', borderRadius: 4, whiteSpace: 'nowrap', flexShrink: 0,
              }}>Пушка {i}</div>
              <input
                className="input input--cannon"
                type="text"
                placeholder={i === 1 ? 'Почему нет? Первая причина...' : i === 2 ? 'Вторая причина...' : 'Третья причина...'}
                value={args[i - 1]}
                onChange={e => {
                  const newArgs = [...args]
                  newArgs[i - 1] = e.target.value
                  setArgs(newArgs)
                }}
                disabled={loading || generating}
              />
            </div>
          ))}
        </div>

        <div className="animate-up delay-5">
          <button
            className="btn btn--fire"
            onClick={handleFire}
            disabled={loading || generating || args.some(a => !a.trim())}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2, borderTopColor: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} />
                Расчёт траектории...
              </span>
            ) : (
              <>🔥 Огонь</>
            )}
          </button>
        </div>
      </div>
      <div className="screen__glow glow--red" />
    </section>
  )
}
