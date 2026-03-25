'use client'

import type { EvaluationResult } from '@/app/page'

interface Props {
  evaluation: EvaluationResult | null
  hits: number
  onContinue: () => void
  gameComplete: boolean
}

export default function Screen05Hit({ evaluation, hits, onContinue, gameComplete }: Props) {
  const acceptedCriteria = evaluation?.arguments.filter(a => a.accepted).map(a => a.criterion) || []

  return (
    <section className="screen">
      <div className="screen__bg">
        <img src="/images/explosion.png" alt="" style={{ objectPosition: 'center 35%' }} />
      </div>
      <div className="screen__content" style={{ maxWidth: 780 }}>
        <div className="animate-up delay-1 status status--green">
          <div className="status__dot" />
          цель поражена
        </div>

        <h2 className="animate-up delay-2" style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 5.5vw, 64px)',
          fontWeight: 700, lineHeight: 1.1, textTransform: 'uppercase', marginBottom: 12,
        }}>
          Ты&nbsp;попал в&nbsp;цель. Объект <span style={{ color: 'var(--color-green)' }}>уничтожен!</span>
        </h2>
        <p className="animate-up delay-2" style={{
          fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.7vw, 20px)',
          color: 'var(--color-text-dim)', marginBottom: 36,
        }}>Из&nbsp;обломков извлечены координаты для&nbsp;навигации</p>

        <div className="animate-up delay-3 card card--green" style={{ marginBottom: 40 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--color-green)', marginBottom: 18,
          }}>/// координаты зафиксированы</div>
          {acceptedCriteria.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
              <div style={{ color: 'var(--color-green)', flexShrink: 0, marginTop: 2 }}>✓</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.6vw, 18px)', lineHeight: 1.6 }}>{c}</div>
            </div>
          ))}
        </div>

        <div className="animate-up delay-4">
          <button className="btn btn--green" onClick={onContinue}>
            {gameComplete ? 'Завершить сражение' : 'Продолжить сражение'}
            <span className="btn__arrow">→</span>
          </button>
        </div>
      </div>
      <div className="screen__glow glow--green" />
    </section>
  )
}
