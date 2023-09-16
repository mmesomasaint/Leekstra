import firebase_app from '@/lib/firebase'
import {
  createUserWithEmailAndPassword,
  getAuth,
  AuthError,
} from 'firebase/auth'
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore'

const auth = getAuth(firebase_app)
const db = getFirestore(firebase_app)
const plannersRef = collection(db, 'planners')

export default async function register(email: string, password: string) {
  let user = null,
    error = null

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const data = {
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
      phoneNumber: result.user.phoneNumber,
      photoURL: result.user.photoURL,
      emailVerified: result.user.emailVerified,
      locationDep: null,
      budget: null,
      pay: null,
      class: null,
      chats: null,
      proposals: null
    }

    // Create user in planners db, and the local variable
    await setDoc(doc(plannersRef, result.user.uid), data)
    user = data
  } catch (e) {
    error = e as AuthError
  }

  return { user, error }
}
