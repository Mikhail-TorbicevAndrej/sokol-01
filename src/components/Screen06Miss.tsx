'use client'

import type { EvaluationResult } from '@/app/page'

interface Props {
  evaluation: EvaluationResult | null
  onRetry: () => void
}

export default function Screen06Miss({ evaluation, onRetry }: Props) {
  return (
    <section className="screen">
      <div className="screen__bg">
        <img src="/images/miss.png" alt="" style={{ objectPosition: 'center 35%' }} />
      </div>
      <div className="screen__content" style={{ maxWidth: 780 }}>
        <div className="animate-up delay-1 status status--red">
          <div className="status__dot" />
          промах
        </div>

        <h2 className="animate-up delay-2" style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5.5vw, 64px)',
          fontWeight: 700, lineHeight: 1.1, textTransform: 'uppercase', marginBottom: 12,
        }}>
          Ты <span style={{ color: 'var(--color-danger-bright)' }}>промахнулся</span>
        </h2>
        <p className="animate-up delay-2" style={{
          fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.7vw, 20px)',
          color: 'var(--color-text-dim)', marginBottom: 32,
        }}>Твои аргументы неконкретные. Враг увернулся.</p>

        <div className="animate-up delay-3" style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
          {evaluation?.arguments.map((arg, i) => (
            <div key={i} className="card card--red" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 500,
                color: 'var(--color-danger-bright)',
                background: 'rgba(231,76,60,0.1)',
                border: '1px solid rgba(231,76,60,0.25)',
                width: 32, height: 32, borderRadius: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>{arg.accepted ? '✓' : '✗'}</div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 1.4vw, 16px)',
                  color: 'var(--color-text-dim)', fontStyle: 'italic',
                  marginBottom: 8,
                  textDecoration: arg.accepted ? 'none' : 'line-through',
                  textDecorationColor: 'rgba(231,76,60,0.4)',
                }}>«{arg.text}»</div>
                {!arg.accepted && arg.feedback && (
                  <div style={{
                    fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 1.4vw, 16px)',
                    lineHeight: 1.6,
                  }}>
                    <strong style={{ color: 'var(--color-danger-bright)', fontWeight: 400 }}>Слишком общо. </strong>
                    {arg.feedback}
                  </div>
                )}
                {arg.accepted && (
                  <div style={{ color: 'var(--color-green)', fontSize: 'clamp(14px, 1.4vw, 16px)' }}>
                    Принято ✓
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="animate-up delay-4">
          <button className="btn btn--warm" onClick={onRetry}>
            Понял. Продолжить сражение <span className="btn__arrow">→</span>
          </button>
        </div>
      </div>
      <div className="screen__glow glow--red" />
    </section>
  )
}
