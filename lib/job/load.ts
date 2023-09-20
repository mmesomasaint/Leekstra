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

export async function loadAll() {
  let jobDocs, error

  try {
    const q = query(jobsRef, where('type', '==', 'PUBLIC'), limit(2))
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

export async function loadBestMatch(plannerId: string, first: number) {
  let jobDocs, error

  try {
    // Get the planner searching for jobs, so as to tailor the search.
    const plannerRef = doc(db, 'planners', plannerId)
    const plannerDoc = await getDoc(plannerRef)
    const planner = plannerDoc.data()

    // Make the query totally dependent on the planners attributes.
    const q = query(
      jobsRef,
      where('budget', '>=', planner?.budget.from),
      where('budget', '<=', planner?.budget.to),
      where('locationLocked', '==', planner?.locationDep),
      where('class', '==', planner?.class),
      orderBy('budget', 'asc'),
      limit(first)
    )
    const docSnaps = await getDocs(q)

    jobDocs = docSnaps.docs
  } catch (e) {
    error = e
  }

  return { jobDocs, error }
}
