import {State, Task, STATUS} from 'types'
import { LOAD_TASKS, CHANGE_TASK_STATUS, GLOBAL_ERROR } from 'store/actions'

const initState: State = {
  statusColumns: [STATUS.PENDING, STATUS.IN_PROGRESS, STATUS.REVIEW, STATUS.DONE],
  tasks: [],
  error: undefined,
}

export default (state=initState, action: any) => {
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
  case GLOBAL_ERROR:
    return {
      ...state, 
      error: action.message
    }
  default:
    return state
  }
}