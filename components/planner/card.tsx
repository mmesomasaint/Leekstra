import Image from "next/image";

export default function Card() {
  return (
    <div className='flex justify-start items-center gap-10 shadow-md rounded-2xl border border-gray-500/50 p-10'>
      <Image
        src='/'
        width={200}
        height={200}
        alt='avatar'
        className='shadow-md'
      />
      <span>Name: daniel O'brien</span>
      <span>Pay: 5000</span>
      <span>Budget: from 50,000 to 100,000</span>
      <span>Location: Nigeria</span>
    </div>
  )
}