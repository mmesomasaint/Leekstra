import firebase_app from '@/lib/firebase'
import {
  createUserWithEmailAndPassword,
  getAuth,
  AuthError,
} from 'firebase/auth'
import {collection, doc, getFirestore, setDoc} from 'firebase/firestore'

const auth = getAuth(firebase_app)
const db = getFirestore(firebase_app)
const plannersRef = collection(db, "planners")

export default async function register(email: string, password: string) {
  let user = null,
    error = null

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    user = await setDoc(doc(plannersRef, result.user.uid), {...result.user})
  } catch (e) {
    error = e as AuthError
  }

  return { user, error }
}
