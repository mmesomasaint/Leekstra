import firebase_app from '@/lib/firebase'
import {
  getAuth,
} from 'firebase/auth'
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore'
import { Job } from './types'

const auth = getAuth(firebase_app)
const db = getFirestore(firebase_app)
const jobsRef = collection(db, 'jobs')

export default async function publish(job: Job, hostId: string) {
  try {
    const data = {
      ...job,
      hostId,
      invitees: [],
      proposals: []
    }
    await setDoc(doc(jobsRef), data)
  } catch(e) {
    console.log(e)
  }
}