import Header from '@/components/header'
import Image from 'next/image'

export default function FilterMatches() {
  return (
    <div className='px-10'>
      <Header size='xl'>Profile</Header>
    <div className='grid grid-cols-3 gap-10'>
      <div className='col-span-2 flex flex-col justify-start items-stretch gap-4 px-10'>
        <div className='flex justify-start items-center gap-10 shadow-md rounded-2xl border border-gray-500/50 p-10'>
          <Image
            src='/'
            width={200}
            height={200}
            alt='avatar'
            className='shadow-md'
          />
          <span>Name: daniel O'brien</span>
        </div>
        <div className='flex justify-start items-center gap-10 shadow-md rounded-2xl border border-gray-500/50 p-10'>
          <Image
            src='/'
            width={200}
            height={200}
            alt='avatar'
            className='shadow-md'
          />
          <span>Name: daniel O'brien</span>
        </div>
        <div className='flex justify-start items-center gap-10 shadow-md rounded-2xl border border-gray-500/50 p-10'>
          <Image
            src='/'
            width={200}
            height={200}
            alt='avatar'
            className='shadow-md'
          />
          <span>Name: daniel O'brien</span>
        </div>
      </div>
      <div className='px-10'>
        <form></form>
      </div>
    </div>
    </div>
  )
}
