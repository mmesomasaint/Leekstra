import Button from '@/components/button'
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
          <form>
            <label
              htmlFor='locked-location'
              className='flex flex-col gap-1 items-end justify-start'
            >
              <span>Location Lock</span>
              <input id='locked-location' type='checkbox' name='checkbox' />
            </label>
            <label
              htmlFor='budget'
              className='flex flex-col gap-1 items-end justify-start'
            >
              <span>Budget</span>
              <div className='flex justify-start items-center gap-10'>
                <label htmlFor='from' className='flex gap-2'>
                  <input id='from' type='number' name='from' />
                </label>
                <label htmlFor='to' className='flex gap-2'>
                  <input id='to' type='number' name='to' />
                </label>
              </div>
            </label>
            <label
              htmlFor='pay'
              className='flex flex-col gap-1 items-end justify-start'
            >
              <span>Pay</span>
              <input id='pay' type='number' name='pay' />
            </label>
            <label
              htmlFor='eventtype'
              className='flex flex-col gap-1 items-end justify-start'
            >
              <span>Event Type</span>
              <select defaultValue={'Concert'}>
                <option value='Big'>Big</option>
                <option value='Mid'>MId</option>
                <option value='Small'>Small</option>
              </select>
            </label>
          </form>
          <Button primary reg>Publish</Button>
        </div>
      </div>
    </div>
  )
}
