import firebase_app from '@/lib/firebase'
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'

const db = getFirestore(firebase_app)
const invitesRef = collection(db, 'invites')

export default async function getByHost(plannerId: string) {
  let inviteDocs, error

  try {
    const q = query(
      invitesRef,
      where('plannerId', '==', plannerId),
      orderBy('createdAt', 'asc'),
      limit(5)
    )
    const inviteDocSnaps = await getDocs(q)

    if (!inviteDocSnaps.empty) inviteDocs = inviteDocSnaps.docs
  } catch (e) {
    error = e
  }

  return { inviteDocs, error }
}
