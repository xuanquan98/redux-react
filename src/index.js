import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import App from './components/App'

console.log("Root Component (src/main.js) ")
const store = createStore(rootReducer)
console.log("The Store đã được tạo: ")

console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState()))

// Dispatch some actions
// Stop listening to state updates
unsubscribe()

render(
    <Provider store={store}>
    {console.log(store)}
        <App />
    </Provider>,
    document.getElementById('root')
)