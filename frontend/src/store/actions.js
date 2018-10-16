import {apiService, APIError} from 'services/api'

console.log(apiService)

export const LOAD_TASKS = 'LOAD_TASKS'
export function loadTasks () {
    return async function (dispatch) {
        try{
            const tasks = await apiService.getTasks()
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

export const GLOBAL_ERROR = 'GLOBAL_ERROR'
export function globalError (e) {
    return {
        type: GLOBAL_ERROR,
        message: e.toString(),
    }
}
