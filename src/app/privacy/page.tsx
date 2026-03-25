export default function Privacy() {
  return (
    <div style={{
      background: 'var(--color-bg)',
      minHeight: '100vh',
      padding: 'clamp(32px, 5vh, 60px) clamp(24px, 6vw, 120px)',
    }}>
      <div style={{ maxWidth: 720 }}>
        <a href="/" style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-warm)',
          textDecoration: 'none', marginBottom: 32, display: 'inline-block',
          letterSpacing: '0.1em',
        }}>← Вернуться на главную</a>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text)',
          marginBottom: 32,
        }}>Политика конфиденциальности</h1>

        <div style={{
          fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.6vw, 17px)',
          lineHeight: 1.8, color: 'var(--color-text)',
        }}>
          <p style={{ marginBottom: 20 }}>Дата последнего обновления: 25 марта 2026 г.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--color-warm)', marginTop: 32, marginBottom: 12, textTransform: 'uppercase' }}>1. Общие положения</h2>
          <p style={{ marginBottom: 16 }}>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей веб-приложения «СОКОЛ 0→1» (далее — Сервис), расположенного по адресу sokol01.torbichev.com.</p>
          <p style={{ marginBottom: 16 }}>Оператор персональных данных: ИП Торбичев Андрей (далее — Оператор).</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--color-warm)', marginTop: 32, marginBottom: 12, textTransform: 'uppercase' }}>2. Собираемые данные</h2>
          <p style={{ marginBottom: 16 }}>При регистрации в Сервисе пользователь предоставляет следующие персональные данные:</p>
          <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
            <li style={{ marginBottom: 8 }}>Имя (псевдоним)</li>
            <li style={{ marginBottom: 8 }}>Адрес электронной почты (email)</li>
          </ul>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--color-warm)', marginTop: 32, marginBottom: 12, textTransform: 'uppercase' }}>3. Цели обработки</h2>
          <p style={{ marginBottom: 16 }}>Персональные данные обрабатываются в следующих целях:</p>
          <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
            <li style={{ marginBottom: 8 }}>Регистрация и идентификация пользователя в Сервисе</li>
            <li style={{ marginBottom: 8 }}>Предоставление доступа к функциональности Сервиса</li>
            <li style={{ marginBottom: 8 }}>Отправка пароля доступа на email пользователя</li>
            <li style={{ marginBottom: 8 }}>Отображение имени в лидерборде Сервиса</li>
          </ul>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--color-warm)', marginTop: 32, marginBottom: 12, textTransform: 'uppercase' }}>4. Хранение и защита</h2>
          <p style={{ marginBottom: 16 }}>Пароли хранятся в зашифрованном виде (bcrypt). Персональные данные хранятся на защищённых серверах и не передаются третьим лицам, за исключением случаев, предусмотренных законодательством РФ.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--color-warm)', marginTop: 32, marginBottom: 12, textTransform: 'uppercase' }}>5. Права пользователя</h2>
          <p style={{ marginBottom: 16 }}>Пользователь вправе:</p>
          <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
            <li style={{ marginBottom: 8 }}>Запросить информацию об обрабатываемых данных</li>
            <li style={{ marginBottom: 8 }}>Потребовать удаления своих данных</li>
            <li style={{ marginBottom: 8 }}>Отозвать согласие на обработку персональных данных</li>
          </ul>
          <p style={{ marginBottom: 16 }}>Для реализации своих прав пользователь может обратиться по электронной почте: hello@torbichev.com.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--color-warm)', marginTop: 32, marginBottom: 12, textTransform: 'uppercase' }}>6. Cookies и аналитика</h2>
          <p style={{ marginBottom: 16 }}>Сервис использует cookies для поддержания сессии пользователя (авторизация). Сервис не использует сторонние трекеры и системы аналитики.</p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--color-warm)', marginTop: 32, marginBottom: 12, textTransform: 'uppercase' }}>7. Изменения</h2>
          <p style={{ marginBottom: 16 }}>Оператор оставляет за собой право вносить изменения в настоящую Политику. Актуальная версия всегда доступна на странице /privacy.</p>
        </div>
      </div>
    </div>
  )
}
