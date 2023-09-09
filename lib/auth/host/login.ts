import firebase_app from '@/lib/firebase'
import { signInWithEmailAndPassword, getAuth, AuthError } from 'firebase/auth'
import {doc, getFirestore, getDoc} from 'firebase/firestore'

const auth = getAuth(firebase_app)
const db = getFirestore(firebase_app)

export default async function login(email: string, password: string) {
  let user = null,
    error = null

  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    const hostsRef = doc(db, 'hosts', result.user.uid)
    const docSnap = await getDoc(hostsRef)
    
    if (docSnap.exists()) user = docSnap.data()
    else throw new Error() as AuthError
  } catch (e) {
    error = e as AuthError
  }

  return { user, error }
}
