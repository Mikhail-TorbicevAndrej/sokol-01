'use client'

import { useState } from 'react'
import Stars from './Stars'

interface Props {
  onRegister: (name: string, email: string) => Promise<void>
  onLogin: (email: string, password: string) => Promise<void>
  generatedPassword: string | null
}

export default function Screen01Hero({ onRegister, onLogin, generatedPassword }: Props) {
  const [mode, setMode] = useState<'register' | 'login'>('register')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showStory, setShowStory] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'register') {
        if (!agree) { setError('Необходимо согласиться с политикой'); setLoading(false); return }
        await onRegister(name, email)
        setShowPassword(true)
      } else {
        await onLogin(email, password)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка')
    }
    setLoading(false)
  }

  // Показываем модалку с паролем после регистрации
  if (showPassword && generatedPassword) {
    return (
      <section className="screen" style={{ justifyContent: 'flex-end' }}>
        <div className="screen__bg screen__bg--hero">
          <img src="/images/ship.jpg" alt="" />
        </div>
        <Stars />
        <div className="screen__content" style={{ maxWidth: 960 }}>
          <div className="card card--warm" style={{ maxWidth: 480 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-green)', marginBottom: 16 }}>
              /// допуск получен
            </div>
            <p style={{ marginBottom: 16 }}>Ваш пароль для входа:</p>
            <div style={{
              background: 'rgba(240,192,96,0.1)',
              border: '1px solid rgba(240,192,96,0.3)',
              borderRadius: 4,
              padding: '16px 20px',
              fontFamily: 'var(--font-mono)',
              fontSize: 24,
              color: 'var(--color-warm-bright)',
              letterSpacing: '0.15em',
              textAlign: 'center',
              marginBottom: 16,
            }}>
              {generatedPassword}
            </div>
            <p style={{ fontSize: 14, color: 'var(--color-text-dim)', marginBottom: 24 }}>
              Пароль отправлен на вашу почту. Запомните его или сохраните.
            </p>
            <button className="btn btn--warm" onClick={() => setShowPassword(false)} style={{ width: '100%', justifyContent: 'center' }}>
              На борт <span className="btn__arrow">→</span>
            </button>
          </div>
        </div>
        <div className="screen__glow glow--warm" />
      </section>
    )
  }

  return (
    <>
      <section className="screen" style={{ justifyContent: 'flex-end' }}>
        <div className="screen__bg screen__bg--hero">
          <img src="/images/ship.jpg" alt="" />
        </div>
        <Stars />
        <div className="screen__content" style={{ maxWidth: 960 }}>
          <h1 className="animate-up delay-1" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            color: 'var(--color-text)',
            marginBottom: 6,
          }}>
            Сокол <span style={{ color: 'var(--color-warm-bright)' }}>0→1</span>
          </h1>
          <p className="animate-up delay-2" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(14px, 1.6vw, 20px)',
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-text-dim)',
            marginBottom: 36,
          }}>Найди идею за один день</p>

          {/* Капитан */}
          <div className="animate-up delay-3" style={{ display: 'flex', alignItems: 'flex-start', gap: 28, marginBottom: 36 }}>
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <img src="/images/captain.jpg" alt="Андрей Торбичев" style={{
                width: 130, height: 130, borderRadius: '50%', objectFit: 'cover',
                border: '2.5px solid var(--color-warm)',
                boxShadow: '0 0 30px rgba(212,160,74,0.25), 0 0 60px rgba(212,160,74,0.1)',
              }} />
              <button onClick={() => setShowStory(true)} style={{
                fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-warm)',
                background: 'none', border: 'none', borderBottom: '1px solid rgba(212,160,74,0.3)',
                cursor: 'pointer', whiteSpace: 'nowrap',
              }}>история капитана</button>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(13px, 1.3vw, 15px)',
                fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--color-warm)', marginBottom: 14,
              }}>Андрей Торбичев, капитан Сокола</div>
              <blockquote style={{
                fontFamily: 'var(--font-body)', fontSize: 'clamp(17px, 1.9vw, 21px)',
                lineHeight: 1.7, fontStyle: 'italic', paddingLeft: 24,
                borderLeft: '3px solid var(--color-warm)',
              }}>
                <p style={{ marginBottom: 14 }}>Я&nbsp;нанялся на&nbsp;дело, в&nbsp;которое не&nbsp;верил. А&nbsp;вышел с&nbsp;идеей, ради которой рискую&nbsp;всем.</p>
                <p>В&nbsp;такое&nbsp;же путешествие приглашаю тебя. Ты&nbsp;берёшь миссию, в&nbsp;которую не&nbsp;веришь. Но&nbsp;к&nbsp;финалу вернёшься и&nbsp;разнесёшь <strong style={{ color: 'var(--color-warm)', fontStyle: 'normal', fontWeight: 400 }}>Звезду Смерти</strong> в&nbsp;клочья.</p>
              </blockquote>
            </div>
          </div>

          {/* Форма */}
          <div className="animate-up delay-4" style={{ maxWidth: 420 }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
              <button
                onClick={() => { setMode('register'); setError('') }}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.15em',
                  textTransform: 'uppercase', background: 'none', border: 'none',
                  color: mode === 'register' ? 'var(--color-warm)' : 'var(--color-text-dim)',
                  borderBottom: mode === 'register' ? '2px solid var(--color-warm)' : '2px solid transparent',
                  paddingBottom: 4, cursor: 'pointer',
                }}
              >Допуск к полёту</button>
              <button
                onClick={() => { setMode('login'); setError('') }}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.15em',
                  textTransform: 'uppercase', background: 'none', border: 'none',
                  color: mode === 'login' ? 'var(--color-warm)' : 'var(--color-text-dim)',
                  borderBottom: mode === 'login' ? '2px solid var(--color-warm)' : '2px solid transparent',
                  paddingBottom: 4, cursor: 'pointer',
                }}
              >Войти</button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {mode === 'register' && (
                <input className="input" type="text" placeholder="Имя" value={name} onChange={e => setName(e.target.value)} required />
              )}
              <input className="input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
              {mode === 'login' && (
                <input className="input" type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} required />
              )}
              {mode === 'register' && (
                <label className="checkbox-wrap" style={{ fontSize: 13, color: 'var(--color-text-dim)' }}>
                  <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} />
                  <span>Соглашаюсь с <a href="/privacy" target="_blank" style={{ color: 'var(--color-warm)', textDecoration: 'underline' }}>политикой обработки персональных данных</a></span>
                </label>
              )}
              {error && <div style={{ color: 'var(--color-danger-bright)', fontSize: 14 }}>{error}</div>}
              <button className="btn btn--warm" type="submit" disabled={loading} style={{ marginTop: 8 }}>
                {loading ? <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> : (
                  <>{mode === 'register' ? 'На борт' : 'Войти'} <span className="btn__arrow">→</span></>
                )}
              </button>
            </form>
          </div>
        </div>
        <div className="screen__glow glow--warm" />
      </section>

      {/* Модалка — история капитана */}
      {showStory && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowStory(false) }}>
          <div className="modal">
            <button onClick={() => setShowStory(false)} style={{
              position: 'absolute', top: 16, right: 16, background: 'none',
              border: 'none', color: 'var(--color-text-dim)', fontSize: 28,
              cursor: 'pointer', lineHeight: 1, padding: 4,
            }}>×</button>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 30px)',
              fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-warm)',
              marginBottom: 24,
            }}>История капитана</h2>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.8 }}>
              <p style={{ marginBottom: 18 }}>На&nbsp;связи Андрей Торбичев, капитан Сокола «0→1».</p>
              <p style={{ marginBottom: 18 }}>Я&nbsp;был циничным наёмником, который думал: «Хочу денег; нужна идея, которая стрельнет». Мотивация&nbsp;— чисто бабки, чтобы отдать долг злобному Джаббе.</p>
              <p style={{ marginBottom: 18 }}>И&nbsp;нанялся на&nbsp;дело, в&nbsp;которое не&nbsp;верил. 5&nbsp;лет я&nbsp;занимался не&nbsp;тем. Я, который всегда был стартапером, строителем, инвестором&nbsp;— перестал строить. Перестал запускать. Предал себя.</p>
              <p style={{ marginBottom: 18 }}>А&nbsp;потом появился ИИ. И&nbsp;я&nbsp;увидел то, что изменило всё: барьеры, которые раньше отделяли «обычного человека» от&nbsp;фаундера&nbsp;— <em style={{ color: 'var(--color-warm)', fontStyle: 'normal' }}>рухнули</em>.</p>
              <p style={{ marginBottom: 18 }}>И&nbsp;я&nbsp;вышел с&nbsp;идеей, в&nbsp;которую верю. Не&nbsp;«учить других». А&nbsp;<em style={{ color: 'var(--color-warm)', fontStyle: 'normal' }}>делать фаундеров</em>.</p>
              <p>Я&nbsp;хочу, чтобы фаундеров становилось больше. Чтобы продуктов становилось больше. Чтобы люди делали своё, а&nbsp;не&nbsp;тратили жизнь на&nbsp;чужое.</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
