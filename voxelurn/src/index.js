import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createStore from 'store/createStore'
import Routes from 'routes'


/* Create the Redux Store */
const store = createStore()
export const getStore = () => {
  return store
}

/* Render our React App with Provider onto the root element */
ReactDOM.render(
  <Provider store={store}>
  {/* <Routes history={history} /> */}
    <Routes />

  </Provider>,
  document.getElementById('root')
)