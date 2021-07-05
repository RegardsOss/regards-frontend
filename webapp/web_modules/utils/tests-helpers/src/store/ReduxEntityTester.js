/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import nock from 'nock'
import { assert } from 'chai'
import thunk from 'redux-thunk'
import {
  combineReducers, createStore, applyMiddleware, compose,
} from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import { BasicActions } from '@regardsoss/store-utils'
// Since redux-api-middleware v2, we need to add the polyfill ourself
require('isomorphic-fetch')

const originalConsoleError = console.error

export default class ReduxEntityTester {
  constructor(entityActions, entityReducers, entitySelectors, entityShape, backendServerResultList, options) {
    this.entityActions = entityActions
    this.entityReducers = entityReducers
    this.entitySelectors = entitySelectors
    this.entityShape = entityShape
    this.backendServerResultList = backendServerResultList
    this.options = options
  }

  popLeafStore(remainingArray) {
    const firstKey = remainingArray.shift()
    const obj = {}
    if (remainingArray.length > 0) {
      obj[firstKey] = this.popLeafStore(remainingArray)
    } else {
      obj[firstKey] = this.entityReducers
    }
    return combineReducers(obj)
  }

  getRootStore(remainingArray) {
    const firstKey = remainingArray.shift()
    const obj = {}
    obj[firstKey] = this.popLeafStore(remainingArray)
    return combineReducers(obj)
  }

  getStore() { // Define the used middlewares (order matters)
    const middlewares = [
      thunk, // lets us dispatch() functions
      apiMiddleware, // middleware for calling an REST API
    ]

    // Create the application store
    return createStore(
      // Make a copy of rootStore and send use it to create a store tree
      this.getRootStore(this.entitySelectors.rootStore.slice()),
      {},
      compose(applyMiddleware(...middlewares)),
    )
  }

  runTests(done) {
    assert.isDefined(this.entityReducers, 'Reducer undefined')
    assert.isDefined(this.entitySelectors, 'Selector undefined')
    assert.isFunction(this.entityShape, 'Your shape is not correctly defined')
    this.runActionTest(done)
  }

  runSelectorTest(store, done) {
    let shapeResult
    try {
      const entityList = this.entitySelectors.getList(store.getState())
      shapeResult = PropTypes.checkPropTypes(this.entityShape, entityList, 'entityList', 'ReduxEntityTester')
      assert.isUndefined(shapeResult, 'There is a shape error')
      assert.isDefined(entityList, 'There is no result returned by the selector')
      this.afterAll()
      done()
    } catch (e) {
      done(new Error(`${e}.
      Full shape error: ${JSON.stringify(shapeResult)}
      Store: ${JSON.stringify(store.getState())}
      `))
    }
  }

  onPostActionTest(action, store, done) {
    try {
      assert.isDefined(action.payload.entities, `An error happened between JSON received and normalization at the end of the action: ${JSON.stringify(action)}`)
    } catch (e) {
      console.error('Action received', action)
      return done(e)
    }
    return this.runSelectorTest(store, done)
  }

  runActionTest(done) {
    try {
      const store = this.getStore()
      if (this.entityActions.fetchPagedEntityList) {
        assert.isDefined(this.backendServerResultList.metadata, 'Your Action is Pageable but the result you provided comes from a list entrypoint')
        return store.dispatch(this.entityActions.fetchPagedEntityList(null, null, this.options.pathParams))
          .then((action) => this.onPostActionTest(action, store, done))
      }
      if (this.entityActions.fetchEntityList) {
        assert.isUndefined(this.backendServerResultList.metadata, 'Your Action is a List but the result you provided comes from a pageable entrypoint')
        return store.dispatch(this.entityActions.fetchEntityList(this.options.pathParams))
          .then((action) => this.onPostActionTest(action, store, done))
      }
      return done("Action can't be tested. Is it a Basic[Array|List|Pageable]Actions that you provided ?")
    } catch (e) {
      return done(e)
    }
  }

  /**
   * Mock the URL to return a specify json as string
   */
  beforeAll() {
    // Handle entityActions undefined
    if (!this.entityActions) {
      throw new Error("The action you've provided is undefined")
    }
    let { entityEndpoint } = this.entityActions
    if (this.options.pathParams) {
      entityEndpoint = BasicActions.buildURL(this.entityActions.entityEndpoint, this.options.pathParams)
    }
    if (this.entityActions.fetchPagedEntityList) {
      entityEndpoint = `${entityEndpoint}?page=0&size=2000`
    }
    nock(GATEWAY_HOSTNAME)
      .get(entityEndpoint.replace(GATEWAY_HOSTNAME, ''))
      .reply(200, this.backendServerResultList)

    nock(GATEWAY_HOSTNAME)
      .post(entityEndpoint.replace(GATEWAY_HOSTNAME, ''))
      .reply(200, this.backendServerResultList)

    // Since react will console.error propType manual that we use in pure JS to check if normalized
    // entities matches Shapes, we use sinon.js to stub it into throwing only others errors
    console.error = (warning, ...args) => {
      if (!warning.includes('Warning: You are manually calling a PropTypes validation function for the')) {
        originalConsoleError(warning)
      } else {
        throw new Error([warning, ...args].join(' '))
      }
    }
  }

  /**
   * Remove any HTTP mock created
   */
  afterAll = () => {
    nock.cleanAll()
    console.error = originalConsoleError
  }
}
