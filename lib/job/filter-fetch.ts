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
import { Job } from './types'
import firebase_app from '../firebase'

const db = getFirestore(firebase_app)
const plannersRef = collection(db, 'planners')

export default async function filterFetch(job: Job, afterIdx?: string, first: number) {
  const q = query(
    plannersRef,
    where('locationDep', '==', job.locationLocked),
    where('budgetStartRange', '==', job.budget.from),
    where('budgetEndRange', '==', job.budget.to),
    where('pay', '==', job.pay),
    where('class', '==', job.class),
    orderBy('id', 'asc'),
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
