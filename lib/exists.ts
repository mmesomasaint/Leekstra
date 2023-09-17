import { doc, getDoc, getFirestore } from "firebase/firestore"
import firebase_app from "./firebase"

const db = getFirestore(firebase_app)

export default async function exists(collectionId: string, docId: string) {
  const ref = doc(db, collectionId, docId)
  const docSnap = await getDoc(ref)
  if (docSnap.exists()) return true
  return false
}