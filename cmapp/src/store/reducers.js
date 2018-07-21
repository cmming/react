// 
import { combineReducers } from 'redux'
import { counter } from '../react.redux'
import { auth } from './Auth.redux'

export default combineReducers({
    counter,
    auth
})