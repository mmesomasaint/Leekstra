export default function CenterText({children}: {children: React.ReactNode}) {
  return (
    <div className='flex justify-center items-center'>{children}</div>
  )
}