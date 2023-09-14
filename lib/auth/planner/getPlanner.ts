import firebase_app from '@/lib/firebase'
import { getAuth } from 'firebase/auth'
import { doc, getFirestore, getDoc } from 'firebase/firestore'

const auth = getAuth(firebase_app)
const db = getFirestore(firebase_app)

export default async function getPlanner(uid=auth.currentUser?.uid) {
  if (uid) {
    const plannersRef = doc(db, 'planners', uid)
    const docSnap = await getDoc(plannersRef)
  
    if (docSnap.exists()) return docSnap.data()
  }

  return null
}
