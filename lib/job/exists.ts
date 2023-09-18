import { collection, getFirestore, where, query, getDocs } from "firebase/firestore";
import firebase_app from "../firebase";

const db = getFirestore(firebase_app)
const jobRef = collection(db, 'jobs')

export default async function exists(hash: string) {
  let jobId, error

  try {
  const q = query(jobRef, where('hash', '==', hash))
  const docSnaps = await getDocs(q)
  const doc = docSnaps.docs.shift()
  jobId = doc?.id
  } catch(e) {
    console.log(e)
    error = e
  }

  return {jobId, error}
}