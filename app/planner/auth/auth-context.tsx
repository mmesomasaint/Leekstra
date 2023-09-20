'use client'

import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { onAuthStateChanged, getAuth, User as Planner } from 'firebase/auth'
import firebase_app from '@/lib/firebase'
import { useParams, useRouter, usePathname } from 'next/navigation'
import Loading from '@/components/loading'
import getPlanner from '@/lib/auth/planner/getPlanner'

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
  const { pid } = useParams()
  const router = useRouter()
  const pathname = usePathname()

  console.log("We are currently at: ", pathname)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Make sure current user is a planner.
        const authPlanner = await getPlanner(user.uid)

        // If user is authenticated as planner
        if (authPlanner) {
          // If authenticated planner owns the url id.
          if (authPlanner.uid === pid) setPlanner(user)
          else {
            // else redirect to a view-only page of planner profile.
            if (pathname === '/') router.replace(`/profile/${pid}`)
            else if (pathname.split('/').includes('job')) router.replace('/job/$')
          }
        } else {
          // If user is not a planner, ask them to login as a planner.
          router.replace('/planner/auth/login')
          setPlanner(null)
        }
      } else {
        setPlanner(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{ planner: useMemo(() => planner, [planner]) }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  )
}
