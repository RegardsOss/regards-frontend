import { assert, expect } from 'chai'
import Routes from '../src/router'
import BoardContainer from '../src/containers/BoardContainer'

describe('[ADMIN DATA MANAGEMENT] Testing data board router', () => {
  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(2)
    expect(Routes.childRoutes[0].path).to.eq('board')
  })
  it('list should return BoardContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(BoardContainer)
      done()
    })
  })
})
