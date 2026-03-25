'use client'

interface Props {
  criteria: string[]
  onSubmit: () => Promise<void>
  onMore: () => void
}

export default function Screen07Coordinates({ criteria, onSubmit, onMore }: Props) {
  return (
    <section className="screen">
      <div className="screen__bg screen__bg--left">
        <img src="/images/navmap.png" alt="" />
      </div>
      <div className="screen__content" style={{ maxWidth: 740 }}>
        <div className="animate-up delay-1 status status--green">
          <div className="status__dot" />
          сражение завершено
        </div>

        <h2 className="animate-up delay-2" style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 5vw, 58px)',
          fontWeight: 700, lineHeight: 1.1, textTransform: 'uppercase', marginBottom: 8,
        }}>
          Координаты <span style={{ color: 'var(--color-green)' }}>получены</span>
        </h2>
        <p className="animate-up delay-2" style={{
          fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 1.5vw, 17px)',
          color: 'var(--color-text-dim)', marginBottom: 24,
        }}>Критерии, которым должен удовлетворять твой продукт</p>

        <div className="animate-up delay-3 card card--green" style={{ marginBottom: 32 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--color-green)', marginBottom: 16,
          }}>/// бортовой навигатор — {criteria.length} координат</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px' }}>
            {criteria.map((c, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 8,
                fontFamily: 'var(--font-body)', fontSize: 'clamp(13px, 1.3vw, 15px)', lineHeight: 1.5,
              }}>
                <div style={{ color: 'var(--color-green)', flexShrink: 0, fontSize: 11, marginTop: 4 }}>◆</div>
                <div>{c}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-up delay-4" style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <button className="btn btn--green" onClick={onSubmit}>
            Ввести в бортовой компьютер <span className="btn__arrow">→</span>
          </button>
          <button onClick={onMore} style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(13px, 1.3vw, 15px)',
            color: 'var(--color-warm)', background: 'none', border: 'none',
            borderBottom: '1px solid rgba(212,160,74,0.3)',
            cursor: 'pointer', paddingBottom: 1,
          }}>Уточнить координаты</button>
        </div>
      </div>
      <div className="screen__glow glow--green" />
    </section>
  )
}
