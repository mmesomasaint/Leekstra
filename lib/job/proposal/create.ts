import firebase_app from '@/lib/firebase'
import { addDoc, collection, getFirestore } from 'firebase/firestore'

const db = getFirestore(firebase_app)
const proposalsRef = collection(db, 'proposals')

export default async function create(
  jobId: string,
  plannerId: string,
  proposal: string
) {
  let proposalId, error
  try {
    const data = { jobId, plannerId, letterBody: proposal }
    const proposalRef = await addDoc(proposalsRef, data)

    proposalId = proposalRef.id
  } catch (e) {
    error = e
  }

  return { proposalId, error }
}
