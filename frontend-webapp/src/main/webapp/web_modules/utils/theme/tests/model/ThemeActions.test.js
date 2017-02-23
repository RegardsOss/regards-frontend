import { expect } from 'chai'
import setCurrentTheme from '../../src/model/actions/setCurrentTheme'

describe('[COMMON THEME] Testing current theme actions', () => {
  it('should create an action to set the theme', () => {
    const expectedAction = {
      type: 'SET_CURRENT_THEME',
      themeId: 2,
    }
    expect(setCurrentTheme(2)).to.eql(expectedAction)
  })
})
