/**
 * LICENSE_PLACEHOLDER
 **/
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import root from 'window-or-global'
import concat from 'lodash/concat'
import headersMiddleware from './headersMiddleware'
import formatURLMiddleware from './formatURLMiddleware'
import preloadedState from './preloadedState'
import configureReducers from './configureReducers'
import getReducerRegistry from './ReducerRegistry'
import errorMiddleware from './errorMiddleware'

// Middlewares
const { apiMiddleware } = require('redux-api-middleware')

function configureStore(rootReducer) {
  const logger = createLogger() // Pass an options object for specific configuration

  const reducerRegistry = getReducerRegistry(rootReducer)

  // Define the used middlewares (order matters)
  let middlewares = [
    thunk, // lets us dispatch() functions
    formatURLMiddleware, // inject URL formatting middleware
    headersMiddleware, // inject headers in all request actions, for authorization, content type and custom headers handling
    apiMiddleware, // middleware for calling an REST API
    errorMiddleware,
  ]

  if (process.env.NODE_ENV === 'development') {
    console.log('DEV', 'Using Redux logger middleware')
    // Logger must be the last middleware in chain, otherwise it will log thunk and promise, not actual actions]
    middlewares = concat([], middlewares, [logger])
  }

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
    store.replaceReducer(configureReducers(reducers))
  })

  return store
}

export default configureStore
