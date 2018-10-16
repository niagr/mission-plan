import { LOAD_TASKS } from 'store/actions'
import { GLOBAL_ERROR } from '../actions';

const initState = {
    tasks: [],
    error: undefined,
}

export default (state=initState, action) => {
    switch (action.type) {
        case LOAD_TASKS:
            return {
                ...state,
                tasks: action.tasks
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