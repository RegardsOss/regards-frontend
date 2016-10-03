import configureStore from "redux-mock-store"
const {apiMiddleware} = require('redux-api-middleware')
import thunk from "redux-thunk"
import * as nock from "nock"
import { expect } from "chai"
import * as actions from "../src/AccessRightsActions"
import { DependencyAccessRight } from "@regardsoss/access-rights"
import { Action, AnyMeta } from "flux-standard-action"
import { FluxStandardAction, defaultFluxStandardError } from "@regardsoss/api"

const middlewares = [thunk, apiMiddleware]
const mockStore = configureStore(middlewares)

describe('[COMMON] Testing access rights actions', () => {

  afterEach(() => {
    nock.cleanAll()
  })

  // Test dégradé dans le cas ou le serveur renvoie un erreur
  xit('creates FAILED_ACCESSRIGHTS action when fetching access rights returning error', () => {
    nock(actions.ACCESS_RIGHTS_API)
    .post('')
    .reply(500, 'Oops')
    const store = mockStore({views: []})

    const requestAction: Action<any> & AnyMeta = {
      type: 'REQUEST_ACCESSRIGHTS',
      payload: undefined,
      meta: undefined
    }
    const failureAction: FluxStandardAction & AnyMeta = {
      type: 'FAILED_ACCESSRIGHTS',
      error: true,
      meta: undefined,
      payload: defaultFluxStandardError
    }
    const expectedActions = [requestAction, failureAction]

    const dependencies: Array<DependencyAccessRight> = [
      {id: "aGetDependency", verb: "GET", endpoint: "/aGetDependency", access: false},
      {id: "anOtherGetDependency", verb: "GET", endpoint: "/anOtherGetDependency", access: false},
      {id: "aDeleteDependency", verb: "DELETE", endpoint: "/aDeleteDependency", access: false}]

    return store.dispatch(actions.fetchAccessRights(dependencies))
                .then(() => { // return of async actions
                  expect(store.getActions()).to.eql(expectedActions)
                })
  })

  // Test nominal
  it('creates PROJECTS_REQUEST and PROJECTS_SUCESS actions when fetching access rights has been done', () => {
    nock(actions.ACCESS_RIGHTS_API)
    .post('')
    .reply(200, [
      {id: "aGetDependency", verb: "GET", endpoint: "/aGetDependency", access: true},
      {id: "anOtherGetDependency", verb: "GET", endpoint: "/anOtherGetDependency", access: false},
      {id: "aDeleteDependency", verb: "DELETE", endpoint: "/aDeleteDependency", access: true}
    ])
    const store = mockStore({views: []})

    const requestAction: Action<any> & AnyMeta = {
      type: 'REQUEST_ACCESSRIGHTS',
      payload: undefined,
      meta: undefined
    }
    const successAction: Action<any> & AnyMeta = {
      type: 'RECEIVE_ACCESSRIGHTS',
      meta: undefined,
      payload: [
        {id: "aGetDependency", verb: "GET", endpoint: "/aGetDependency", access: true},
        {id: "anOtherGetDependency", verb: "GET", endpoint: "/anOtherGetDependency", access: false},
        {id: "aDeleteDependency", verb: "DELETE", endpoint: "/aDeleteDependency", access: true}
      ]
    }
    const expectedActions = [requestAction, successAction]

    const dependencies: Array<DependencyAccessRight> = [
      {id: "aGetDependency", verb: "GET", endpoint: "/aGetDependency", access: false},
      {id: "anOtherGetDependency", verb: "GET", endpoint: "/anOtherGetDependency", access: false},
      {id: "aDeleteDependency", verb: "DELETE", endpoint: "/aDeleteDependency", access: false}]

    return store.dispatch(actions.fetchAccessRights(dependencies))
                .then(() => { // return of async actions
                  expect(store.getActions()).to.eql(expectedActions)
                })
  })

})
