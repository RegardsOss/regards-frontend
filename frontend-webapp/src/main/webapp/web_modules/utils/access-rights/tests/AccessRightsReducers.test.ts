import { expect } from "chai"
import { Action } from "redux"
import reducer from "../src/AccessRightsReducers"

describe('[COMMON] Testing access-rigths reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql({
      isFetching: false,
      items: []
    })
  })

  it('should handle fetch request', () => {
    const action: Action = {
      type: 'REQUEST_ACCESSRIGHTS'
    }
    const initState = {
      isFetching: false
    }
    const expectedState = {
      isFetching: true
    }
    expect(reducer(initState, action)).to.eql(expectedState)
  })

  it('should handle fetch success by adding the recceived element', () => {
    const action = {
      type: 'RECEIVE_ACCESSRIGHTS',
      payload: [
        {id: "anOtherGetDependency", verb: "GET", endpoint: "/anOtherGetDependency", access: false},
        {id: "aDeleteDependency", verb: "DELETE", endpoint: "/aDeleteDependency", access: true}
      ]
    }
    const initState = {
      isFetching: true,
      items: [
        {id: "aGetDependency", verb: "GET", endpoint: "/aGetDependency", access: true},
      ]
    }
    const expectedState = {
      isFetching: false,
      items: [
        {id: "aGetDependency", verb: "GET", endpoint: "/aGetDependency", access: true},
        {id: "anOtherGetDependency", verb: "GET", endpoint: "/anOtherGetDependency", access: false},
        {id: "aDeleteDependency", verb: "DELETE", endpoint: "/aDeleteDependency", access: true}
      ]
    }
    expect(reducer(initState, action)).to.eql(expectedState)
  })

  it('should handle fetch failure', () => {
    const action = {
      type: 'FAILED_ACCESSRIGHTS',
      error: 'Oops there was an error!'
    }
    const initState = {
      isFetching: true,
      items: [
        {name: 'toto', access: true},
        {name: 'titi', access: false}
      ]
    }
    const expectedState = {
      isFetching: false,
      items: [
        {name: 'toto', access: true},
        {name: 'titi', access: false}
      ]
    }
    expect(reducer(initState, action)).to.eql(expectedState)
  })

})
