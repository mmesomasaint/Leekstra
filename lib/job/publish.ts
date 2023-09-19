import firebase_app from '@/lib/firebase'
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore'
import { Job } from './types'
import create from './create'
import exists from './exists'

const db = getFirestore(firebase_app)
const jobsRef = collection(db, 'jobs')

export default async function publish(job: Job, hostId: string, title: string) {
  try {
    // If job already exists don't create a new, otherwise create a new job.
    const existingJobRef = await exists(job.hash)
    const jobId = existingJobRef.jobId ?? (await create(job, hostId)).jobId

    if (jobId) {
      const newJobRef = doc(jobsRef, jobId)
      await setDoc(newJobRef, { type: 'PUBLIC' }, { merge: true })
    } else throw new Error('Error publishing job...')
  } catch (e) {
    console.log(e)
  }
}
