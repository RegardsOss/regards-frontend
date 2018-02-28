/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import PluginMetaDataListContainer from '../src/containers/PluginMetaDataListContainer'
import PluginStorageConfigurationFormContainer from '../src/containers/PluginStorageConfigurationFormContainer'
import PluginStorageConfigurationListContainer from '../src/containers/PluginStorageConfigurationListContainer'
import PluginStorageMonitoringComponent from '../src/components/PluginStorageMonitoringComponent'

/**
 * @author Sébastien Binda
 */
describe('[ADMIN STORAGE MANAGEMENT] Testing storage router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(5)
    expect(Routes.childRoutes[0].path).to.eq('storages/list')
    expect(Routes.childRoutes[1].path).to.eq('storages/create')
    expect(Routes.childRoutes[2].path).to.eq('storages/:pluginId/:mode')
    expect(Routes.childRoutes[3].path).to.eq(':pluginType')
    expect(Routes.childRoutes[4].path).to.eq('storages/monitoring')
  })
  it('board should return PluginStorageConfigurationListContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(PluginStorageConfigurationListContainer)
      done()
    })
  })
  it('board should return PluginStorageConfigurationFormContainer for creation mode', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(PluginStorageConfigurationFormContainer)
      done()
    })
  })
  it('board should return PluginStorageConfigurationFormContainer dor edition/copy mode', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(PluginStorageConfigurationFormContainer)
      done()
    })
  })
  it('board should return PluginMetaDataListContainer', (done) => {
    Routes.childRoutes[3].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(PluginMetaDataListContainer)
      done()
    })
  })
  it('board should return PluginStorageMonitoringComponent', (done) => {
    Routes.childRoutes[4].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(PluginStorageMonitoringComponent)
      done()
    })
  })
})
