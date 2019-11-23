import { VisibilityFilters } from '../actions'

const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
    console.log("action trong reducer visibilityFulter.js: ")
    console.log(action)
    console.log("state trong reducer visibilityFulter.js:")
    console.log(state)
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
    }
}

export default visibilityFilter