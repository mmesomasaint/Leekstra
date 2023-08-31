import firebase_app from '../firebase'
import { signInWithEmailAndPassword, getAuth, AuthError } from 'firebase/auth'

const auth = getAuth(firebase_app)

export default async function logIn(email: string, password: string) {
  let result = null,
    error = null
  try {
    result = await signInWithEmailAndPassword(auth, email, password)
  } catch (e) {
    error = e as AuthError
  }

  return { result, error }
}