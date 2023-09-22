import firebase_app from '@/lib/firebase'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import create from './create'

const db = getFirestore(firebase_app)

export default async function send(
  jobId: string,
  plannerId: string,
  proposal: string
) {
  try {
    const { proposalId } = await create(jobId, plannerId, proposal)

    // Add the proposal to the jobs proposals property.
    const jobRef = doc(db, 'jobs', jobId)
    const jobDocSnap = await getDoc(jobRef)

    if (jobDocSnap.exists()) {
      const data = jobDocSnap.data()
      await setDoc(jobRef, { proposals: [...data.proposals, proposalId] })
    } else throw new Error(`Job, ${jobId} doesn't exist`)

    // Add the proposal to the planners proposals property.
    const plannerRef = doc(db, 'planners', plannerId)
    const plannerDocSnap = await getDoc(plannerRef)

    if (plannerDocSnap.exists()) {
      const data = plannerDocSnap.data()
      await setDoc(plannerRef, { proposals: [...data.proposals, proposalId] })
    } else throw new Error(`Planner, ${plannerId} isn't logged in`)

    // Test
    console.log('Proposal sent successfully...')
  } catch (e) {
    console.log(e)
  }
}
