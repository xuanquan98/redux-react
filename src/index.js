import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import App from './components/App'

console.log("Root Component (src/main.js) ")
const store = createStore(rootReducer)
console.log("The Store đã được tạo: ")
console.log(store)


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)