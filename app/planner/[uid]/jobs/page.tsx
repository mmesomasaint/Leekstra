import Header from '@/components/header'

export default function Jobs() {
  return (
    <div className='px-10'>
      <Header size='xl'>Jobs</Header>
      <div className='grid grid-cols-3 gap-10'>
        <div className='px-10'></div>
        <div className='col-span-2 flex flex-col justify-start items-stretch gap-4 px-10'></div>
      </div>
    </div>
  )
}
