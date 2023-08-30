type HeaderProps = {
  size: "xxl" | "xl" | "l" | "m"
}

export default function Header({size}: HeaderProps) {
  return (
    <h1 className={`${size === "xxl" && 'font-extrabold'} ${size === "xl" && 'font-bold'} ${size === "l" && 'font-semibold'} ${size === "m" && 'font-medium'}`}></h1>
  )
}