/**
 * LICENSE_PLACEHOLDER
 **/
import { assert, expect } from 'chai'
import { dataManagementRouter } from '@regardsoss/admin-data-management'
import { userManagementRouter } from '@regardsoss/admin-user-management'
import { projectManagementRouter } from '@regardsoss/admin-project-management'
import { accountManagementRouter } from '@regardsoss/admin-account-management'
import { microserviceManagementRouter } from '@regardsoss/admin-microservice-management'
import { uiManagementRouter } from '@regardsoss/admin-ui-management'
import { accessRightManagementRouter } from '@regardsoss/admin-accessright-management'
import Routes from '../src/router'

describe('[ADMIN MANAGEMENT] Testing admin router', () => {
  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(9)
    expect(Routes.childRoutes[0].path).to.eq('project')
    expect(Routes.childRoutes[1].path).to.eq('account')
    expect(Routes.childRoutes[2].path).to.eq('ui')
    expect(Routes.childRoutes[3].path).to.eq(':project/data')
    expect(Routes.childRoutes[4].path).to.eq(':project/user')
    expect(Routes.childRoutes[5].path).to.eq(':project/ui')
    expect(Routes.childRoutes[6].path).to.eq(':project')
    expect(Routes.childRoutes[7].path).to.eq(':project/microservice')
    expect(Routes.childRoutes[8].path).to.eq(':project/access-right')
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
  it('create should return uiManagementRouter', (done) => {
    Routes.childRoutes[2].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(uiManagementRouter)
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
  it('create should return microserviceManagementRoute', (done) => {
    Routes.childRoutes[7].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(microserviceManagementRouter)
      done()
    })
  })
  it('create should return accessRightManagementRouter', (done) => {
    Routes.childRoutes[8].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(accessRightManagementRouter)
      done()
    })
  })
  it('empty components on the root page', () => {
    assert.isUndefined(Routes.childRoutes[7].getChildRoutes)
    assert.isUndefined(Routes.childRoutes[7].getComponents)
    assert.isUndefined(Routes.childRoutes[7].getComponent)
  })
})
