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
import Routes from '../src/router'
import ServiceConfigurationFormContainer from '../src/containers/ServiceConfigurationFormContainer'
import ServiceConfigurationListContainer from '../src/containers/ServiceConfigurationListContainer'
import ServiceListContainer from '../src/containers/ServiceListContainer'

describe('[ADMIN UI SERVICE MANAGEMENT] Testing router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isDefined(Routes)
    expect(Routes.childRoutes).to.have.length(4)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq(':uiPluginId/list')
    expect(Routes.childRoutes[2].path).to.eq(':uiPluginId/:uiPluginConfId/:mode')
    expect(Routes.childRoutes[3].path).to.eq(':uiPluginId/create')
  })
  it('list should return ServiceListContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ServiceListContainer)
      done()
    })
  })
  it('list configuration should return ServiceConfigurationListContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ServiceConfigurationListContainer)
      done()
    })
  })
  it('create should return ServiceConfigurationFormContainer', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ServiceConfigurationFormContainer)
      done()
    })
  })
  it('edit should return ServiceConfigurationFormContainer', (done) => {
    Routes.childRoutes[3].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ServiceConfigurationFormContainer)
      done()
    })
  })
})
