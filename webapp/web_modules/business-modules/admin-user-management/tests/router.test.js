/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { projectUserManagementRouter } from '@regardsoss/admin-user-projectuser-management'
import { roleManagementRouter } from '@regardsoss/admin-user-role-management'
import { accessGroupManagementRouter } from '@regardsoss/admin-accessright-accessgroup-management'
import { roleResourceAccessManagementRouter } from '@regardsoss/admin-user-role-resource-access-management'
import { authenticationPluginManagementRouter } from '@regardsoss/admin-user-authentication-plugins-management'
import { accessRightManagementRouter } from '@regardsoss/admin-accessright-dataaccess-management'
import Routes from '../src/router'
import BoardContainer from '../src/containers/BoardContainer'

describe('[ADMIN USER MANAGEMENT] Testing user board router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(7)
    expect(Routes.childRoutes[0].path).to.eq('board')
    expect(Routes.childRoutes[1].path).to.eq('role-resource-access')
    expect(Routes.childRoutes[2].path).to.eq('project-user')
    expect(Routes.childRoutes[3].path).to.eq('role')
    expect(Routes.childRoutes[4].path).to.eq('authenticationplugins')
    expect(Routes.childRoutes[5].path).to.eq('access-group')
    expect(Routes.childRoutes[6].path).to.eq('access-rights')
  })
  it('board should return BoardContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(BoardContainer)
      done()
    })
  })
  it('role-resource-access should return roleResourceAccessManagementRouter', (done) => {
    Routes.childRoutes[1].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(roleResourceAccessManagementRouter)
      done()
    })
  })
  it('project-user should return projectUserManagementRouter', (done) => {
    Routes.childRoutes[2].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(projectUserManagementRouter)
      done()
    })
  })
  it('role should return roleManagementRouter', (done) => {
    Routes.childRoutes[3].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(roleManagementRouter)
      done()
    })
  })
  it('authenticationplugins should return authenticationPluginManagementRouter', (done) => {
    Routes.childRoutes[4].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(authenticationPluginManagementRouter)
      done()
    })
  })
  it('access-group should return accessGroupManagementRouter', (done) => {
    Routes.childRoutes[5].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(accessGroupManagementRouter)
      done()
    })
  })
  it('access-rights should return accessRightManagementRouter', (done) => {
    Routes.childRoutes[6].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(accessRightManagementRouter)
      done()
    })
  })
})
