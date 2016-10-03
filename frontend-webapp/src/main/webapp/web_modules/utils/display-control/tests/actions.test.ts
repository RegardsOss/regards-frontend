import configureStore from "redux-mock-store"
const {apiMiddleware} = require('redux-api-middleware')
import thunk from "redux-thunk"
import * as nock from "nock"
import { expect } from "chai"
import * as EndpointActions from "../src/endpoints/EndpointActions"
import { Action, AnyMeta } from "flux-standard-action"
import { FluxStandardAction, defaultFluxStandardError } from "@regardsoss/api"
const middlewares = [thunk, apiMiddleware]
const mockStore = configureStore(middlewares)

describe('[COMMON] Testing endpoints actions', () => {

  afterEach(() => {
    nock.cleanAll()
  })

  // Test dégradé dans le cas ou le serveur renvoie un erreur
  xit('creates ENDPOINT_FAILURE action when fetching endpoints returning error', () => {
    nock(EndpointActions.ENDPOINTS_API)
    .get('')
    .reply(500, 'Oops')
    const store = mockStore({
      endpoints: {
        isFetching: false,
        items: {},
        lastUpdate: ''
      }
    })

    const requestAction: Action<any> & AnyMeta = {
      type: 'ENDPOINTS_REQUEST',
      payload: undefined,
      meta: undefined
    }
    const failureAction: FluxStandardAction & AnyMeta = {
      type: 'ENDPOINTS_FAILURE',
      error: true,
      meta: undefined,
      payload: defaultFluxStandardError
    }
    const expectedActions = [requestAction, failureAction]

    return store.dispatch(EndpointActions.fetchEndpoints())
                .then(() => { // return of async actions
                  expect(store.getActions()).to.eql(expectedActions)
                })
  })

  // Test nominal
  it('creates ENDPOINTS_REQUEST and ENDPOINTS_SUCCESS actions when fetching endpoints has been done', () => {
    nock(EndpointActions.ENDPOINTS_API)
    .get('')
    .reply(200, {
      "projects_users_url": "http://localhost:8080/api/users",
      "projects_url": "http://localhost:8080/api/projects"
    })
    const store = mockStore({
      endpoints: {
        isFetching: false,
        items: {},
        lastUpdate: ''
      }
    })

    const requestAction: Action<any> & AnyMeta = {
      type: 'ENDPOINTS_REQUEST',
      payload: undefined,
      meta: undefined
    }
    const successAction: Action<any> & AnyMeta = {
      type: 'ENDPOINTS_SUCCESS',
      meta: undefined,
      payload: {
        "projects_users_url": "http://localhost:8080/api/users",
        "projects_url": "http://localhost:8080/api/projects"
      }
    }
    const expectedActions = [requestAction, successAction]

    return store.dispatch(EndpointActions.fetchEndpoints())
                .then(() => { // return of async actions
                  expect(store.getActions()).to.eql(expectedActions)
                })
  })

  it('should create an action to delete an endpoint', () => {
    const expectedAction = {
      type: 'DELETE_ENDPOINT',
      id: 'projects_users_url'
    }
    expect(EndpointActions.deleteEndpoint('projects_users_url')).to.eql(expectedAction)
  })

})
