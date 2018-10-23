import {State, Task, STATUS, anyobject} from 'types'
import { LOAD_TASKS, CHANGE_TASK_STATUS, GLOBAL_ERROR, LOAD_BOARDS } from 'store/actions'

const initState: State = {
  statusColumns: [STATUS.PENDING, STATUS.IN_PROGRESS, STATUS.REVIEW, STATUS.DONE],
  boards: [],
  tasks: [],
  currentBoard: undefined,
  error: undefined,
}

export default (state=initState, action: anyobject) => {
  switch (action.type) {
  case LOAD_TASKS:
    return {
      ...state,
      tasks: action.tasks
    }
  case CHANGE_TASK_STATUS: {
    const index = state.tasks.findIndex(t => t.id == action.taskId)
    let newTasks
    if (index == -1) {
      newTasks = state.tasks
    } else {
      newTasks = [
        ...state.tasks.slice(0, index), 
        {...state.tasks[index], status: action.status},
        ...state.tasks.slice(index + 1)
      ]
    }
    return {...state, tasks: newTasks}
  }
  case LOAD_BOARDS:
    return {
      ...state,
      boards: action.boards
    }
  case GLOBAL_ERROR:
    return {
      ...state, 
      error: action.message
    }
  default:
    return state
  }
}