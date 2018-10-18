
export type anyobject = {[key: string] : any}

export interface Task {
  id: number
  name: string
  desc: string
  status: STATUS
}

export enum STATUS {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE'
}

export interface State {
  statusColumns: STATUS[]
  tasks: Task[],
  error: string | undefined
}