import {
  collection,
  doc,
  getDoc,
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

export async function getByHost(hostId: string) {
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

export async function getById(jobId: string) {
  let job, error 

  try {
    const jobRef = doc(jobsRef, jobId) 
    const jobDoc = await getDoc(jobRef)

    job = jobDoc.data()
  } catch (e) {
    error = e
  }

  return {job, error}
}