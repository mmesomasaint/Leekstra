import { useState } from 'react'
import Header from '@/components/header'
import { DocumentData } from 'firebase/firestore'
import Card from '@/components/job/card'

export default function Jobs() {
  const [jobs, setJobs] = useState<DocumentData[]>([])

  const loadBestMatch = async () => {
    setJobs([])

    // Load the best matching jobs and assign them to jobs.
  }

  const loadRecent = async () => {
    setJobs([])

    // Load the recent jobs and assign them to jobs.
  }

  return (
    <div className='px-10'>
      <Header size='xl'>Jobs</Header>
      <div className='grid grid-cols-3 gap-10'>
        <div className='col-span-2 flex flex-col justify-start items-stretch gap-4 px-10'>
          {jobs.map((jobDoc) => (
            <Card jobDoc={jobDoc} />
          ))}
        </div>
        <div className='px-10'>Profile Mini Card Section</div>
      </div>
    </div>
  )
}
