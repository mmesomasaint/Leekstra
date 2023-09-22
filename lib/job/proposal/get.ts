import firebase_app from '@/lib/firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'

const db = getFirestore(firebase_app)
const proposalsRef = collection(db, 'proposals')

export async function getByHost(hostId: string) {
  let proposalDocs, error

  try {
    const hostDoc = await getDoc(doc(db, 'hosts', hostId))
    const host = hostDoc.data()

    const q = query(
      proposalsRef,
      where('jobId', 'in', host?.jobs),
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
export async function getByPlanner(proposalId: string) {
  let proposalDocs, error

  try {
    const q = query(
      proposalsRef,
      where('proposalId', '==', proposalId),
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

export async function getById(proposalId: string) {
  let proposal, error

  try {
    const proposalRef = doc(proposalsRef, proposalId)
    const proposalDoc = await getDoc(proposalRef)

    proposal = proposalDoc.data()
  } catch (e) {
    error = e
  }

  return { proposal, error }
}
