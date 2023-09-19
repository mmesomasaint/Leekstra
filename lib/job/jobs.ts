import {
  getFirestore,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  collection,
  getDocs,
} from 'firebase/firestore'
import firebase_app from '../firebase'

const db = getFirestore(firebase_app)
const jobsRef = collection(db, 'jobs')

export async function jobsWithoutCursor(first: number) {
  const q = query(
    jobsRef,
    where('type', '>=', 'PUBLIC'),
    orderBy('time', 'asc'),
    limit(first)
  )
  const querySnap = await getDocs(q)
  return querySnap
}

export async function jobsWithCursor(first: number, afterIdx: string) {
  const q = query(
    jobsRef,
    where('type', '>=', 'PUBLIC'),
    orderBy('time', 'asc'),
    startAfter(afterIdx),
    limit(first)
  )
  const querySnap = await getDocs(q)

  return querySnap
}
