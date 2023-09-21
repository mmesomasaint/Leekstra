import { useState, useEffect } from 'react'
import { DocumentData } from 'firebase/firestore'
import Header from '@/components/header'
import { useAuthContext } from '../../auth/auth-context'
import getByHost from '@/lib/job/getByHost'
import getById from '@/lib/job/getById'

export default function MyJobs() {
  const { host } = useAuthContext()

  const [jobs, setJobs] = useState<DocumentData[]>([])
  const [selectedJob, setSelectedJob] = useState<DocumentData>({})
  const [selectedJobId, setSelectedJobId] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const getSelectedJob = () => {
    setLoading(true)
    getById(selectedJobId).then(({ job }) => {
      if (job) setSelectedJob(job)
      setLoading(false)
    })
  }

  useEffect(() => {
    const fetchMyJobs = async () => {
      if (host) {
        setJobs([])

        const { jobDocs } = await getByHost(host.uid)
        setJobs(jobDocs?.map((doc) => doc.data()) ?? [])
      }
    }

    fetchMyJobs()
  }, [])

  return (
    <div className='px-10'>
      <Header size='xl'>My Jobs</Header>
      <div className='grid grid-cols-3 gap-10'>
        <div className='px-10'>
          {jobs.map((job) => (
            <div
              key={job.id}
              className='p-10 border-y border-y-black/75 shadow-md bg-black/30 flex flex-col gap-7'
              onClick={() => setSelectedJobId(job.id)}
            >
              <div className='flex justify-between items-center gap-5'>
                <span>{job.title}</span>
                <span>{job.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
        <div className='col-span-2 px-10'>
          {loading ? (
            <div className='grow flex justify-center items-center'>
              Loading...
            </div>
          ) : (
            <div className=''>
              {selectedJob.title} ~ {selectedJob.id}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}