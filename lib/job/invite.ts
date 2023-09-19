import {
  addDoc,
  doc,
  getDoc,
  setDoc,
  getFirestore,
  collection,
} from 'firebase/firestore'
import firebase_app from '../firebase'
import { Job } from './types'
import create from './create'
import exists from './exists'

const db = getFirestore(firebase_app)
const invitesRef = collection(db, 'invites')

export default async function invite(
  hostId: string,
  plannerId: string,
  job: Job
) {
  try {
    // If job already exists don't create a new, otherwise create a new job.
    const existingJobRef = await exists(job.hash)
    const jobId = existingJobRef.jobId ?? (await create(job, hostId)).jobId

    const data = { hostId, plannerId, jobId }
    const inviteDoc = await addDoc(invitesRef, data)

    // Send the invite to the specified planner.
    const plannersRef = doc(db, 'planners', plannerId)
    const plannerDocSnap = await getDoc(plannersRef)

    if (plannerDocSnap.exists()) {
      const data = plannerDocSnap.data()
      await setDoc(plannersRef, {
        ...data,
        ['invites']: [...data.invites, inviteDoc.id],
      })
    } else throw new Error(`Planner, ${plannerId} is not registered.`)

    // Add this planner to the job's invitees list.
    const jobRef = doc(collection(db, 'jobs'), jobId)
    const jobDocSnap = await getDoc(jobRef)

    if (jobDocSnap.exists()) {
      const data = jobDocSnap.data()
      if (!data.invitees?.includes(plannerId)) {
        await setDoc(jobRef, {
          ...data,
          ['invitees']: [...data.invitees, plannerId],
        })
      }
    } else throw new Error(`Job, ${jobId} doesn't exist`)

    console.log('Invite sent successfully...')
  } catch (e) {
    console.log('An Error Occured')
    console.log(e)
  }
}
