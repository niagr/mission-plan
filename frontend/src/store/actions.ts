import {Dispatch, Action} from 'redux'

import {apiService, APIError} from 'services/api'
import {STATUS, Task} from 'types'


export const LOAD_TASKS = 'LOAD_TASKS'
export function loadTasks (boardId: string) {
  return async function (dispatch: Dispatch) {
    // first get rid of existing tasks to avoid stale UI flicker
    dispatch({type: LOAD_TASKS, tasks: []})
    try{
      const tasks = await apiService.getTasks(boardId)
      // this.setState({tasks})
      dispatch({type: LOAD_TASKS, tasks})
    } catch (e) {
      if (e instanceof APIError) {
        dispatch(globalError(e))
      } else {
        throw e
      }
    }
  }
}

export const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
export function changeTaskStatus(taskId: number, status: STATUS) {
  return {
    type: CHANGE_TASK_STATUS,
    taskId,
    status,
  }
}

export const GLOBAL_ERROR = 'GLOBAL_ERROR'
export function globalError (e: Error) {
  return {
    type: GLOBAL_ERROR,
    message: e.toString(),
  }
}

export const LOAD_BOARDS = 'LOAD_BOARDS'
export function loadBoards () {
  return async function (dispatch: Dispatch) {
    const boards = await apiService.getBoards()
    dispatch({type: LOAD_BOARDS, boards})
  }
}
