/*
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
 */
import { assert, expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import Routes from '../src/router'
import ProjectFormContainer from '../src/containers/project/ProjectFormContainer'
import ProjectListContainer from '../src/containers/project/ProjectListContainer'

describe('[ADMIN PROJECT MANAGEMENT] Testing project router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(7)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq('create')
    expect(Routes.childRoutes[2].path).to.eq(':project_name/edit')
    expect(Routes.childRoutes[3].path).to.eq(':project_name/connections')
    expect(Routes.childRoutes[4].path).to.eq(':project_name/connections/guided')
    expect(Routes.childRoutes[5].path).to.eq(':project_name/connections/:project_connection_id/edit')
    expect(Routes.childRoutes[6].path).to.eq(':project_name/connections/:microservice_name/create')
  })
  it('list should return ProjectListContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ProjectListContainer)
      done()
    })
  })
  it('edit should return ProjectFormContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ProjectFormContainer)
      done()
    })
  })
  it('create should return ProjectFormContainer', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ProjectFormContainer)
      done()
    })
  })
})
