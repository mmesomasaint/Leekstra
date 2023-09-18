import { collection, getFirestore, where, query, getDocs } from "firebase/firestore";
import firebase_app from "../firebase";

const db = getFirestore(firebase_app)
const jobRef = collection(db, 'jobs')

export default async function exists(hash: string) {
  const q = query(jobRef, where('hash', '==', hash))
  const docSnaps = await getDocs(q)

  return docSnaps.docs.shift()
}