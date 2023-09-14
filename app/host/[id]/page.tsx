import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import getHost from '@/lib/auth/host/getHost'
import Button from '@/components/button'
import Header from '@/components/header'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Get the currenct user
  const host = await getHost()

  // Check if the current signed in user is the same with url.
  // If not redirect to a view only section of the profile.
  // If not authenticated, ask host to login
  if (!host) redirect('/host/auth/login')
  else if (host?.uid !== params?.query) redirect(`/profile/${params?.query}`)

  return { props: { host } }
}

export default function Profile({params}: {params: {uid: string}}) {
  return (
    <div className='px-10'>
      <Header size='xl'>Profile</Header>
      <div className='grid grid-cols-3 place-items-stretch gap-10 p-10'>
        <div className='p-5 flex flex-col gap-5'>
          <Button primary reg>
            Edit Profile
          </Button>
          <Image src='/' width={200} height={200} alt='avatar' />
          <span className='text-lg font-semibold text-black/75'>
            Name: Emeka D Stalleon
          </span>
          <span className='text-lg font-semibold text-black/75'>
            Email: emeka@gmail.com
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
