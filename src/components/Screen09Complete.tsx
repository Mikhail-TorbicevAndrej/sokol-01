'use client'

import { useState, useEffect } from 'react'

export default function Screen09Complete() {
  const [timeLeft, setTimeLeft] = useState({ h: '--', m: '--', s: '--' })
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    // 26 марта 2026, 12:00 МСК = 09:00 UTC
    const target = new Date('2026-03-26T09:00:00Z')

    function update() {
      const now = new Date()
      let diff = target.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft({ h: '00', m: '00', s: '00' })
        setExpired(true)
        return
      }

      const h = Math.floor(diff / 3600000)
      diff %= 3600000
      const m = Math.floor(diff / 60000)
      diff %= 60000
      const s = Math.floor(diff / 1000)

      setTimeLeft({
        h: String(h).padStart(2, '0'),
        m: String(m).padStart(2, '0'),
        s: String(s).padStart(2, '0'),
      })
    }

    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="screen screen--center">
      <div className="screen__bg screen__bg--radial">
        <img src="/images/complete.png" alt="" />
      </div>
      <div className="screen__content screen__content--narrow" style={{ textAlign: 'center' }}>
        <div className="animate-up delay-1 status status--green" style={{ justifyContent: 'center' }}>
          <div className="status__dot" style={{ boxShadow: '0 0 10px var(--color-green), 0 0 20px rgba(61,220,132,0.3)' }} />
          mission complete
        </div>

        <h2 className="animate-up delay-2" style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 7vw, 80px)',
          fontWeight: 700, lineHeight: 1.05, textTransform: 'uppercase', marginBottom: 14,
        }}>
          Миссия <span style={{ color: 'var(--color-green)' }}>выполнена</span>
        </h2>
        <p className="animate-up delay-3" style={{
          fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.8vw, 21px)',
          color: 'var(--color-text-dim)', marginBottom: 48,
        }}>Клоны уничтожены. Координаты получены.</p>

        <div className="animate-up delay-4" style={{ marginBottom: 40 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 'clamp(11px, 1.1vw, 13px)',
            fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--color-warm)', marginBottom: 20,
          }}>
            {expired ? 'миссия началась' : 'старт следующей миссии через'}
          </div>

          <div style={{
            display: 'flex', justifyContent: 'center', gap: 'clamp(12px, 3vw, 28px)',
          }}>
            {[
              { value: timeLeft.h, label: 'часов' },
              { value: timeLeft.m, label: 'минут' },
              { value: timeLeft.s, label: 'секунд' },
            ].map((unit, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 28px)' }}>
                {i > 0 && (
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontWeight: 700,
                    fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--color-warm)',
                    animation: 'blink-colon 1s ease-in-out infinite',
                  }}>:</span>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontWeight: 700,
                    fontSize: 'clamp(36px, 6vw, 64px)',
                    color: 'var(--color-warm-bright)', lineHeight: 1,
                    minWidth: '2ch',
                    background: 'rgba(10,10,12,0.6)',
                    border: '1px solid rgba(212,160,74,0.2)',
                    borderRadius: 6,
                    padding: 'clamp(8px, 1.5vw, 16px) clamp(12px, 2vw, 24px)',
                  }}>{unit.value}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 'clamp(9px, 1vw, 12px)',
                    fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: 'var(--color-text-dim)',
                  }}>{unit.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-up delay-5" style={{
          fontFamily: 'var(--font-body)', fontSize: 'clamp(13px, 1.3vw, 15px)',
          color: 'var(--color-text-dim)',
        }}>
          <strong style={{ color: 'var(--color-warm)', fontWeight: 400 }}>26 марта, 12:00 МСК</strong> — Эпизод II
        </div>

        {expired && (
          <div className="animate-up" style={{ marginTop: 32 }}>
            <button className="btn btn--warm">
              Войти в Акт II <span className="btn__arrow">→</span>
            </button>
          </div>
        )}
      </div>
      <div className="screen__glow glow--green" style={{ height: 4 }} />
    </section>
  )
}
