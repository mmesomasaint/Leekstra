import firebase_app from '@/lib/firebase'
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore'
import { Job } from './types'
import create from './create'

const db = getFirestore(firebase_app)
const jobsRef = collection(db, 'jobs')

export default async function publish(job: Job, hostId: string, title: string) {
  try {
    const { jobRef } = await create(job, hostId, title)
    const jobId = jobRef?.id
    
    if (jobId) {
      const newJobRef = doc(jobsRef, jobId)
      await setDoc(newJobRef, { type: 'PUBLIC' }, { merge: true })
    } else throw new Error('Error publishing job...')
  } catch (e) {
    console.log(e)
  }
}