/**
 * LICENSE_PLACEHOLDER
 **/
import { assert, expect } from 'chai'
import Routes from '../src/router'
import AccessGroupAccessRightsContainer from '../src/containers/AccessGroupAccessRightsContainer'

describe('[ADMIN ACCESSRIGHT MANAGEMENT] Testing accessright router', () => {
  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(1)
    expect(Routes.childRoutes[0].path).to.eq(':accessgroup')
  })
  it('list should return AccessGroupAccessRightsContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(AccessGroupAccessRightsContainer)
      done()
    })
  })
})

