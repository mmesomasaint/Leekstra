'use client'

import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { BsTwitter, BsLinkedin } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import Button from '@/components/button'
import Header from '@/components/header'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()

  return (
    <main className='w-full min-h-screen flex flex-col justify-start items-stretch'>
      <div className='w-full flex justify-between items-center gap-10 p-5'>
        <Header size='xxl'>Leekstra</Header>
        <div className='flex justify-start items-center gap-5'>
          <Button onClick={() => router.push('/planner/auth/register')} reg>
            For Planners
          </Button>
          <Button onClick={() => router.push('/host/auth/login')} reg>
            Log In
          </Button>
          <Button
            onClick={() => router.push('/host/auth/register')}
            reg
            primary
          >
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
                  World&apos;s <span className='text-gray-400'>#1 Market</span>,
                  For Event Hosts & Planners
                </h1>
                <p className='block w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] mx-auto text-lg md:text-2xl lg:text-lg font-normal leading-tight text-white mb-8'>
                  In the world of event hosting and planning, competence holds
                  value. Leekstra ensures competence goes both ways
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
                  <Button reg primary>
                    Create Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*End of hero section*/}
        <section>
          <div className='px-10 bg-white'>
            <div className='bg-white'>
              <div className='w-[90%] sm:[80%] mx-auto'>
                <div className='flex flex-col justify-center items-center pt-20'>
                  <span className='text-gray-500 text-center text-sm lg:text-xl font-normal sm:font-medium xl:text-2xl'>
                    To increase trust between host and planner we have setup
                    some key features with you in mind.
                  </span>
                  <span className='text-black/95 text-center text-base sm:text-lg lg:text-2xl xl:text-3xl font-semibold sm:font-bold'>
                    For every event hosted or planned, these take effect.
                  </span>
                </div>
                <div className='flex flex-col md:flex-row gap-20 justify-center items-center w-[85%] sm:w-[80%] max-w-[85rem] mx-auto pt-12 pb-20'>
                  <div className='p-2'>
                    <Image
                      width={200}
                      height={200}
                      src='/imgs/buy-gifts.jpg'
                      alt='quality'
                    />
                    <div className='mt-4'>
                      <span className='lg:text-xl xl:text-2xl font-bold text-black/95 text-center block'>
                        Accept Invite
                      </span>
                      <span className='block lg:text-lg xl:text-xl text-gray-600 font-medium text-center'>
                        Accept jobs you&apos;re comfortable with
                      </span>
                    </div>
                  </div>
                  <div className='p-2'>
                    <Image
                      width={200}
                      height={200}
                      src='/imgs/send-gifts.jpg'
                      alt='quality'
                    />
                    <div className='mt-4'>
                      <span className='lg:text-xl xl:text-2xl font-bold text-black/95 text-center block'>
                        We Are Escrow
                      </span>
                      <span className='block lg:text-lg xl:text-xl text-gray-600 font-medium text-center'>
                        Before you begin any job, the host pays.
                      </span>
                    </div>
                  </div>
                  <div className='p-2'>
                    <Image
                      width={200}
                      height={200}
                      src='/imgs/share-gifts.jpg'
                      alt='quality'
                    />
                    <div className='mt-4'>
                      <span className='lg:text-xl xl:text-2xl font-bold text-black/95 text-center block'>
                        Only Deserving
                      </span>
                      <span className='block lg:text-lg xl:text-xl text-gray-600 font-medium text-center'>
                        We release your money only when job weldone.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*End of feature section*/}
        <section>
          <div className='bg-black/60 p-20'>
            <div className='text-gray-300 text-center text-sm lg:text-xl font-normal sm:font-medium xl:text-2xl w-[70%] mx-auto'>
              This projected was inspired by the difficulty I&apos;ve
              experienced while trying to setup a party or throw a party.
              Because I know no one, no contractors to call, because I&apos;m
              not an event planner. Coupled with the fact that I don&apos;t live
              in the city so, how do I find them?
            </div>
            <div className='flex justify-center items-center gap-5 mt-5'>
              <span className='text-black/75 text-xl font-medium'>
                Created By:
              </span>
              <span className='text-black text-xl font-medium flex gap-5'>
                <span>Mmesoma Saint</span>
                <BsLinkedin
                  className='text-xl text-black/90'
                  onClick={() => router.push('/my-linkedin')}
                />
                <BsTwitter
                  className='text-xl text-black/90'
                  onClick={() => router.push('/my-twitter')}
                />
              </span>
            </div>
          </div>
        </section>
        {/*End of about section*/}
      </div>
    </main>
  )
}
