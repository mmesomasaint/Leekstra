import validateID from '@/lib/auth/planner/validateID'
import Header from '@/components/header'
import Image from 'next/image'

export default async function Profile({ params }: { params: { uid: string } }) {
  const planner = await validateID(params.uid)
  console.log("I am the planner here: ", planner)

  return (
    <div className='px-10'>
      <Header size='xl'>Profile</Header>
      <div className='grid grid-cols-3 place-items-stretch gap-10 p-10'>
        <div className='p-5 flex flex-col gap-5'>
          <Image src='/' width={200} height={200} alt='avatar' />
          <span className='text-lg font-semibold text-black/75'>
            Name: Emeka D Stalleon
          </span>
          <span className='text-lg font-semibold text-black/75'>
            Location: Enugu, Nigeria
          </span>
        </div>
        <div className='p-5'>
          <span className='text-lg font-semibold text-black/75'>
            Ratings: 5 stars
          </span>
        </div>
      </div>
    </div>
  )
}
