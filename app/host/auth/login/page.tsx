'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/button'
import logIn from '@/lib/auth/host/login'

function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { user, error } = await logIn(email, password)

    if (error) {
      return
    }

    // else successful
    if (user) return router.push(`/host/${user.uid}`)
  }
  return (
    <div className='min-h-screen w-full flex justify-stretch items-center gap-0 bg-white'>
      <div className='flex flex-col gap-5'>
        <h1 className='mt-44 mb-12 text-4xl font-bold text-black/70 ml-5'>
          Log in
        </h1>
        <form
          onSubmit={handleForm}
          className='flex flex-col justify-start items-start gap-5 ml-5'
        >
          <label htmlFor='email'>
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type='email'
              name='email'
              id='email'
              placeholder='example@mail.com'
              className='border border-zinc-600/50 rounded-xl p-3 focus:outline-blue-500/50'
            />
          </label>
          <label htmlFor='password'>
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type='password'
              name='password'
              id='password'
              placeholder='password'
              className='border border-zinc-600/50 rounded-xl p-3 focus:outline-blue-500/50'
            />
          </label>
          <Button type='submit' reg primary>
            Log in
          </Button>
        </form>
      </div>
      <div className='grow h-full scale-125 rotate-45 origin-top-left overflow-hidden'>
        <div
          className={`h-full -scale-125 -rotate-45 w-full bg-[url(/imgs/login-art.jpg)] bg-no-repeat bg-cover bg-center`}
        />
      </div>
    </div>
  )
}

export default Page
