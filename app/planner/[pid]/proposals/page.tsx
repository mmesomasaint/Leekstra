'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/header'
import { useAuthContext } from '../../auth/auth-context'
import { DocumentData } from 'firebase/firestore'
import {getById as getJobById} from '@/lib/job/get'
import {getById as getProposalById, getByPlanner} from '@/lib/job/proposal/get'
import CenterText from '@/components/center-text'
import Accept from '@/components/planner/accept'

export default function Proposals() {
  const { planner } = useAuthContext()
  const [proposalJob, setProposalJob] = useState<DocumentData>()
  const [proposals, setProposals] = useState<DocumentData[]>([])
  const [selectedProposal, setSelectedProposal] = useState<DocumentData>({})
  const [selectedProposalId, setSelectedProposalId] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchproposals = async () => {
      if (planner) {
        setProposals([])

        const { proposalDocs } = await getByPlanner(planner.uid)
        setProposals(proposalDocs?.map((doc) => doc.data()) ?? [])
      }
    }

    fetchproposals()
  }, [])

  useEffect(() => {
    const getSelectedProposal = () => {
      setLoading(true)

      getProposalById(selectedProposalId).then(async ({ proposal }) => {
        if (proposal) {
          const job = await getJobById(proposal.jobId)
          setSelectedProposal(proposal)
          setProposalJob(job)
        }
        setLoading(false)
      })
    }

    getSelectedProposal()
  }, [selectedProposalId])

  return (
    <div className='px-10'>
      <Header size='xl'>Proposals</Header>
      <div className='grid grid-cols-3 gap-10'>
        <div className='flex flex-col justify-start items-start gap-7 px-10'>
          {proposals.map((proposal) => (
            <div
              key={proposal.id}
              className='border-y border-y-black/75 shadow-md py-5 flex justify-around items-center'
              onClick={() => setSelectedProposalId(proposal.id)}
            >
              {proposalJob?.title} &rarr; {proposalJob?.hostId}
            </div>
          ))}
        </div>
        <div className='col-span-2 px-10'>
          {loading ? (
            <CenterText>Loading...</CenterText>
          ) : (
            <div className='flex flex-col justify-start items-stretch gap-4'>
              <span>For: {selectedProposal.jobId}</span>
              <span>From: {selectedProposal.plannerId}</span>
              <Accept from={`${planner?.uid}`} to={selectedProposal.plannerId} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
