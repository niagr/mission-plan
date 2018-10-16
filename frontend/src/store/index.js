import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

import mainReducer from './reducers'

export const store = createStore(mainReducer, applyMiddleware(thunkMiddleware))