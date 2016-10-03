import { expect } from "chai"
import reducer from "../../src/reducers/ThemeReducers"

describe('[COMMON] Testing theme reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql({})
  })

  it('should set the theme', () => {
    const action = {
      type: 'SET_THEME',
      theme: 'beautiful-theme'
    }
    const initState = 'ugly-theme'
    const expectedState = 'beautiful-theme'
    expect(reducer(initState, action)).to.eql(expectedState)
  })

})
