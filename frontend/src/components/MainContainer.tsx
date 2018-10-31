import * as React from  'react'

import {MainContext, Provider} from './context'
import App from './App'

import {STATUS, Task} from 'types'
import {apiService, APIError} from 'services/api'


class MainContainer extends React.Component<{}, MainContext> {

  constructor (props: {}) {
    super(props)
    this.state = {
      statusColumns: [STATUS.PENDING, STATUS.IN_PROGRESS, STATUS.REVIEW, STATUS.DONE],
      boards: [],
      tasks: [],
      currentBoard: undefined,
      error: undefined,
      loadTasks: this.loadTasks,
      loadBoards: this.loadBoards,
      changeTaskStatus: this.changeTaskStatus,
      changeTaskData: this.changeTaskData
    }
  }

  handleError (error: Error) {
    this.setState({error: error.message})
  }

  handleAPIError (e: APIError) {
    if (e instanceof APIError) {
      this.handleError(e)
    } else {
      throw e
    }
  }

  loadBoards = async () => {
    try {
      const boards = await apiService.getBoards()
      this.setState({boards})
    } catch (e) {
      this.handleAPIError(e)
    }
  }

  loadTasks = async (boardId: number) => {
    try {
      const tasks = await apiService.getTasks(boardId)
      this.setState({tasks})
    } catch (e) {
      this.handleAPIError(e)
    }
  }

  changeTaskData = async (boardId: number, taskId: number, taskData: Partial<Task>) => {
    try {
      const changedTask = await apiService.changeTask(boardId, taskId, taskData)
      this.setState({
        tasks: this.state.tasks.map(task => task.id == taskId ? changedTask: task)
      })
    } catch (e) {
      this.handleAPIError(e)
    }
  }

  changeTaskStatus = async (taskId: number, status: STATUS) => {
    this.setState({
      tasks: this.state.tasks.map(task => task.id == taskId ? {...task, status}: task)
    })
  }

  render () {
    return (
      <Provider value={this.state} >
        <App/>
      </Provider>
    )
  }
}


export default MainContainer
