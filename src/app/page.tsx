'use client'

import { useState, useEffect } from 'react'
import Screen01Hero from '@/components/Screen01Hero'
import Screen02Clones from '@/components/Screen02Clones'
import Screen03Xwing from '@/components/Screen03Xwing'
import Screen04Attack from '@/components/Screen04Attack'
import Screen05Hit from '@/components/Screen05Hit'
import Screen06Miss from '@/components/Screen06Miss'
import Screen07Coordinates from '@/components/Screen07Coordinates'
import Screen08Leaderboard from '@/components/Screen08Leaderboard'
import Screen09Complete from '@/components/Screen09Complete'

export type GameScreen =
  | 'hero'
  | 'clones'
  | 'xwing'
  | 'attack'
  | 'hit'
  | 'miss'
  | 'coordinates'
  | 'leaderboard'
  | 'complete'

interface User {
  userId: string
  name: string
  email: string
}

interface RoundData {
  id: string
  roundNumber: number
  ideaText: string
}

interface EvaluationArg {
  text: string
  accepted: boolean
  feedback: string
  criterion: string
}

export interface EvaluationResult {
  hit: boolean
  arguments: EvaluationArg[]
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [screen, setScreen] = useState<GameScreen>('hero')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [currentRound, setCurrentRound] = useState<RoundData | null>(null)
  const [hits, setHits] = useState(0)
  const [lastEvaluation, setLastEvaluation] = useState<EvaluationResult | null>(null)
  const [criteria, setCriteria] = useState<string[]>([])
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(data => {
        if (data.user) {
          setUser(data.user)
          loadSession(data.user)
        }
      })
      .catch(() => {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadSession(u: User) {
    try {
      const res = await fetch('/api/game/session')
      const data = await res.json()
      if (data.session) {
        const crits = data.criteria?.map((c: { text: string }) => c.text) || []
        const h = data.session.hits || 0
        setSessionId(data.session.id)
        setHits(h)
        setCriteria(crits)

        if (data.session.status === 'completed') {
          setScreen('complete')
        } else if (h >= 5) {
          setScreen('coordinates')
        } else {
          setScreen('clones')
        }
      } else {
        setScreen('clones')
      }
    } catch {
      setScreen('clones')
    }
  }

  function goTo(s: GameScreen) {
    setScreen(s)
    window.scrollTo(0, 0)
  }

  async function handleRegister(name: string, email: string) {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)

    const meRes = await fetch('/api/auth/me')
    const meData = await meRes.json()
    setUser(meData.user)
    setGeneratedPassword(data.password)

    const sessionRes = await fetch('/api/game/session')
    const sessionData = await sessionRes.json()
    setSessionId(sessionData.session?.id || null)
    goTo('clones')
  }

  async function handleLogin(email: string, password: string) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)

    const meRes = await fetch('/api/auth/me')
    const meData = await meRes.json()
    setUser(meData.user)
    await loadSession(meData.user)
  }

  async function handleLogout() {
    await fetch('/api/auth/me', { method: 'DELETE' })
    setUser(null)
    setScreen('hero')
    setSessionId(null)
    setCurrentRound(null)
    setHits(0)
    setLastEvaluation(null)
    setCriteria([])
    setGeneratedPassword(null)
  }

  async function generateIdea() {
    if (!sessionId) return
    const res = await fetch('/api/game/idea', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    })
    const data = await res.json()
    if (data.round) setCurrentRound(data.round)
  }

  async function evaluateArguments(args: [string, string, string]) {
    if (!currentRound) return null
    const res = await fetch('/api/game/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roundId: currentRound.id, arguments: args }),
    })
    const data = await res.json()
    setLastEvaluation(data.evaluation)
    setHits(data.hits)

    if (data.result === 'hit') {
      const sessionRes = await fetch('/api/game/session')
      const sessionData = await sessionRes.json()
      setCriteria(sessionData.criteria?.map((c: { text: string }) => c.text) || [])
      goTo('hit')
    } else {
      goTo('miss')
    }
    return data
  }

  async function completeGame() {
    if (!sessionId) return
    await fetch('/api/game/session', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    })
  }

  function startNextRound() {
    setCurrentRound(null)
    setLastEvaluation(null)
    goTo('attack')
  }

  const pilotBar = user && screen !== 'hero' && (
    <div className="pilot-bar">
      <span>Пилот: <span className="pilot-bar__name">{user.name}</span></span>
      <button className="pilot-bar__logout" onClick={handleLogout}>Выйти</button>
    </div>
  )

  const roundCounter = ['attack', 'hit', 'miss'].includes(screen) && (
    <div className="round-counter">Раунд {hits + 1}/5</div>
  )

  return (
    <>
      {pilotBar}
      {roundCounter}
      {screen === 'hero' && <Screen01Hero onRegister={handleRegister} onLogin={handleLogin} generatedPassword={generatedPassword} />}
      {screen === 'clones' && <Screen02Clones onReady={() => goTo('xwing')} />}
      {screen === 'xwing' && <Screen03Xwing onStart={() => goTo('attack')} />}
      {screen === 'attack' && <Screen04Attack round={currentRound} onGenerateIdea={generateIdea} onFire={evaluateArguments} hits={hits} />}
      {screen === 'hit' && <Screen05Hit evaluation={lastEvaluation} hits={hits} onContinue={() => hits >= 5 ? goTo('coordinates') : startNextRound()} gameComplete={hits >= 5} />}
      {screen === 'miss' && <Screen06Miss evaluation={lastEvaluation} onRetry={() => goTo('attack')} />}
      {screen === 'coordinates' && <Screen07Coordinates criteria={criteria} onSubmit={async () => { await completeGame(); goTo('leaderboard') }} onMore={startNextRound} />}
      {screen === 'leaderboard' && <Screen08Leaderboard userId={user?.userId || ''} onComplete={() => goTo('complete')} />}
      {screen === 'complete' && <Screen09Complete />}
    </>
  )
}
