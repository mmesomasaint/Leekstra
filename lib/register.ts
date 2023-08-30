import firebase_app from './firebase'
import { createUserWithEmailAndPassword, getAuth, AuthError } from 'firebase/auth'

const auth = getAuth(firebase_app)

export default async function register(email: string, password: string) {
  let result = null,
    error = null
  try {
    result = await createUserWithEmailAndPassword(auth, email, password)
  } catch (e) {
    error = e as AuthError
  }

  return { result, error }
}
