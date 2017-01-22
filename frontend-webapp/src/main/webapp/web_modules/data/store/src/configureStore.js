/**
 * LICENSE_PLACEHOLDER
 **/
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { authorizationMiddleware } from '@regardsoss/authentication-manager'
import createLogger from 'redux-logger'
import root from 'window-or-global'
import preloadedState from './preloadedState'
import configureReducers from  './configureReducers'

// Middlewares
const { apiMiddleware } = require('redux-api-middleware')

function configureStore(reducerRegistry) {
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
    configureReducers(reducerRegistry.getReducers()),
    preloadedState,
    compose(
      applyMiddleware(...middlewares),
      root.devToolsExtension ? root.devToolsExtension() : f => f, // Enable redux dev tools
    ),
  )

  // Reconfigure the store's reducer when the reducer registry is changed - we
  // depend on this for loading reducers via code splitting and for hot
  // reloading reducer modules.
  reducerRegistry.setChangeListener((reducers) => {
    console.log("Replacing reducers with ", reducers)
    store.replaceReducer(configureReducers(reducers))
  })

  return store
}

export default configureStore
