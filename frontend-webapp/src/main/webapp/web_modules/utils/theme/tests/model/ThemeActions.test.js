import { expect } from 'chai'
import setTheme from '../../src/model/ThemeActions'

describe('[COMMON] Testing theme actions', () => {
  it('should create an action to set the theme', () => {
    const expectedAction = {
      type: 'SET_THEME',
      theme: 'toto',
    }
    expect(setTheme('toto')).to.eql(expectedAction)
  })
})
