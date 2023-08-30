import Header from "@/components/header";

export default function Home() {
  return (
    <main className='w-full min-h-screen flex flex-col justfiy-start items-stretch px-5'>
      <div className='w-full flex justify-between items-center gap-10'>
        <Header size="xl" />
      </div>
    </main>
  )
}
