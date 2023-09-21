import { addDoc, collection, getFirestore } from 'firebase/firestore'
import firebase_app from '../firebase'
import getHost from '../auth/host/getHost'
import getPlanner from '../auth/planner/getPlanner'

const db = getFirestore(firebase_app)
const contactsRef = collection(db, 'contacts')

export default async function create(forId: string) {
  let contactId, error

  try {
    const userDoc = (await getHost(forId)) ?? (await getPlanner(forId))

    if (userDoc) {
      const data = {
        forId,
        details: {
          email: userDoc?.email,
          phoneNumber: userDoc?.phoneNumber,
        },
      }

      const contactRef = await addDoc(contactsRef, data)
      contactId = contactRef.id
    }
  } catch (e) {
    error = e
  }

  return { contactId, error }
}
