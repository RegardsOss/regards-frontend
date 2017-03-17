import nock from 'nock'
import { assert } from 'chai'
import thunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { stub } from 'sinon'

const { apiMiddleware } = require('redux-api-middleware')


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
      compose(
        applyMiddleware(...middlewares),
      ),
    )
  }

  runTests(done) {
    assert.isDefined(this.entityActions, 'Action undefined')
    assert.isDefined(this.entityReducers, 'Reducer undefined')
    assert.isDefined(this.entitySelectors, 'Selector undefined')
    assert.isFunction(this.entityShape, 'Your shape is not correctly defined')
    this.runActionTest(done)
  }

  runSelectorTest(store, done) {
    let shapeResult
    try {
      const entityList = this.entitySelectors.getList(store.getState())
      shapeResult = this.entityShape({ entityList }, 'entityList', 'ReduxEntityTester')
      assert.isNull(shapeResult, 'There is a shape error')
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
      return done(e)
    }
    return this.runSelectorTest(store, done)
  }


  runActionTest(done) {
    try {
      const store = this.getStore()
      if (this.entityActions.fetchPagedEntityList) {
        assert.isDefined(this.backendServerResultList.metadata, 'Your Action is Pageable but the result you provided comes from a list entrypoint')
        store.dispatch(this.entityActions.fetchPagedEntityList(null, null, this.options.urlParams))
          .then((action) => {
            this.onPostActionTest(action, store, done)
          })
      } else if (this.entityActions.fetchEntityList) {
        assert.isUndefined(this.backendServerResultList.metadata, 'Your Action is a List but the result you provided comes from a pageable entrypoint')
        store.dispatch(this.entityActions.fetchEntityList(this.options.urlParams))
          .then((action) => {
            this.onPostActionTest(action, store, done)
          })
      } else {
        done("Action can't be tested. Is it a Basic[Array|List|Pageable]Actions that you provided ?")
      }
    } catch (e) {
      done(e)
    }
  }

  /**
   * Mock the URL to return a specify json as string
   */
  beforeAll() {
    let entityEndpoint = this.entityActions.entityEndpoint
    if (this.options.urlParams) {
      entityEndpoint = this.entityActions.handleRequestPathParameters(this.entityActions.entityEndpoint, this.options.urlParams)
    }
    nock(GATEWAY_HOSTNAME)
      .get(entityEndpoint.replace(GATEWAY_HOSTNAME, ''))
      .reply(200, this.backendServerResultList)

    const previousConsoleError = console.error
    // Since react will console.error propType manual that we use in pure JS to check if normalized
    // entities matches Shapes, we use sinon.js to stub it into throwing only others errors
    this.stubConsole = stub(console, 'error').callsFake((warning) => {
      if (!warning.includes('Warning: You are manually calling a React.PropTypes validation function for the')) {
        previousConsoleError(warning)
      }
    })
  }


  /**
   * Remove any HTTP mock created
   */
  afterAll() {
    nock.cleanAll()
    this.stubConsole.restore()
  }
}
