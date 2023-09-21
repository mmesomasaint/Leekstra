import { shareToHost } from '@/lib/contact/share'
import { useState } from 'react'
import Button from '../button'

export default function Accept({ from, to }: { from: string; to: string }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [isSent, setIsSent] = useState<boolean>(false)

  const acceptJobOffer = () => {
    setLoading(true)

    shareToHost(from, to).then(() => {
      setLoading(false)
      setIsSent(true)
    })
  }

  return (
    <Button onClick={() => acceptJobOffer()} reg primary>
      {loading ? 'Accepting...' : isSent ? 'Accepted' : 'Accept'}
    </Button>
  )
}
