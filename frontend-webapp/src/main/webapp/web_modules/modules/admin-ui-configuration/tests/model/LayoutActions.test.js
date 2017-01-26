/**
 * LICENSE_PLACEHOLDER
 **/
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { expect } from 'chai'
import LayoutAction from '../../src/model/layout/LayoutActions'
import layoutsResponse from './mockLayoutsResponse'

const { apiMiddleware } = require('redux-api-middleware')

const middlewares = [thunk, apiMiddleware]
const mockStore = configureStore(middlewares)

describe('[ADMIN UI-CONFIGURATION] Testing Layout actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('Generate action to retrieve a given layout', () => {
    nock(`${LayoutAction.entityEndpoint}/user`)
      .get('')
      .reply(200, layoutsResponse)
    const initialState = {}
    const store = mockStore(initialState)

    const expectedAction = {
      type: LayoutAction.ENTITY_SUCCESS,
      payload: {
        entities: {
          layout: {
            user: layoutsResponse,
          },
        },
        result: 'user',
      },
      meta: undefined,
    }

    store.dispatch(LayoutAction.fetchEntity('user'))
      .then(() => { // return of async actions
        expect(store.getActions()).to.deep.contain(expectedAction)
      })
  })

  it('Generate action to retrieve a non existing layout', () => {
    nock(`${LayoutAction.entityEndpoint}/unknown`)
      .get('')
      .reply(404)
    const initialState = {}
    const store = mockStore(initialState)

    const expectedAction = {
      type: LayoutAction.ENTITY_FAILURE,
      payload: {
        name: 'ApiError',
        status: 404,
        statusText: 'Not Found',
        response: undefined,
        message: '404 - Not Found',
      },
      meta: { errorMessage: 'Not Found' },
      error: true,
    }

    store.dispatch(LayoutAction.fetchEntity('unknown'))
      .then(() => { // return of async actions
        expect(store.getActions()).to.deep.contain(expectedAction)
      })
  })
})
