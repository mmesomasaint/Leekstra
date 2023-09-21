import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app from "../firebase";
import create from "./create";
import getHost from "../auth/host/getHost";
import getPlanner from "../auth/planner/getPlanner";

const db = getFirestore(firebase_app)

export default async function share(fromId: string, toId: string) {
  const {contactId} = await create(fromId)

  // Add to recipients contacts
  const hostData = await getHost(toId)
  const plannerData = await getPlanner(toId)
  
  if (hostData) {
    const hostRef = doc(db, 'hosts', toId)
    await setDoc(hostRef, {contacts: [...hostData?.contacts, contactId]})
  } else if (plannerData) {
    const plannerRef = doc(db, 'planners', toId)
    await setDoc(plannerRef, {contacts: [...plannerData?.contacts, contactId]})
  } else throw new Error(`Recipient, ${toId} is not a registered user`)
}