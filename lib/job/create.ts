import firebase_app from '../firebase'
import { Job } from './types'
import { getFirestore, addDoc, collection } from 'firebase/firestore'

const db = getFirestore(firebase_app)
const jobsRef = collection(db, 'jobs')

export default async function create(job: Job, hostId: string, title?: string) {
  let jobId, error
  try {
    const data = {
      ...job,
      title: title ?? 'NO-TITLE',
      hostId,
      invitees: [],
      proposals: [],
    }

    const jobRef = await addDoc(jobsRef, data)
    jobId = jobRef.id
  } catch (e) {
    error = e
  }

  return { jobId, error }
}
