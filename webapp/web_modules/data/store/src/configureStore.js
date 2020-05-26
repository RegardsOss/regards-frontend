/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import root from 'window-or-global'
import headersMiddleware from './headersMiddleware'
import preloadedState from './preloadedState'
import configureReducers from './configureReducers'
import getReducerRegistry from './ReducerRegistry'
import errorMiddleware from './errorMiddleware'
import SessionLockedMiddleware from './SessionLockedMiddleware'

// Middlewares
const { apiMiddleware } = require('redux-api-middleware')

function configureStore(rootReducer) {
  const reducerRegistry = getReducerRegistry(rootReducer)

  // Define the used middlewares (order matters)
  const middlewares = [
    thunk, // lets us dispatch() functions
    SessionLockedMiddleware, // Check if session is locked before forwarding actions
    headersMiddleware, // inject headers in all request actions, for authorization, content type and custom headers handling
    apiMiddleware, // middleware for calling an REST API
    errorMiddleware,
  ]

  // Pass an options object for specific configuration (to be enabled by dev on need)
  // if (process.env.NODE_ENV === 'development') {
  // import { createLogger } from 'redux-logger'
  //   const logger = createLogger({
  //     level: 'log',
  //     // Do not log these actions
  //     predicate: (getState, action) => !action.type.match(/menu\/notification/)
  //       && !action.type.match(/@@redux-form\/REGISTER_FIELD/)
  //       && !action.type.match(/admin\/waiting-access-users/)
  //       && !action.type.match(/common\/themes\//),
  //   })
  //   // Logger must be the last middleware in chain, otherwise it will log thunk and promise, not actual actions]
  //   middlewares.push(logger)
  // }

  // Create the application store
  /* eslint-disable no-underscore-dangle */
  const store = createStore(
    configureReducers(reducerRegistry.getReducers()),
    preloadedState,
    compose(
      applyMiddleware(...middlewares),
      root.__REDUX_DEVTOOLS_EXTENSION__ ? root.__REDUX_DEVTOOLS_EXTENSION__() : f => f, // Enable redux dev tools
    ),
  )
  /* eslint-enable */

  // Reconfigure the store's reducer when the reducer registry is changed - we
  // depend on this for loading reducers via code splitting and for hot
  // reloading reducer modules.
  reducerRegistry.setChangeListener((reducers) => {
    store.replaceReducer(configureReducers(reducers))
  })

  return store
}

export default configureStore
