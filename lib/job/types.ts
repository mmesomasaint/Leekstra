export type Job = {
  location: string
  locationLocked: boolean
  budget: {from: number, to: number}
  pay: number
  class: 'MAX' | 'MID' | 'MIN'
  type: 'PUBLIC' | 'PRIVATE'
}