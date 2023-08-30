import Button from '@/components/button'
import Header from '@/components/header'

export default function Home() {
  return (
    <main className='w-full min-h-screen flex flex-col justify-start items-stretch px-5'>
      <div className='w-full flex justify-between items-center gap-10 py-5'>
        <Header size='xl'>Leekstra</Header>
        <div className='flex justify-start items-center gap-5'>
          <Button reg>Log In</Button>
          <Button reg primary>
            Register
          </Button>
        </div>
      </div>
    </main>
  )
}
