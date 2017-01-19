import { expect } from 'chai'
import EndpointActions from '../../src/model/EndpointActions'
import EndpointReducers from '../../src/model/EndpointReducers'

describe('[DISPLAY CONTROL UTILS] Testing endpoints reducer', () => {
  it('should return the initial state', () => {
    expect(EndpointReducers(undefined, {})).to.eql({
      isFetching: false,
      items: {},
      lastUpdate: '',
    })
  })

  it('should handle fetch request', () => {
    const action = {
      type: EndpointActions.ENDPOINTS_REQUEST,
    }
    const initState = {
      isFetching: false,
    }
    const expectedState = {
      isFetching: true,
    }
    expect(EndpointReducers(initState, action)).to.eql(expectedState)
  })

  it('should handle fetch success', () => {
    const action = {
      type: EndpointActions.ENDPOINTS_SUCCESS,
      payload: {
        projects_users_url: 'http://localhost:8080/api/users',
        projects_url: 'http://localhost:8080/api/projects',
      },
    }
    const initState = {
      isFetching: true,
      items: {},
      lastUpdate: '',
    }
    const expectedState = {
      isFetching: false,
      items: {
        projects_users_url: 'http://localhost:8080/api/users',
        projects_url: 'http://localhost:8080/api/projects',
      },
      lastUpdate: '',
    }
    expect(EndpointReducers(initState, action)).to.eql(expectedState)
  })

  it('should handle fetch failure', () => {
    const action = {
      type: EndpointActions.ENDPOINTS_FAILURE,
      error: 'Oops there was an error!',
    }
    const initState = {
      isFetching: true,
      items: {},
      lastUpdate: '',
    }
    const expectedState = {
      isFetching: false,
      items: {},
      lastUpdate: '',
    }
    expect(EndpointReducers(initState, action)).to.eql(expectedState)
  })
})
