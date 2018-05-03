/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import concat from 'lodash/concat'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import isFunction from 'lodash/isFunction'
import root from 'window-or-global'
import headersMiddleware from './headersMiddleware'
import formatURLMiddleware from './formatURLMiddleware'
import preloadedState from './preloadedState'
import configureReducers from './configureReducers'
import getReducerRegistry from './ReducerRegistry'
import errorMiddleware from './errorMiddleware'
import SessionLockedMiddleware from './SessionLockedMiddleware'

// Middlewares
const { apiMiddleware } = require('redux-api-middleware')

function configureStore(rootReducer) {
  // Pass an options object for specific configuration
  const logger = createLogger({
    level: 'log',
  })

  const reducerRegistry = getReducerRegistry(rootReducer)

  // Define the used middlewares (order matters)
  let middlewares = [
    thunk, // lets us dispatch() functions
    SessionLockedMiddleware, // Check if session is locked before forwarding actions
    formatURLMiddleware, // inject URL formatting middleware
    headersMiddleware, // inject headers in all request actions, for authorization, content type and custom headers handling
    apiMiddleware, // middleware for calling an REST API
    errorMiddleware,
  ]

  if (process.env.NODE_ENV === 'development') {
    // Logger must be the last middleware in chain, otherwise it will log thunk and promise, not actual actions]
    middlewares = concat([], middlewares, [logger])
  }

  // Enable redux dev tools
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = root.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && isFunction(root.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? root.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify redux dev tools options
    maxAge: 80,
  }) : compose

  // Create the application store
  const store = createStore(
    configureReducers(reducerRegistry.getReducers()),
    preloadedState,
    composeEnhancers(
      applyMiddleware(...middlewares),
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
