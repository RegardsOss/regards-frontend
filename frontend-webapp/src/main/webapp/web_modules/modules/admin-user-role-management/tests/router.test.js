import { assert, expect } from 'chai'
import Routes from '../src/router'
import RoleFormContainer from '../src/containers/RoleFormContainer'
import RoleListContainer from '../src/containers/RoleListContainer'

describe('[ADMIN PROJECT MANAGEMENT] Testing project router', () => {
  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(3)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq('create')
    expect(Routes.childRoutes[2].path).to.eq(':role_id/edit')
  })
  it('list should return RoleListContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(RoleListContainer)
      done()
    })
  })
  it('edit should return RoleFormContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(RoleFormContainer)
      done()
    })
  })
  it('create should return RoleFormContainer', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(RoleFormContainer)
      done()
    })
  })
})
