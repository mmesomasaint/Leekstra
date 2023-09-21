import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import firebase_app from '../firebase'
import create from './create'

const db = getFirestore(firebase_app)

export async function shareToHost(fromId: string, hostId: string) {
  const { contactId } = await create(fromId)

  // Add to hosts contacts
  const hostRef = doc(db, 'hosts', hostId)
  const hostDoc = await getDoc(hostRef)
  const data = hostDoc.data()

  await setDoc(hostRef, { contacts: [...data?.contacts, contactId] })
  console.log("Contact shared successfully...")
}

export async function shareToPlanner(fromId: string, plannerId: string) {
  const { contactId } = await create(fromId)

  // Add to hosts contacts
  const plannerRef = doc(db, 'planners', plannerId)
  const plannerDoc = await getDoc(plannerRef)
  const data = plannerDoc.data()
  
  await setDoc(plannerRef, { contacts: [...data?.contacts, contactId] })
  console.log("Contact shared successfully...")
}
