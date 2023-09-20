import Button from "@/components/button"
import { useRouter } from "next/navigation"

export default function Job() {
  const router = useRouter()
  
  return (
    <div className="flex h-full justify-center items-center">
      <Button onClick={() => router.push('send-proposal')} primary reg>
        Apply
      </Button>
    </div>
  )
}