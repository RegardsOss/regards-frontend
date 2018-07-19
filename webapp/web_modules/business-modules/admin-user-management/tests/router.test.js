/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { orderRouter } from '@regardsoss/admin-order-management'
import { roleResourceAccessManagementRouter } from '@regardsoss/admin-user-role-resource-access-management'
import { authenticationPluginManagementRouter } from '@regardsoss/admin-user-authentication-plugins-management'
import Routes from '../src/router'
import BoardContainer from '../src/containers/BoardContainer'

describe('[ADMIN USER MANAGEMENT] Testing user board router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(6)
    expect(Routes.childRoutes[0].path).to.eq('board')
    expect(Routes.childRoutes[1].path).to.eq('role-resource-access')
    expect(Routes.childRoutes[2].path).to.eq('project-user')
    expect(Routes.childRoutes[3].path).to.eq('role')
    expect(Routes.childRoutes[4].path).to.eq('order')
    expect(Routes.childRoutes[5].path).to.eq('authenticationplugins')
  })
  it('list should return BoardContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(BoardContainer)
      done()
    })
  })
  it('edit should return roleResourceAccessManagementRouter', (done) => {
    Routes.childRoutes[1].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(roleResourceAccessManagementRouter)
      done()
    })
  })
  it('edit should return projectUserManagementRouter', (done) => {
    Routes.childRoutes[2].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(projectUserManagementRouter)
      done()
    })
  })

  it('create should return roleManagementRouter', (done) => {
    Routes.childRoutes[3].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(roleManagementRouter)
      done()
    })
  })

  it('order should return orderRouter', (done) => {
    Routes.childRoutes[4].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(orderRouter)
      done()
    })
  })

  it('authenticationplugins should return authenticationPluginManagementRouter', (done) => {
    Routes.childRoutes[5].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(authenticationPluginManagementRouter)
      done()
    })
  })
})
