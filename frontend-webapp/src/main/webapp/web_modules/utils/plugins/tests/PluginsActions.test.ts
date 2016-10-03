import configureStore from "redux-mock-store"
const{apiMiddleware} = require('redux-api-middleware')
import thunk from "redux-thunk"
import * as nock from "nock"
import { expect } from "chai"
import * as actions from "../src/PluginsActions"
import { PluginType } from "@regardsoss/plugins"
import { Action, AnyMeta } from "flux-standard-action"
import { FluxStandardAction, defaultFluxStandardError } from "@regardsoss/api"
import * as React from "react" // You can use any testing library

const middlewares = [thunk, apiMiddleware]
const mockStore = configureStore(middlewares)
describe('[COMMON] Testing plugins actions', () => {

  afterEach(() => {
    nock.cleanAll()
  })

  // Test dégradé dans le cas ou le serveur renvoie un erreur
  xit('creates FAILED_PLUGINS action when fetching plugins returning error', () => {

    nock(actions.PLUGINS_API)
    .get('')
    .reply(500, 'Oops')
    const store = mockStore({plugins: []})

    const requestAction: Action<any> & AnyMeta = {
      type: 'REQUEST_PLUGINS',
      payload: undefined,
      meta: undefined
    }

    const failureAction: FluxStandardAction & AnyMeta = {
      type: 'FAILED_PLUGINS',
      error: true,
      meta: undefined,
      payload: defaultFluxStandardError
    }
    const expectedActions = [requestAction, failureAction]

    return store.dispatch(actions.fetchPlugins())
                .then(() => { // return of async actions
                  expect(store.getActions()).to.eql(expectedActions)
                })
  })

  // Test nominal
  it('creates REQUEST_PLUGINS and RECEIVE_PLUGINS actions when fetching plugins has been done', () => {

    Date.now = () => 12345
    const plugin: PluginType = {name: 'HelloWorldPlugin', loadedComponent: null, paths: []}

    nock(actions.PLUGINS_API)
    .get('')
    .reply(200, plugin)
    const store = mockStore({plugins: []})

    const requestAction: Action<any> & AnyMeta = {
      type: 'REQUEST_PLUGINS',
      payload: undefined,
      meta: undefined
    }
    const successAction: Action<any> & AnyMeta = {
      type: 'RECEIVE_PLUGINS',
      payload: plugin,
      meta: {
        receivedAt: 12345
      }
    }
    const expectedActions = [requestAction, successAction]

    return store.dispatch(actions.fetchPlugins())
                .then(() => { // return of async actions
                  expect(store.getActions()).to.eql(expectedActions)
                })
  })


  it('should create an action to initialize a plugin', () => {
    class FakeComponent extends React.Component<any, any> {
    }
    const expectedAction: actions.PluginInitializedAction = {
      type: 'PLUGIN_INITIALIZED',
      name: 'toto',
      loadedComponent: FakeComponent,
      error: ''
    }
    expect(actions.pluginInitialized('toto', FakeComponent)).to.eql(expectedAction)
  })

})
