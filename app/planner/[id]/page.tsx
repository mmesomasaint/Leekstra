import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import getPlanner from '@/lib/auth/planner/getPlanner'
import { redirect } from 'next/navigation'
import Header from '@/components/header'
import Image from 'next/image'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Get the currenct user
  const planner = await getPlanner()

  // Check if the current signed in user is the same with url.
  // If not redirect to a view only section of the profile.
  // If not authenticated, ask planner to login
  if (!planner) redirect('/planner/auth/login')
  else if (planner?.uid !== params?.query) redirect(`/profile/${params?.query}`)

  return { props: { planner } }
}

export default function Profile({
  planner,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className='px-10'>
      <Header size='xl'>Profile</Header>
      <div className='grid grid-cols-3 place-items-stretch gap-10 p-10'>
        <div className='p-5'>
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
