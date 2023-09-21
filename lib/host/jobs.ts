import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import firebase_app from '../firebase'

const db = getFirestore(firebase_app)
const jobsRef = collection(db, 'jobs')

export default async function jobs(hostId: string) {
  let jobDocs, error

  try {
    const q = query(
      jobsRef,
      where('hostId', '==', hostId),
      orderBy('createdAt', 'asc'),
      limit(5)
    )
    const jobDocSnaps = await getDocs(q)

    if (!jobDocSnaps.empty) jobDocs = jobDocSnaps.docs
  } catch (e) {
    error = e
  }

  return { jobDocs, error }
}
