'use client'

import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { onAuthStateChanged, getAuth, User as Planner } from 'firebase/auth'
import firebase_app from '@/lib/firebase'
import Loading from '@/components/loading'

const auth = getAuth(firebase_app)

type AuthContextType = {
  planner: Planner | null
}

export const AuthContext = createContext<AuthContextType>({ planner: null })

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [planner, setPlanner] = useState<Planner | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (planner) => {
      if (planner) {
        setPlanner(planner)
      } else {
        setPlanner(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ planner: useMemo(() => planner, [planner]) }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  )
}
