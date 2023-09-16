import {
  getFirestore,
  query,
  where,
  and,
  orderBy,
  limit,
  startAfter,
  collection,
  getDocs,
} from 'firebase/firestore'
import { Job } from './types'
import firebase_app from '../firebase'

const db = getFirestore(firebase_app)
const plannersRef = collection(db, 'planners')

export default async function filterFetch(
  job: Job,
  first: number,
  afterIdx?: string
) {
  const q = query(
    plannersRef,
    where('budget', '>=', job.budget.from), 
    where('budget', '<=', job.budget.to),
    where('locationDep', '==', job.locationLocked),
    where('class', '==', job.class),
    orderBy('budget', 'asc'),
    startAfter(afterIdx),
    limit(first)
  )
  const querySnap = await getDocs(q)
  const docs = querySnap.docs.map((doc) => doc.data())

  // Test.
  querySnap.forEach((doc) => {
    console.log('A doc: ', doc.data())
  })

  return docs
}
