import { shareToPlanner } from '@/lib/contact/share'
import { useState } from 'react'
import Button from '../button'

export default function Accept({ from, to }: { from: string; to: string }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [isSent, setIsSent] = useState<boolean>(false)

  const acceptProposal = () => {
    setLoading(true)

    shareToPlanner(from, to).then(() => {
      setLoading(false)
      setIsSent(true)
    })
  }

  return (
    <Button onClick={() => acceptProposal()} reg primary>
      {loading ? 'Accepting...' : isSent ? 'Accepted' : 'Accept'}
    </Button>
  )
}
