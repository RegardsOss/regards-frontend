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
import Routes from '../src/router'
import RoleFormContainer from '../src/containers/RoleFormContainer'
import RoleListContainer from '../src/containers/RoleListContainer'

describe('[ADMIN USER ROLE MANAGEMENT] Testing project router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isDefined(Routes)
    expect(Routes.childRoutes).to.have.length(3)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq('create')
    expect(Routes.childRoutes[2].path).to.eq(':role_name/edit')
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
