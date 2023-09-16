export type Job = {
  location: string
  locationLocked: boolean
  budget: {from: number, to: number}
  pay: number
  class: JobFieldClass
  type: JobFieldType
}

export type JobFieldType = 'PUBLIC' | 'PRIVATE'

export type JobFieldClass = 'MAX' | 'MID' | 'MIN'