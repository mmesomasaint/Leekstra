import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import getHost from '@/lib/auth/host/getHost'
import Button from '@/components/button'
import Header from '@/components/header'
import Image from 'next/image'

export const getServerSideProps: GetServerSideProps = async () => {
  const host = await getHost()
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
