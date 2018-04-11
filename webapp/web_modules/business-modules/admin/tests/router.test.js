/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { assert, expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { modelsRouter } from '@regardsoss/admin-board-models'
import { userManagementRouter } from '@regardsoss/admin-user-management'
import { projectManagementRouter } from '@regardsoss/admin-project-management'
import { accountManagementRouter } from '@regardsoss/admin-account-management'
import { microserviceManagementRouter } from '@regardsoss/admin-microservice-management'
import { uiManagementRouter } from '@regardsoss/admin-ui-management'
import { accessRightManagementRouter } from '@regardsoss/admin-accessright-management'
import Routes from '../src/router'

describe('[ADMIN MANAGEMENT] Testing admin router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(11)
    expect(Routes.childRoutes[0].path).to.eq('projects')
    expect(Routes.childRoutes[1].path).to.eq('account')
    expect(Routes.childRoutes[2].path).to.eq('ui')
    expect(Routes.childRoutes[3].path).to.eq(':project/user')
    expect(Routes.childRoutes[4].path).to.eq(':project/ui')
    expect(Routes.childRoutes[5].path).to.eq(':project')
    expect(Routes.childRoutes[6].path).to.eq(':project/microservice')
    expect(Routes.childRoutes[7].path).to.eq(':project/data/access-right')
    expect(Routes.childRoutes[8].path).to.eq(':project/data/acquisition')
    expect(Routes.childRoutes[9].path).to.eq(':project/data/collections')
    expect(Routes.childRoutes[10].path).to.eq(':project/data/models')
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
  it('create should return userManagementRouter', (done) => {
    Routes.childRoutes[3].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(userManagementRouter)
      done()
    })
  })
  it('create should return microserviceManagementRoute', (done) => {
    Routes.childRoutes[6].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(microserviceManagementRouter)
      done()
    })
  })
  it('create should return accessRightManagementRouter', (done) => {
    Routes.childRoutes[7].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(accessRightManagementRouter)
      done()
    })
  })
  it('create should return modelsRouter', (done) => {
    Routes.childRoutes[10].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(modelsRouter)
      done()
    })
  })
  it('empty components on the root page', () => {
    assert.isUndefined(Routes.childRoutes[5].getChildRoutes)
    assert.isUndefined(Routes.childRoutes[5].getComponents)
    assert.isUndefined(Routes.childRoutes[5].getComponent)
  })
})
