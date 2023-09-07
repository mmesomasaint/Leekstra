'use client'

import {MdOutlineArrowForwardIos} from 'react-icons/md'
import { useRouter } from 'next/navigation'
import Button from '@/components/button'
import Header from '@/components/header'

export default function Home() {
  const router = useRouter()

  return (
    <main className='w-full min-h-screen flex flex-col justify-start items-stretch'>
      <div className='w-full flex justify-between items-center gap-10 p-5'>
        <Header size='xxl'>Leekstra</Header>
        <div className='flex justify-start items-center gap-5'>
          <Button onClick={() => router.push('/auth/login')} reg>
            Log In
          </Button>
          <Button onClick={() => router.push('/auth/register')} reg primary>
            Register
          </Button>
        </div>
      </div>
      <div className='grow w-full bg-white'>
          <section>
            <div className="h-fit md:h-[40rem] w-full bg-[url('/imgs/hero.jpg')] bg-no-repeat bg-cover bg-center">
              <div className='flex justify-center items-center h-full w-full bg-black/60'>
                <div className='w-full h-fit text-center pt-40 md:pt-10 py-16 md:py-0'>
                  <h1 className='block w-[90%] sm:w-[60%] lg:w-[50%] xl:w-[45%] mx-auto text-4xl md:text-6xl font-bold leading-tight text-white mb-4'>
                    World's <span className='text-gray-400'>#1 Market</span>,
                    For Event Hosts & Planners
                  </h1>
                  <p className='block w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] mx-auto text-lg md:text-2xl lg:text-lg font-normal leading-tight text-white mb-8'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus tempus dui nec euismod congue. Nulla id libero
                    dignissim, convallis odio
                  </p>
                  <div className='flex justify-center gap-8 items-center'>
                    <Button reg>
                    <span className='flex-shrink-0 flex justify-start items-center gap-1 sm:gap-3'>
                      <span className='text-lg xs:text-xl lg:text-lg font-medium leading-none'>
                        Explore More
                      </span>
                      <span className='w-fit mx-auto'>
                        <MdOutlineArrowForwardIos className='text-lg xs:text-xl z-20' />
                      </span>
                    </span>
                    </Button>
                    <Button reg primary>Create Account</Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*End of showcase section*/}
      </div>
    </main>
  )
}
