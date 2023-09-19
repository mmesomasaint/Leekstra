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

export async function loadAll() {
  let jobDocs, error

  try {
    const q = query(
      jobsRef,
      where('type', '==', 'PUBLIC'),
      limit(2)
    )
    const docSnaps = await getDocs(q)

    jobDocs = docSnaps.docs
  } catch (e) {
    error = e
  }

  return { jobDocs, error }
}

export async function loadRecent() {
  let jobDocs, error

  try {
    const q = query(
      jobsRef,
      where('type', '==', 'PUBLIC'),
      orderBy('createdAt', 'asc'),
      limit(2)
    )
    const docSnaps = await getDocs(q)

    jobDocs = docSnaps.docs
  } catch (e) {
    error = e
  }

  return { jobDocs, error }
}

export async function loadBestMatch() {
  try {
  } catch (e) {}
}
