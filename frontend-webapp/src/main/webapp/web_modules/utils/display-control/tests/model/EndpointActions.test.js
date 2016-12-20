import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { expect } from 'chai'
import defaultFluxStandardError from '@regardsoss/tests-helpers'
import * as EndpointActions from '../../src/model/EndpointActions'

const { apiMiddleware } = require('redux-api-middleware')

const middlewares = [thunk, apiMiddleware]
const mockStore = configureStore(middlewares)

function handleDispatch(action, expectedAction, store, done) {
  store.dispatch(action)
    .then(() => {
      try {
        expect(store.getActions()).to.contain(expectedAction)
        done()
      } catch (e) {
        console.error('store.getActions() is', JSON.stringify(store.getActions()))
        console.error('expectedAction is', JSON.stringify(expectedAction))
        done(e)
      }
    })
}
describe('[DISPLAY CONTROL UTILS] Testing endpoints actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  // Whatever usecase
  it('it creates an ENDPOINTS_REQUEST action ', (done) => {
    nock(EndpointActions.ENDPOINTS_API)
      .get('')
      .reply(500, 'Oops')
    const store = mockStore({
      endpoints: {
        isFetching: false,
      },
    })

    const expectedAction = {
      type: 'ENDPOINTS_REQUEST',
      payload: undefined,
      meta: undefined,
    }
    handleDispatch(EndpointActions.fetchEndpoints(), expectedAction, store, done)
  })
  // Usual usecase
  it('it creates ENDPOINTS_REQUEST and ENDPOINTS_SUCCESS actions when fetching endpoints has been done', (done) => {
    nock(EndpointActions.ENDPOINTS_API)
    .get('')
    .reply(200, {
      projects_users_url: 'http://localhost:8080/api/users',
      projects_url: 'http://localhost:8080/api/projects',
    })
    const store = mockStore({
      endpoints: {
        isFetching: false,
        items: {},
        lastUpdate: '',
      },
    })

    const successAction = {
      type: 'ENDPOINTS_SUCCESS',
      meta: undefined,
      payload: {
        projects_users_url: 'http://localhost:8080/api/users',
        projects_url: 'http://localhost:8080/api/projects',
      },
    }
    handleDispatch(EndpointActions.fetchEndpoints(), successAction, store, done)
  })
})
