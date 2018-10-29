
export type anyobject = {[key: string] : any}

export enum STATUS {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE'
}

export interface Task {
  id: number
  name: string
  desc: string
  status: STATUS
}

export interface Board {
  id: string
  name: string
}

export interface State {
  statusColumns: STATUS[]
  boards: Board[]
  tasks: Task[]
  currentBoard?: Board
  error: string | undefined
}

// Omit taken from https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;