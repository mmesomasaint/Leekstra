import firebase_app from '../firebase'
import {
  createUserWithEmailAndPassword,
  getAuth,
  AuthError,
} from 'firebase/auth'
import {collection, doc, getFirestore, setDoc} from 'firebase/firestore'

const auth = getAuth(firebase_app)
const db = getFirestore(firebase_app)
const usersRef = collection(db, "users")

export default async function register(email: string, password: string, type: string) {
  let user = null,
    error = null

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    user = await setDoc(doc(usersRef, result.user.uid), {...result.user, type})
  } catch (e) {
    error = e as AuthError
  }

  return { user, error }
}
