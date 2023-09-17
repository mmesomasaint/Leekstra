import firebase_app from '../firebase'
import { Job } from './types'
import { getFirestore, addDoc, collection } from 'firebase/firestore'

const db = getFirestore(firebase_app)
const jobsRef = collection(db, 'jobs')

export default async function create(job: Job, hostId: string, title?: string) {
  let jobRef = null,
    error = null
  try {
    const data = {
      ...job,
      title,
      hostId,
      invitees: [],
      proposals: [],
    }

    jobRef = await addDoc(jobsRef, data)
  } catch (e) {
    error = e
  }

  return { jobRef, error }
}
