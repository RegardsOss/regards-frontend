/*
 * LICENSE_PLACEHOLDER
 */
import * as ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { configureStore } from '@regardsoss/store'
import rootReducer from './rootReducer'
import rootRouter from './rootRouter'

/**
 * Main entry point for js application.
 *
 * @author Sébastien Binda
 */


// Import the index.html file
require('../index.html')

// import static configuration parameters
if (process.env.NODE_ENV === 'production') {
  require('../conf/staticConfiguration.js')
} else {
  require('../conf/staticConfiguration.dev.js')
}

const store = configureStore(rootReducer)

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
try {
  injectTapEventPlugin()
} catch (e) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Failed to inject injectTapEventPlugin. Are you in watch mode?')
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={rootRouter} />
  </Provider>,
  document.getElementById('app'),
)
