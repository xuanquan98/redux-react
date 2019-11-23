import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import demoo from './demo'

let x =null
export default combineReducers({
    todos,
    visibilityFilter,
    demoo,
    x
})