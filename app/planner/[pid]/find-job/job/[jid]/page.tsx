'use client'

import Button from "@/components/button"
import { useRouter, useParams } from "next/navigation"

export default function Job() {
  const router = useRouter()
  const {jid} = useParams()
  
  return (
    <div className="flex h-full justify-center items-center">
      <Button onClick={() => router.push(`${jid}/send-proposal`)} primary reg>
        Apply
      </Button>
    </div>
  )
}