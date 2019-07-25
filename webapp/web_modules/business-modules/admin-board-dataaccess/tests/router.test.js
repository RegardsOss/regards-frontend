/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { servicesManagementRouter } from '@regardsoss/admin-dataaccess-services-management'
import { searchEnginesRouter } from '@regardsoss/admin-dataaccess-searchengines-management'
import { accessGroupManagementRouter } from '@regardsoss/admin-accessright-accessgroup-management'
import { accessRightManagementRouter } from '@regardsoss/admin-accessright-dataaccess-management'
import Routes from '../src/router'
import ModuleContainer from '../src/containers/ModuleContainer'

describe('[ADMIN BOARD DATA ACCESS] Testing dataaccess board router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(5)
    expect(Routes.childRoutes[0].path).to.eq('board')
    expect(Routes.childRoutes[1].path).to.eq('services')
    expect(Routes.childRoutes[2].path).to.eq('searchengines')
    expect(Routes.childRoutes[3].path).to.eq('access-group')
    expect(Routes.childRoutes[4].path).to.eq('access-rights')
  })


  it('should return BoardContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ModuleContainer)
      done()
    })
  })
  it('should return servicesManagementRouter', (done) => {
    Routes.childRoutes[1].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(servicesManagementRouter)
      done()
    })
  })
  it('should return searchEnginesRouter', (done) => {
    Routes.childRoutes[2].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(searchEnginesRouter)
      done()
    })
  })
  it('should return accessGroupManagementRouter', (done) => {
    Routes.childRoutes[3].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(accessGroupManagementRouter)
      done()
    })
  })
  it('should return accessRightManagementRouter', (done) => {
    Routes.childRoutes[4].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(accessRightManagementRouter)
      done()
    })
  })
})
