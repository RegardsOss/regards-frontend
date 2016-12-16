import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { authorizationMiddleware } from '@regardsoss/authentication-manager'
import createLogger from 'redux-logger'
import root from 'window-or-global'
import preloadedState from './preloadedState'

// Middlewares
const { apiMiddleware } = require('redux-api-middleware')

function configureStore(rootReducer) {
  const logger = createLogger() // Pass an options object for specific configuration

  // Define the used middlewares (order matters)
  const middlewares = [
    thunk, // lets us dispatch() functions
    authorizationMiddleware, // inject authorization headers in all request actions
    apiMiddleware, // middleware for calling an REST API
    logger, // Logger must be the last middleware in chain, otherwise it will log thunk and promise, not actual actions
  ]

  // Create the application store
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(...middlewares),
      root.devToolsExtension ? root.devToolsExtension() : f => f, // Enable redux dev tools
    ),
  )

  return store
}

export default configureStore
