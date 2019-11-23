import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
    todos,
    visibilityFilter
})

console.log("Root Reducer (src/reducers/index.js) đã gọi các reducer (todos.js và visibilityFilter.js)")