import { expect } from "chai"
import { Action } from "redux"
import reducer from "../src/AuthenticateReducers"

describe('[COMMON] Testing authenticate reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql({
      isFetching: false,
      user: {},
      authenticateDate: '',
      error: ''
    })
  })

  it('should handle fetch request', () => {
    const action: Action = {
      type: 'REQUEST_AUTHENTICATE'
    }
    const initState = {
      isFetching: false
    }
    const expectedState = {
      isFetching: true
    }
    expect(reducer(initState, action)).to.eql(expectedState)
  })

  it('should handle fetch success', () => {
    const date = Date.now()
    const action = {
      type: 'RECEIVE_AUTHENTICATE',
      payload: {
        access_token: "72ad6d01-25d6-4c57-8f72-4b060ab7fa57",
        token_type: "bearer",
        refresh_token: "d2b51af1-76b8-45d0-8e92-0e345ef45dca",
        expires_in: 21355,
        scope: "openid"
      },
      meta: {
        name: 'testuser',
        authenticateDate: date
      }
    }
    const initState = {
      isFetching: true,
      user: {},
      authenticateDate: '',
      error: ''
    }
    const expectedState = {
      isFetching: false,
      user: {
        access_token: "72ad6d01-25d6-4c57-8f72-4b060ab7fa57",
        token_type: "bearer",
        refresh_token: "d2b51af1-76b8-45d0-8e92-0e345ef45dca",
        expires_in: 21355,
        name: 'testuser',
        scope: "openid"
      },
      authenticateDate: date,
      error: ''
    }
    expect(reducer(initState, action)).to.eql(expectedState)
  })

  it('should handle fetch failure', () => {
    const action = {
      type: 'FAILED_AUTHENTICATE',
      meta: {
        errorMessage: 'Oops there was an error!'
      }
    }
    const initState = {
      isFetching: true,
      user: {"toto": "toto"},
      authenticateDate: '',
      error: ''
    }
    const expectedState = {
      isFetching: false,
      user: {"toto": "toto"},
      authenticateDate: '',
      error: 'Oops there was an error!'
    }
    expect(reducer(initState, action)).to.eql(expectedState)
  })

  it('should handle logout by clearing authentication content', () => {
    const action = {
      type: 'LOGOUT'
    }
    const initState = {
      isFetching: false,
      user: {
        access_token: "72ad6d01-25d6-4c57-8f72-4b060ab7fa57",
        token_type: "bearer",
        refresh_token: "d2b51af1-76b8-45d0-8e92-0e345ef45dca",
        expires_in: 21355,
        scope: "openid"
      },
      authenticateDate: Date.now(),
      error: 'This is some cool text'
    }
    const expectedState = {
      isFetching: false,
      user: {},
      authenticateDate: '',
      error: ''
    }
    expect(reducer(initState, action)).to.eql(expectedState)
  })

})
