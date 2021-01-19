/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ProjectUserListContainer from '../src/containers/ProjectUserListContainer'
import ProjectUserFormContainer from '../src/containers/ProjectUserFormContainer'
import ProjectUserSettingsFormContainer from '../src/containers/ProjectUserSettingsFormContainer'
import Routes from '../src/router'

describe('[ADMIN USER PROJECTUSER MANAGEMENT] Testing project user router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(4)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq('create')
    expect(Routes.childRoutes[2].path).to.eq(':user_id/edit')
    expect(Routes.childRoutes[3].path).to.eq('settings')
  })
  it('list should return users list container', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ProjectUserListContainer)
      done()
    })
  })
  it('create should return user form', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ProjectUserFormContainer)
      done()
    })
  })
  it('edit should return user form', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ProjectUserFormContainer)
      done()
    })
  })

  it('settings should return settings form', (done) => {
    Routes.childRoutes[3].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ProjectUserSettingsFormContainer)
      done()
    })
  })
})
