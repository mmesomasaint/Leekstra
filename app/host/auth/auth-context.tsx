'use client'

import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { onAuthStateChanged, getAuth, User as Host } from 'firebase/auth'
import firebase_app from '@/lib/firebase'
import { useParams, useRouter } from 'next/navigation'
import Loading from '@/components/loading'
import getHost from '@/lib/auth/host/getHost'

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
  const { hid } = useParams()
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Make sure current user is a host.
        const authHost = await getHost(user.uid)

        // If user is authenticated as host
        if (authHost) {
          // If authenticated host owns the url id.
          if (authHost.uid === hid) setHost(user)
          // else redirect to a view-only page of host profile.
          else router.replace(`/profile/${hid}`)
        } else {
          // If user is not a host, ask them to login as a host.
          router.replace('/host/auth/login')
          setHost(null)
        }
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
