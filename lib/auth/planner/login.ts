import firebase_app from '@/lib/firebase'
import { signInWithEmailAndPassword, getAuth, AuthError } from 'firebase/auth'
import { doc, getFirestore, getDoc } from 'firebase/firestore'

const auth = getAuth(firebase_app)
const db = getFirestore(firebase_app)

export default async function logIn(email: string, password: string) {
  let user = null,
    error = null

  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    const plannersRef = doc(db, 'planners', result.user.uid)
    const docSnap = await getDoc(plannersRef)

    if (docSnap.exists()) user = docSnap.data()
    else throw new Error("Email does not exist")
  } catch (e) {
    error = e as AuthError
    
    // If a user was signed in, sign them out.
    if (auth.currentUser) await auth.signOut()
    throw new Error("Email doesn't exist.")
  }

  return { user, error }
}
