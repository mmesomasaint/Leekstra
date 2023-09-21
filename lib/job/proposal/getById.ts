import firebase_app from '@/lib/firebase'
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore'

const db = getFirestore(firebase_app)
const proposalsRef = collection(db, 'proposals')

export default async function getById(proposalId: string) {
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
