import * as React from 'react'

import { State, Task, Omit, STATUS } from 'types';

export interface MainContext extends State {
  loadBoards: () => void
  loadTasks: (boardId: number) => Promise<void>
  changeTaskData: (boardId: number, taskId: number, taskData: Partial<Task>) => Promise<void>
  changeTaskStatus: (taskId: number, status: STATUS) => Promise<void>
}

export const {Consumer, Provider} = React.createContext<MainContext>({} as MainContext)

interface WithMainContextProps {
  mainContext: MainContext
}

export function withMainContext <T extends WithMainContextProps> (WrappedComponent: React.ComponentType<T>) {
  return class extends React.Component<Omit<T, keyof WithMainContextProps>> {
    render () {
      return <Consumer>{value => <WrappedComponent mainContext={value} {...this.props} />}</Consumer>
    }
  }
}