'use client'

import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { onAuthStateChanged, getAuth, User as Host } from 'firebase/auth'
import firebase_app from '@/lib/firebase'
import Loading from '@/components/loading'

const auth = getAuth(firebase_app)

type AuthContextType = {
  host: Host | null
}

export const AuthContext = createContext<AuthContextType>({ host: null })

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [host, setHost] = useState<Host | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (host) => {
      if (host) {
        setHost(host)
      } else {
        setHost(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ host: useMemo(() => host, [host]) }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  )
}
