'use client'

interface Props { onReady: () => void }

export default function Screen02Clones({ onReady }: Props) {
  return (
    <section className="screen">
      <div className="screen__bg screen__bg--left">
        <img src="/images/clones.png" alt="" />
      </div>
      <div className="screen__content">
        <div className="animate-up delay-1" style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(12px, 1.2vw, 14px)',
          fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase',
          color: 'var(--color-text-dim)', marginBottom: 8,
        }}>Эпизод I</div>

        <h2 className="animate-up delay-2" style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: 700, lineHeight: 1.05, textTransform: 'uppercase',
          marginBottom: 32,
        }}>
          Атака <span style={{ color: 'var(--color-danger-bright)' }}>клонов</span>
        </h2>

        <div className="animate-up delay-3" style={{
          fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.8vw, 19px)',
          lineHeight: 1.75, marginBottom: 40,
        }}>
          <p style={{ marginBottom: 16 }}>Армия одинаковых идей наступает со&nbsp;всех сторон.</p>
          <p style={{ marginBottom: 16, color: 'var(--color-text-dim)', fontStyle: 'italic' }}>
            «Обёртки для ChatGPT». «Саммаризаторы чего-нибудь». «Ещё один AI-ассистент». «Агрегатор того, что никому не&nbsp;нужно».
          </p>
          <p style={{ marginBottom: 16 }}>Без рынка, проблемы, клиентов. Миллионы клонов, которые выглядят как бизнес, но&nbsp;умирают, не&nbsp;сделав ни&nbsp;одной&nbsp;продажи.</p>
          <p style={{ marginBottom: 16 }}>Они атакуют&nbsp;— и&nbsp;если ты&nbsp;не&nbsp;научишься отличать живую идею от&nbsp;клона, ты&nbsp;потратишь месяцы на&nbsp;мертворождённый проект. Твоя задача&nbsp;— <em style={{ color: 'var(--color-danger-bright)', fontStyle: 'normal' }}>уничтожить их</em>.</p>
          <p>Справишься с&nbsp;задачей?</p>
        </div>

        <div className="animate-up delay-4">
          <button className="btn btn--red" onClick={onReady}>
            <span style={{ fontSize: '1.3em' }}>⚡</span> Я готов
          </button>
        </div>
      </div>
      <div className="screen__glow glow--red" />
    </section>
  )
}
