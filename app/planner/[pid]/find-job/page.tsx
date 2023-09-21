'use client'

import { useState } from 'react'
import Header from '@/components/header'
import { DocumentData } from 'firebase/firestore'
import Card from '@/components/job/card'
import { useAuthContext } from '../../auth/auth-context'
import { all, bestMatch, recent } from '@/lib/job/load'
import Button from '@/components/button'
import CenterText from '@/components/center-text'

export default function Jobs() {
  const { planner } = useAuthContext()
  const [jobs, setJobs] = useState<DocumentData[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const loadAll = () => {
    const first = 2
    setLoading(true)
    setJobs([])

    all(first).then(({ jobDocs }) => {
      if (jobDocs) setJobs(jobDocs)
      setLoading(false)
    })
  }

  const loadRecent = () => {
    const first = 2
    setLoading(true)
    setJobs([])

    recent(first).then(({ jobDocs }) => {
      if (jobDocs) setJobs(jobDocs)
      setLoading(false)
    })
  }

  const loadBestMatch = () => {
    if (planner) {
      const first = 2
      setLoading(true)
      setJobs([])

      // Load the best matching jobs and assign them to jobs.
      bestMatch(planner.uid, first).then(({ jobDocs }) => {
        if (jobDocs) setJobs(jobDocs)
        setLoading(false)
      })
    }
  }

  return (
    <div className='px-10'>
      <Header size='xl'>Jobs</Header>
      <div className='grid grid-cols-3 gap-10'>
        <div className='col-span-2 flex flex-col justify-start items-stretch gap-4 px-10'>
          <div className='flex justify-start items-center gap-10'>
            <Button onClick={() => loadAll()} reg>
              All
            </Button>
            <Button onClick={() => loadRecent()} reg>
              Recent
            </Button>
            <Button onClick={() => loadBestMatch()} reg>
              BestMatch
            </Button>
          </div>
          <div className='grow'>
            {loading ? (
              <CenterText>Loading...</CenterText>
            ) : (
              jobs.map((jobDoc) => <Card jobDoc={jobDoc} />)
            )}
          </div>
        </div>
        <div className='px-10'>Profile Mini Card Section</div>
      </div>
    </div>
  )
}
