import configureStore from "redux-mock-store"
const {apiMiddleware} = require('redux-api-middleware')
import thunk from "redux-thunk"
import * as nock from "nock"
import { expect } from "chai"
import * as actions from "../src/AuthenticateActions"
import { Action, AnyMeta } from "flux-standard-action"
import { FluxStandardAction, defaultFluxStandardError } from "@regardsoss/api"

const middlewares = [thunk, apiMiddleware]
const mockStore = configureStore(middlewares)

describe('[COMMON] Testing authentication actions', () => {

  afterEach(() => {
    nock.cleanAll()
  })

  // Test dégradé dans le cas ou le serveur renvoie un erreur
  xit('creates FAILED_AUTHENTICATE action when fetching authentication returning error', () => {
    const username = 'myUsername'
    const password = 'myPassword'

    nock(actions.AUTHENTICATE_API)
    .post('')
    .query({grant_type: 'password', username, password})
    .reply(500, 'Oops')
    const store = mockStore({authentication: []})

    const requestAction: Action<any> & AnyMeta = {
      type: 'REQUEST_AUTHENTICATE',
      payload: undefined,
      meta: undefined
    }
    const failureAction: FluxStandardAction & AnyMeta = {
      type: 'FAILED_AUTHENTICATE',
      error: true,
      meta: {
        "errorMessage": "authentication.error"
      },
      payload: defaultFluxStandardError
    }
    const expectedActions = [requestAction, failureAction]

    return store.dispatch(actions.fetchAuthenticate(username, password))
                .then(() => { // return of async actions
                  expect(store.getActions()).to.eql(expectedActions)
                })
  })

  // Test nominal
  it('creates PROJECTS_REQUEST and PROJECTS_SUCESS actions when fetching authentication has been done', () => {
    const username = 'myUsername'
    const password = 'myPassword'
    // We need to force Date.now() to always return the same value
    Date.now = () => 12345

    nock(actions.AUTHENTICATE_API)
    .post('')
    .query({grant_type: 'password', username, password})
    .reply(200, {
      "access_token": "9e2c4404-acd7-441c-9ee1-b97cbf0c51a5",
      "token_type": "bearer",
      "refresh_token": "a80a7a1b-7c98-43da-a7e6-04c7873ba1d7",
      "expires_in": 35332,
      "scope": "openid"
    })
    const store = mockStore({authentication: []})

    const requestAction: Action<any> & AnyMeta = {
      type: 'REQUEST_AUTHENTICATE',
      payload: undefined,
      meta: undefined
    }
    const successAction: Action<any> & AnyMeta = {
      type: 'RECEIVE_AUTHENTICATE',
      payload: {
        "access_token": "9e2c4404-acd7-441c-9ee1-b97cbf0c51a5",
        "token_type": "bearer",
        "refresh_token": "a80a7a1b-7c98-43da-a7e6-04c7873ba1d7",
        "expires_in": 35332,
        "scope": "openid"
      },
      meta: {
        authenticateDate: 12345,
        name: username
      }
    }
    const expectedActions = [requestAction, successAction]

    return store.dispatch(actions.fetchAuthenticate(username, password))
                .then(() => { // return of async actions
                  expect(store.getActions()).to.eql(expectedActions)
                })
  })

  it('should create an action to logout', () => {
    const expectedAction = {
      type: 'LOGOUT'
    }
    expect(actions.logout()).to.eql(expectedAction)
  })

})
