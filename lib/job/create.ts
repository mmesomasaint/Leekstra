import firebase_app from "../firebase";
import { Job } from "./types";
import { getFirestore, addDoc, collection,  } from "firebase/firestore";

const db = getFirestore(firebase_app)
const jobsRef = collection(db, 'jobs')

export default async function create(job: Job, title: string, hostId: string) {
  let id = null, error = null
  try {
    const data = {
      ...job,
      title,
      hostId,
      invitees: [],
      proposals: [],
    }
  
    const jobDoc = await addDoc(jobsRef, data)
    id = jobDoc.id
  } catch(e) {
    error = e
  }

  return {id, error}
}