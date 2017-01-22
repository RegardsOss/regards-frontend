import * as ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { getReducerRegistry, configureStore } from '@regardsoss/store'
import rootReducer from './rootReducer'
import rootRouter from './rootRouter'

// Import the index.html file
require('../index.html')

const reducerRegistry = getReducerRegistry(rootReducer)

const store = configureStore(reducerRegistry)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={rootRouter} />
  </Provider>,
  document.getElementById('app'),
)
/*
if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update')
  whyDidYouUpdate(React, { exclude: /^Paper/ })
}
*/
