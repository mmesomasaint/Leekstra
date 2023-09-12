import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import getHost from '@/lib/auth/host/getHost'
import Button from '@/components/button'
import Header from '@/components/header'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  // Get the currenct user
  const host = await getHost()

  // Check if the current signed in user is the same with url.
  // If not redirect to a view only section of the profile.
  if (host?.uid !== params?.query) {
    redirect(`/profile/${params?.query}`)
    return
  }
  
  return { props: { host } }
}

export default function Profile({
  host,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className='px-10'>
      <Header size='xl'>Profile</Header>
      <div className='grid grid-cols-3 place-items-stretch gap-10 p-10'>
        <div className='p-5'>
          <Button primary reg>
            Edit Profile
          </Button>
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
