/**
 * LICENSE_PLACEHOLDER
 **/
import { assert, expect } from 'chai'
import { databaseManagementRouter } from '@regardsoss/admin-database-management'
import { dataManagementRouter } from '@regardsoss/admin-data-management'
import { userManagementRouter } from '@regardsoss/admin-user-management'
import { projectManagementRouter } from '@regardsoss/admin-project-management'
import { accountManagementRouter } from '@regardsoss/admin-account-management'
import { microserviceManagementRouter } from '@regardsoss/admin-microservice-management'
import { uiConfigurationRouter } from '@regardsoss/admin-ui-configuration'

import Routes from '../src/router'

describe('[ADMIN MANAGEMENT] Testing admin router', () => {
  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(10)
    expect(Routes.childRoutes[0].path).to.eq('project')
    expect(Routes.childRoutes[1].path).to.eq('account')
    expect(Routes.childRoutes[2].path).to.eq('project-connection')
    expect(Routes.childRoutes[3].path).to.eq('ui-configuration')
    expect(Routes.childRoutes[4].path).to.eq(':project/data')
    expect(Routes.childRoutes[5].path).to.eq(':project/user')
    expect(Routes.childRoutes[6].path).to.eq(':project/ui-configuration')
    expect(Routes.childRoutes[7].path).to.eq(':project/ui-plugins')
    expect(Routes.childRoutes[8].path).to.eq(':project')
    expect(Routes.childRoutes[9].path).to.eq(':project/microservice')
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
  it('create should return uiConfigurationRouter', (done) => {
    Routes.childRoutes[3].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(uiConfigurationRouter)
      done()
    })
  })
  it('create should return dataManagementRouter', (done) => {
    Routes.childRoutes[4].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(dataManagementRouter)
      done()
    })
  })
  it('create should return userManagementRouter', (done) => {
    Routes.childRoutes[5].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(userManagementRouter)
      done()
    })
  })
  it('create should return microserviceManagementRoute', (done) => {
    Routes.childRoutes[9].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(microserviceManagementRouter)
      done()
    })
  })
  it('empty components on the root page', () => {
    assert.isUndefined(Routes.childRoutes[8].getChildRoutes)
    assert.isUndefined(Routes.childRoutes[8].getComponents)
    assert.isUndefined(Routes.childRoutes[8].getComponent)
  })
})
