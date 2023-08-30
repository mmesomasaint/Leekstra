type AuthLayoutProps = {
  bgSrc: string
  children: React.ReactNode
}

export default function AuthLayout ({bgSrc, children}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex justify-stretch items-center gap-0 bg-white">
      {children}
      <div className="grow h-full scale-125 rotate-45 origin-top-left overflow-hidden">
        <div className={`h-full -scale-125 -rotate-45 w-full bg-[url(${bgSrc})] bg-no-repeat bg-cover bg-center`} />
      </div>
    </div>
  )
}