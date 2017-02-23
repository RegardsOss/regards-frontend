import { expect } from 'chai'
import reducer from '../../src/model/reducers/ThemeReducers'

describe('[COMMON THEME] Testing theme reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql({})
  })

  it('should set the theme', () => {
    const action = {
      type: 'SET_THEME',
      theme: 1,
    }
    const initState = 0
    const expectedState = 1
    expect(reducer(initState, action)).to.eql(expectedState)
  })
})
