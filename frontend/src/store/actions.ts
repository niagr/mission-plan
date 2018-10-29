import {Dispatch, Action} from 'redux'

import {apiService, APIError} from 'services/api'
import {STATUS, Task} from 'types'


export const LOAD_TASKS = 'LOAD_TASKS'
export function loadTasks (boardId: number) {
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
    try {
      const boards = await apiService.getBoards()
      dispatch({type: LOAD_BOARDS, boards})
    } catch (e) {
      if (e instanceof APIError) {
        console.log("BBBBB")
        dispatch(globalError(e))
      } else {
        throw e
      }
    }
  }
}

export const LOAD_TASK = 'LOAD_TASK'
export function loadTask(boardId: number, taskId: number) {
  return async function (dispatch: Dispatch) {
    dispatch({type: LOAD_TASK, task: []})
    const task = await apiService.getTask(boardId, taskId)
    dispatch({type: LOAD_TASK, task})
  }
}

export const CHANGE_TASK_DATA = 'CHANGE_TASK_DATA'
export function changeTaskData(boardId: number, taskId: number, taskData: Partial<Task>) {
  return async function (dispatch: Dispatch) {
    try {
      const changedTask = await apiService.changeTask(boardId, taskId, taskData)
      dispatch({type: CHANGE_TASK_DATA, changedTask})
    } catch (e) {
      dispatch(globalError(e))
    }
  }
}
