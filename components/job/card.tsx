import {useMemo} from 'react'
import { DocumentData } from "firebase/firestore";

export default function Card({jobDoc}: {jobDoc: DocumentData}) {
  const job = useMemo(() => jobDoc.data(), [jobDoc])

  return (
    <div className='flex justify-start items-center gap-10 shadow-md rounded-2xl bg-gray-400/10 p-10'>
      <p className="text-2xl font-semibold text-black/75">{job.title}</p>
      <span>Class: {job.class}</span>
      <div className='flex justify-between items-center gap-10'>
        <span>Location: {job.location}</span>
        <span>Location Locked: {job.locationLocked}</span>
      </div>
      <div className='flex justify-between items-center gap-10'>
        <span>budget range: {job.budget.from} - {job.budget.to}</span>
        <span>pay: {job.locationLocked}</span>
      </div>
    </div>
  )
}