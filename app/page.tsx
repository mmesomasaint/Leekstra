import Button from '@/components/button'
import Header from '@/components/header'

export default function Home() {
  return (
    <main className='w-full min-h-screen flex flex-col justfiy-start items-stretch px-5'>
      <div className='border border-red-500 w-full flex justify-between items-center gap-10'>
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
