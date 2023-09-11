import firebase_app from '@/lib/firebase'
import { getAuth } from 'firebase/auth'
import { doc, getFirestore, getDoc } from 'firebase/firestore'

const auth = getAuth(firebase_app)
const db = getFirestore(firebase_app)

export default async function getHost() {
  const user = auth.currentUser

  if (user !== null) {
    const hostsRef = doc(db, 'planners', user.uid)
    const docSnap = await getDoc(hostsRef)

    if (docSnap.exists()) return docSnap.data()
  }

  return null
}
