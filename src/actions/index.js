let nextTodoId = 0

export const addTodo = text => {
console.log("Action addTodo")
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
}}

export const setVisibilityFilter = filter => {
console.log("Action setVisibilityFilter")
return {
    type: 'SET_VISIBILITY_FILTER',
    filter
}}

export const toggleTodo = id => {
console.log("Action toggleTodo")
return {
    type: 'TOGGLE_TODO',
    id
}}

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}