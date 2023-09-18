'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import type { Job, JobFieldClass, JobFieldType } from '@/lib/job/types'
import Button from '@/components/button'
import Header from '@/components/header'
import filterFetch from '@/lib/job/filter-fetch'
import { DocumentData } from 'firebase/firestore'
import invite from '@/lib/job/invite'
import { useAuthContext } from '../../auth/auth-context'

export default function FindMatch() {
  const { host } = useAuthContext()
  const [match, setMatch] = useState<DocumentData[]>([])
  const [filterData, setFilterData] = useState<Job>({
    location: 'Lagos',
    locationLocked: false,
    budget: {
      from: 500,
      to: 1000,
    },
    pay: 50,
    class: 'MAX',
    type: 'PRIVATE',
  })

  console.log(match)

  /** Set the filter data pay section with passed value */
  const setPay = (pay: number) =>
    setFilterData((prev) => ({ ...prev, ['pay']: pay }))

  /** Set the filter data class section with passed value */
  const setClass = (newClass: JobFieldClass) =>
    setFilterData((prev) => ({ ...prev, ['class']: newClass }))

  /** Set the filter data budget-from section with passed value */
  const setBudgetFrom = (from: number) =>
    setFilterData((prev) => ({
      ...prev,
      ['budget']: { ...prev.budget, ['from']: from },
    }))

  /** Set the filter data budget-to section with passed value */
  const setBudgetTo = (to: number) =>
    setFilterData((prev) => ({
      ...prev,
      ['budget']: { ...prev.budget, ['to']: to },
    }))

  /** Set the filter data location section with passed value */
  const setLocation = (loc: string) =>
    setFilterData((prev) => ({ ...prev, ['location']: loc }))

  /** Set the filter data location-locked section with passed value */
  const setLocationLocked = (isLocked: boolean) =>
    setFilterData((prev) => ({ ...prev, ['locationLocked']: isLocked }))

  const handlePublish = () => {
    
  }

  const handleFilter = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const first = 2
    const last = match.pop() ?? { uid: '' }
    setMatch([]) // Empty match
    const result = await filterFetch(filterData, first, last?.uid)
    setMatch(result) // Fill up match
  }

  const handleInvite = async (plannerId: string) => {
    if (host) await invite(host.uid, plannerId, filterData)
  }

  return (
    <div className='px-10'>
      <Header size='l'>Best Match</Header>
      <div className='grid grid-cols-3 gap-10'>
        <div className='col-span-2 flex flex-col justify-start items-stretch gap-8 px-10'>
          {match.map((planner) => (
            <div className='flex justify-start items-center gap-10 shadow-md rounded-2xl bg-gray-400/10 p-10'>
              <Image
                src={planner.photoURL ?? `/imgs/male-avatar.jpg`}
                width={150}
                height={150}
                alt='avatar'
                className='shadow-md'
              />
              <div className='flex flex-col justify-start items-center gap-5'>
                <span>Name: {planner.displayName ?? 'John Doe'}</span>
                <span>Email: {planner.email ?? 'example@email.com'}</span>
                <Button onClick={() => handleInvite(planner.uid)} reg>
                  Send invite
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className='px-10'>
          <Header size='l'>Filter</Header>
          <form
            className='flex flex-col justify-start items-start gap-5  ml-5'
            onSubmit={handleFilter}
          >
            <label
              htmlFor='location'
              className='flex flex-col gap-1 items-start justify-start'
            >
              <p>Location</p>
              <input
                id='location'
                type='text'
                name='location'
                value={filterData.location}
                className='border border-zinc-600/50 rounded-xl p-3 focus:outline-blue-500/50'
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
            <label
              htmlFor='locked-location'
              className='flex flex-col gap-1 items-start justify-start'
            >
              <p>Location Lock</p>
              <input
                id='locked-location'
                type='checkbox'
                name='checkbox'
                checked={filterData.locationLocked}
                className='border border-zinc-600/50 rounded-xl p-3 focus:outline-blue-500/50'
                onChange={(e) => setLocationLocked(e.target.checked)}
              />
            </label>
            <label
              htmlFor='budget'
              className='flex flex-col gap-1 items-start justify-start'
            >
              <span>Budget:</span>
              <div className='flex flex-col justify-start items-center gap-10 ml-5'>
                <label
                  htmlFor='from'
                  className='flex flex-col gap-1 items-start justify-start'
                >
                  <p className='text-base'>From</p>
                  <input
                    id='from'
                    type='number'
                    name='from'
                    value={filterData.budget.from}
                    className='border border-zinc-600/50 rounded-xl p-3 focus:outline-blue-500/50'
                    onChange={(e) => setBudgetFrom(parseInt(e.target.value))}
                  />
                </label>
                <label
                  htmlFor='to'
                  className='flex flex-col gap-1 items-start justify-start'
                >
                  <p className='text-base'>To</p>
                  <input
                    id='to'
                    type='number'
                    name='to'
                    value={filterData.budget.to}
                    className='border border-zinc-600/50 rounded-xl p-3 focus:outline-blue-500/50'
                    onChange={(e) => setBudgetTo(parseInt(e.target.value))}
                  />
                </label>
              </div>
            </label>
            <label
              htmlFor='pay'
              className='flex flex-col gap-1 items-start justify-start'
            >
              <p>Pay</p>
              <input
                id='pay'
                type='number'
                name='pay'
                value={filterData.pay}
                className='border border-zinc-600/50 rounded-xl p-3 focus:outline-blue-500/50'
                onChange={(e) => setPay(parseInt(e.target.value))}
              />
            </label>
            <label
              htmlFor='eventtype'
              className='flex flex-col gap-1 items-start justify-start'
            >
              <p>Event Class</p>
              <select
                value={filterData.class}
                className='border border-zinc-600/50 rounded-xl p-3 focus:outline-blue-500/50'
                onChange={(e) => setClass(e.target.value as JobFieldClass)}
              >
                <option value='MAX'>MAX</option>
                <option value='MID'>MID</option>
                <option value='MIN'>MIN</option>
              </select>
            </label>
            <div className='flex justify-start items-center gap-10'>
              <Button type='submit' primary reg>
                Search
              </Button>
              <Button onClick={() => handlePublish()} reg>
                Publish
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
