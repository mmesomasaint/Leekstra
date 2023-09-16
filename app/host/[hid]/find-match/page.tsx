'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import type { Job } from '@/lib/job/types'
import Button from '@/components/button'
import Header from '@/components/header'
import filterFetch from '@/lib/job/filter-fetch'
import { DocumentData } from 'firebase/firestore'

export default function FindMatch() {
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

  const handlePublish = () => {
    setFilterData((pre) => ({ ...pre, ['type']: 'PUBLIC' }))
  }

  const handleFilter = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const first = 2
    const last = match.pop()
    setMatch([]) // Empty match
    const result = await filterFetch(filterData, first, last?.uid)
    setMatch(result) // Fill up match
  }

  return (
    <div className='px-10'>
      <Header size='l'>Best Match</Header>
      <div className='grid grid-cols-3 gap-10'>
        <div className='col-span-2 flex flex-col justify-start items-stretch gap-8 px-10'>
          <div className='flex justify-start items-center gap-10 shadow-md rounded-2xl bg-gray-400/10 p-10'>
            <Image
              src='/'
              width={150}
              height={150}
              alt='avatar'
              className='shadow-md'
            />
            <span>Name: daniel O&apos;brien</span>
          </div>
          <div className='flex justify-start items-center gap-10 shadow-md rounded-2xl bg-gray-400/10 p-10'>
            <Image
              src='/'
              width={150}
              height={150}
              alt='avatar'
              className='shadow-md'
            />
            <span>Name: daniel O&apos;brien</span>
          </div>
          <div className='flex justify-start items-center gap-10 shadow-md rounded-2xl bg-gray-400/10 p-10'>
            <Image
              src='/'
              width={150}
              height={150}
              alt='avatar'
              className='shadow-md'
            />
            <span>Name: daniel O&apos;brien</span>
          </div>
        </div>
        <div className='px-10'>
          <Header size='l'>Filter</Header>
          <form
            className='flex flex-col justify-start items-start gap-5  ml-5'
            onSubmit={handleFilter}
          >
            <label
              htmlFor='locked-location'
              className='flex flex-col gap-1 items-start justify-start'
            >
              <p>Location Lock</p>
              <input
                id='locked-location'
                type='checkbox'
                name='checkbox'
                className='border border-zinc-600/50 rounded-xl p-3 focus:outline-blue-500/50'
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
                    className='border border-zinc-600/50 rounded-xl p-3 focus:outline-blue-500/50'
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
                    className='border border-zinc-600/50 rounded-xl p-3 focus:outline-blue-500/50'
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
                className='border border-zinc-600/50 rounded-xl p-3 focus:outline-blue-500/50'
              />
            </label>
            <label
              htmlFor='eventtype'
              className='flex flex-col gap-1 items-start justify-start'
            >
              <p>Event Class</p>
              <select
                defaultValue={'Concert'}
                className='border border-zinc-600/50 rounded-xl p-3 focus:outline-blue-500/50'
              >
                <option value='Big'>Big</option>
                <option value='Mid'>Mid</option>
                <option value='Small'>Small</option>
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
