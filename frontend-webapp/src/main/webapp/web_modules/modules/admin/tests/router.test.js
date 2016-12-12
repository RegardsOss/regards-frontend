import { assert, expect } from 'chai'
import Routes from '../src/router'
import { databaseManagementRouter } from '@regardsoss/admin-database-management'
import { dataManagementRouter } from '@regardsoss/admin-data-management'
import { userManagementRouter } from '@regardsoss/admin-user-management'
import { projectManagementRouter } from '@regardsoss/admin-project-management'
import { accountManagementRouter } from '@regardsoss/admin-account-management'

describe('[ADMIN MANAGEMENT] Testing admin router', () => {
  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(6)
    expect(Routes.childRoutes[0].path).to.eq('project')
    expect(Routes.childRoutes[1].path).to.eq('account')
    expect(Routes.childRoutes[2].path).to.eq('database')
    expect(Routes.childRoutes[3].path).to.eq(':project/data')
    expect(Routes.childRoutes[4].path).to.eq(':project/user')
    expect(Routes.childRoutes[5].path).to.eq(':project')
  })

  it('create should return projectManagementRouter', (done) => {
    Routes.childRoutes[0].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(projectManagementRouter)
      done()
    })
  })

  it('edit should return accountManagementRouter', (done) => {
    Routes.childRoutes[1].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(accountManagementRouter)
      done()
    })
  })
  it('create should return databaseManagementRouter', (done) => {
    Routes.childRoutes[2].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(databaseManagementRouter)
      done()
    })
  })
  it('create should return dataManagementRouter', (done) => {
    Routes.childRoutes[3].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(dataManagementRouter)
      done()
    })
  })
  it('create should return userManagementRouter', (done) => {
    Routes.childRoutes[4].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(userManagementRouter)
      done()
    })
  })
  it('empty component on the root page', () => {
    assert.isUndefined(Routes.childRoutes[5].getChildRoutes)
    assert.isUndefined(Routes.childRoutes[5].getComponents)
    assert.isUndefined(Routes.childRoutes[5].getComponent)
  })
})
