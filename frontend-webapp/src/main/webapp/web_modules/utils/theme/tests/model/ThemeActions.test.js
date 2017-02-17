import { expect } from 'chai'
import setTheme from '../../src/model/actions/ThemeActions'

describe('[COMMON THEME] Testing theme actions', () => {
  it('should create an action to set the theme', () => {
    const expectedAction = {
      type: 'SET_THEME',
      theme: 2,
    }
    expect(setTheme(2)).to.eql(expectedAction)
  })
})
