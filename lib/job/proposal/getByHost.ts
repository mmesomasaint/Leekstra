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
const proposalsRef = collection(db, 'proposals')

export default async function getByHost(hostId: string) {
  let proposalDocs, error

  try {
    const q = query(
      proposalsRef,
      where('hostId', '==', hostId),
      orderBy('createdAt', 'asc'),
      limit(5)
    )
    const proposalDocSnaps = await getDocs(q)

    if (!proposalDocSnaps.empty) proposalDocs = proposalDocSnaps.docs
  } catch (e) {
    error = e
  }

  return { proposalDocs, error }
}
