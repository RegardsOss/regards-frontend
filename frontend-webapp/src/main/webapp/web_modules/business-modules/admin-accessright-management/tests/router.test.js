/**
 * LICENSE_PLACEHOLDER
 **/
import { assert, expect } from 'chai'
import Routes from '../src/router'
import AccessRightContainer from '../src/containers/AccessRightContainer'

describe('[ADMIN ACCESSRIGHT MANAGEMENT] Testing accessright router', () => {
  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(1)
    expect(Routes.childRoutes[0].path).to.eq('edit')
  })
  it('list should return AccessRightListContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(AccessRightContainer)
      done()
    })
  })
})

