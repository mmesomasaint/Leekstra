import firebase_app from '@/lib/firebase'
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore'
import { Job } from './types'

const db = getFirestore(firebase_app)
const jobsRef = collection(db, 'jobs')

export default async function publish(job: Job, hostId: string) {
  try {
    const data = {
      ...job,
      hostId,
      invitees: [],
      proposals: [],
    }
    await setDoc(doc(jobsRef), data)
  } catch (e) {
    console.log(e)
  }
}
