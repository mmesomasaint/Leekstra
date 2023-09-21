import firebase_app from '@/lib/firebase'
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore'

const db = getFirestore(firebase_app)
const invitesRef = collection(db, 'invites')

export default async function getById(inviteId: string) {
  let invite, error

  try {
    const inviteRef = doc(invitesRef, inviteId)
    const inviteDoc = await getDoc(inviteRef)

    invite = inviteDoc.data()
  } catch (e) {
    error = e
  }

  return { invite, error }
}
