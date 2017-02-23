import { expect } from 'chai'
import currentThemeReducer from '../../src/model/reducers/currentThemeReducer'

describe('[COMMON THEME] Testing current theme reducer', () => {
  it('should return the initial state', () => {
    expect(currentThemeReducer(undefined, {})).to.eql({})
  })

  it('should set the current theme', () => {
    const action = {
      type: 'SET_CURRENT_THEME',
      themeId: 1,
    }
    const initState = 0
    const expectedState = 1
    expect(currentThemeReducer(initState, action)).to.eql(expectedState)
  })
})
