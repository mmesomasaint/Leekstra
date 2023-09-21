import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import firebase_app from "../firebase";

const db = getFirestore(firebase_app)
const jobsRef = collection(db, 'jobs')

export default async function getById(jobId: string) {
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