import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generatePassword, generateToken } from '@/lib/auth'
import { sendWelcomeEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'Имя и email обязательны' }, { status: 400 })
    }

    // Проверяем, не зарегистрирован ли уже
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Этот email уже зарегистрирован' }, { status: 409 })
    }

    // Генерируем пароль и создаём пользователя
    const password = generatePassword()
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashPassword(password),
      },
    })

    // Отправляем email с паролем
    await sendWelcomeEmail(email, name, password)

    // Сразу авторизуем
    const token = generateToken({ userId: user.id, email: user.email, name: user.name })

    const response = NextResponse.json({ success: true, name: user.name, password })
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 дней
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Ошибка регистрации' }, { status: 500 })
  }
}
