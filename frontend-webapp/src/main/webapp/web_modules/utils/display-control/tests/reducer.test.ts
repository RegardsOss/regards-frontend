import { expect } from "chai"
import { Action } from "redux"
import { EndpointActions, endpointReducer } from "../src/main"

describe('[COMMON] Testing endpoints reducer', () => {

  it('should return the initial state', () => {
    expect(endpointReducer(undefined, {})).to.eql({
      isFetching: false,
      items: {},
      lastUpdate: ''
    })
  })

  it('should handle fetch request', () => {
    const action: Action = {
      type: EndpointActions.ENDPOINTS_REQUEST
    }
    const initState = {
      isFetching: false
    }
    const expectedState = {
      isFetching: true
    }
    expect(endpointReducer(initState, action)).to.eql(expectedState)
  })

  it('should handle fetch success', () => {
    const action = {
      type: EndpointActions.ENDPOINTS_SUCCESS,
      payload: {
        "projects_users_url": "http://localhost:8080/api/users",
        "projects_url": "http://localhost:8080/api/projects"
      }
    }
    const initState = {
      isFetching: true,
      items: {},
      lastUpdate: ''
    }
    const expectedState = {
      isFetching: false,
      items: {
        "projects_users_url": "http://localhost:8080/api/users",
        "projects_url": "http://localhost:8080/api/projects"
      },
      lastUpdate: ''
    }
    expect(endpointReducer(initState, action)).to.eql(expectedState)
  })

  it('should handle fetch failure', () => {
    const action = {
      type: EndpointActions.ENDPOINTS_FAILURE,
      error: "Oops there was an error!"
    }
    const initState = {
      isFetching: true,
      items: {},
      lastUpdate: ''
    }
    const expectedState = {
      isFetching: false,
      items: {},
      lastUpdate: ''
    }
    expect(endpointReducer(initState, action)).to.eql(expectedState)
  })

  it('should delete an endpoint', () => {
    const action = {
      type: EndpointActions.DELETE_ENDPOINT,
      id: 'projects_users_url'
    }
    const initState = {
      items: {
        projects_url: 'http://localhost:8080/api/projects',
        projects_users_url: 'http://localhost:8080/api/users'
      }
    }
    const expectedState = {
      items: {
        projects_url: 'http://localhost:8080/api/projects'
      }
    }
    expect(endpointReducer(initState, action)).to.eql(expectedState)
  })

})
