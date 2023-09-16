import { DocumentData } from 'firebase/firestore'

export default function extractDocs(docs: DocumentData[]) {
  return docs.map((doc) => doc.data())
}
