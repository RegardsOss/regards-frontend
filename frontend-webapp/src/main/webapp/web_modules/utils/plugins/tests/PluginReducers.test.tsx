import { expect } from "chai"
import { Action } from "redux"
import reducer from "../src/PluginReducers"
import { PluginsStore, PluginType } from "@regardsoss/plugins"
import { PluginInitializedAction } from "../src/PluginsActions"
import * as React from "react"

describe('[COMMON] Testing plugin reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql({
      isFetching: false,
      items: [],
      lastUpdate: ''
    })
  })

  it('should handle fetch request', () => {
    const action: Action = {
      type: 'REQUEST_PLUGINS'
    }
    const initState: PluginsStore = {
      isFetching: false,
      items: [],
      lastUpdate: ''
    }
    const expectedState: PluginsStore = {
      isFetching: true,
      items: [],
      lastUpdate: ''
    }
    expect(reducer(initState, action)).to.eql(expectedState)
  })

  it('should handle fetch success', () => {
    const plugin: PluginType = {name: 'HelloWorldPlugin', loadedComponent: null, paths: []}
    const action = {
      type: 'RECEIVE_PLUGINS',
      payload: [
        plugin
      ],
      meta: {
        receivedAt: 'Yesterday'
      }
    }
    const initState: PluginsStore = {
      isFetching: true,
      items: [],
      lastUpdate: ''
    }
    const expectedState: PluginsStore = {
      isFetching: false,
      items: [
        {name: 'HelloWorldPlugin', loadedComponent: null, paths: []}
      ],
      lastUpdate: 'Yesterday'
    }
    expect(reducer(initState, action)).to.eql(expectedState)
  })

  it('should handle fetch failure', () => {
    const action = {
      type: 'FAILED_PLUGINS',
      error: "Oops there was an error!"
    }
    const initState: PluginsStore = {
      isFetching: true,
      items: [],
      lastUpdate: ''
    }
    const expectedState: PluginsStore = {
      isFetching: false,
      items: [],
      lastUpdate: ''
    }
    expect(reducer(initState, action)).to.eql(expectedState)
  })

  it('should handle plugin initialization', () => {
    class FakeComponent extends React.Component<any, any> {
    }
    const action: PluginInitializedAction = {
      type: 'PLUGIN_INITIALIZED',
      name: 'HelloWorldPlugin',
      loadedComponent: FakeComponent,
      error: ''
    }
    const initState: PluginsStore = {
      isFetching: false,
      items: [
        {
          name: 'HelloWorldPlugin',
          loadedComponent: null,
          paths: []
        }
      ],
      lastUpdate: ''
    }
    const expectedState: PluginsStore = {
      isFetching: false,
      items: [
        {
          name: 'HelloWorldPlugin',
          loadedComponent: FakeComponent,
          paths: []
        }
      ],
      lastUpdate: ''
    }
    expect(reducer(initState, action)).to.eql(expectedState)
  })

})
