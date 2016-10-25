import { expect } from "chai"
import * as actions from "../../src/actions/ThemeActions" // You can use any testing library

describe('[COMMON] Testing theme actions', () => {

  it('should create an action to set the theme', () => {
    const expectedAction = {
      type: 'SET_THEME',
      theme: 'toto'
    }
    expect(actions.setTheme('toto')).to.eql(expectedAction)
  })

})
