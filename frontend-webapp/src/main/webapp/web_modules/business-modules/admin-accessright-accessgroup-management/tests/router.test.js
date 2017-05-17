/**
 * LICENSE_PLACEHOLDER
 **/
import { assert, expect } from 'chai'
import Routes from '../src/router'
import AccessGroupFormContainer from '../src/containers/AccessGroupFormContainer'
import AccessGroupListContainer from '../src/containers/AccessGroupListContainer'

describe('[ADMIN USER ACCESSGROUP MANAGEMENT] Testing router', () => {
  it('should return the correct value', () => {
    assert.isDefined(Routes)
    expect(Routes.childRoutes).to.have.length(3)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq('create')
    expect(Routes.childRoutes[2].path).to.eq(':accessGroupName/:mode')
  })
  it('list should return GroupListContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(AccessGroupListContainer)
      done()
    })
  })
  it('edit should return GroupFormContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(AccessGroupFormContainer)
      done()
    })
  })
  it('create should return GroupFormContainer', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(AccessGroupFormContainer)
      done()
    })
  })
})
