import { assert, expect } from 'chai'
import { projectUserManagementRouter } from '@regardsoss/admin-user-projectuser-management'
import { roleManagementRouter } from '@regardsoss/admin-user-role-management'
import Routes from '../src/router'
import BoardContainer from '../src/containers/BoardContainer'


describe('[ADMIN USER MANAGEMENT] Testing user board router', () => {
  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(3)
    expect(Routes.childRoutes[0].path).to.eq('board')
    expect(Routes.childRoutes[1].path).to.eq('project-user')
    expect(Routes.childRoutes[2].path).to.eq('role')
  })
  it('list should return BoardContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(BoardContainer)
      done()
    })
  })
  it('edit should return ProjectFormContainer', (done) => {
    Routes.childRoutes[1].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(projectUserManagementRouter)
      done()
    })
  })

  it('create should return ProjectFormContainer', (done) => {
    Routes.childRoutes[2].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(roleManagementRouter)
      done()
    })
  })
})
