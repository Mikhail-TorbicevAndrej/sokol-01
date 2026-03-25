'use client'

interface Props { onStart: () => void }

export default function Screen03Xwing({ onStart }: Props) {
  return (
    <section className="screen">
      <div className="screen__bg screen__bg--top">
        <img src="/images/xwing.png" alt="" style={{ objectPosition: 'center 40%' }} />
      </div>
      <div className="screen__content" style={{ maxWidth: 780 }}>
        <div className="animate-up delay-1" style={{
          fontFamily: 'var(--font-mono)', fontSize: 'clamp(11px, 1.1vw, 13px)',
          fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--color-green)', marginBottom: 12,
        }}>/// бортовой компьютер</div>

        <h2 className="animate-up delay-2" style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 700, lineHeight: 1.1, textTransform: 'uppercase', marginBottom: 36,
        }}>
          Инструкция по&nbsp;управлению <span style={{ color: 'var(--color-green)' }}>X‑wing</span>
        </h2>

        <div className="animate-up delay-3" style={{ marginBottom: 36 }}>
          {[
            'Ты — жёсткий венчурный инвестор',
            'Тебя атакуют люди с идеями, которые просят деньги',
            <span key="n">Твоя задача — сказать им <strong style={{ color: 'var(--color-green)', fontWeight: 400 }}>«НЕТ»</strong></span>,
            'Но не просто сказать, а объяснить почему. Три чётких и конкретных причины',
          ].map((text, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 20, alignItems: 'flex-start' }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500,
                color: 'var(--color-green)', background: 'rgba(61,220,132,0.1)',
                border: '1px solid rgba(61,220,132,0.25)',
                width: 32, height: 32, borderRadius: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: 2,
              }}>0{i + 1}</div>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.7vw, 19px)', lineHeight: 1.6,
              }}>{text}</div>
            </div>
          ))}
        </div>

        <div className="animate-up delay-4" style={{ display: 'flex', gap: 20, marginBottom: 40, flexWrap: 'wrap' }}>
          <div style={{
            flex: 1, minWidth: 240, padding: 20, borderRadius: 4,
            background: 'rgba(10,10,12,0.85)',
            border: '1px solid rgba(61,220,132,0.35)',
            fontSize: 'clamp(13px, 1.3vw, 15px)', lineHeight: 1.65,
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-green)', marginBottom: 12 }}>
              Правильно = конкретно
            </div>
            {['Долгий цикл сделки и нужен большой отдел B2B-сейлзов', 'Рынок слишком мал. Нет людей с такой болью', 'Требуется платный трафик в больших объёмах'].map((t, i) => (
              <p key={i} style={{ marginBottom: 8 }}><span style={{ color: 'var(--color-green)' }}>✓ </span>{t}</p>
            ))}
          </div>
          <div style={{
            flex: 1, minWidth: 240, padding: 20, borderRadius: 4,
            background: 'rgba(10,10,12,0.85)',
            border: '1px solid rgba(231,76,60,0.35)',
            fontSize: 'clamp(13px, 1.3vw, 15px)', lineHeight: 1.65,
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-danger-bright)', marginBottom: 12 }}>
              Неправильно = в общем
            </div>
            {['Идея — херня', 'Полная шляпа', 'Ерунда на постном масле'].map((t, i) => (
              <p key={i} style={{ marginBottom: 8 }}><span style={{ color: 'var(--color-danger-bright)' }}>✗ </span>{t}</p>
            ))}
          </div>
        </div>

        <div className="animate-up delay-5">
          <button className="btn btn--green" onClick={onStart}>
            Всё понял. Вперёд <span className="btn__arrow">→</span>
          </button>
        </div>
      </div>
      <div className="screen__glow glow--green" />
    </section>
  )
}
