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
import Routes from '../src/router'
import PrioritizedDataStorageFormContainer from '../src/containers/PrioritizedDataStorageFormContainer'
import PrioritizedDataStoragesComponent from '../src/components/PrioritizedDataStoragesComponent'
import StoragePluginMonitoringComponent from '../src/components/StoragePluginMonitoringComponent'
import SecurityDelegationListContainer from '../src/containers/security/SecurityDelegationListContainer'
import SecurityDelegationFormContainer from '../src/containers/security/SecurityDelegationFormContainer'
/**
 * @author Sébastien Binda
 */
describe('[ADMIN STORAGE MANAGEMENT] Testing storage router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(7)
    expect(Routes.childRoutes[0].path).to.eq('storages')
    expect(Routes.childRoutes[1].path).to.eq('storages/:type/create')
    expect(Routes.childRoutes[2].path).to.eq('storages/:type/:id/:mode')
    expect(Routes.childRoutes[3].path).to.eq('storages/monitoring')
    expect(Routes.childRoutes[4].path).to.eq('security')
    expect(Routes.childRoutes[5].path).to.eq('security/create')
    expect(Routes.childRoutes[6].path).to.eq('security/:id/:mode')
  })
  it('board should return PrioritizedDataStoragesComponent', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(PrioritizedDataStoragesComponent)
      done()
    })
  })
  it('board should return PrioritizedDataStorageFormContainer for creation mode', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(PrioritizedDataStorageFormContainer)
      done()
    })
  })
  it('board should return PrioritizedDataStorageFormContainer dor edition/copy mode', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(PrioritizedDataStorageFormContainer)
      done()
    })
  })
  it('board should return StoragePluginMonitoringComponent', (done) => {
    Routes.childRoutes[3].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(StoragePluginMonitoringComponent)
      done()
    })
  })
  it('security should return SecurityDelegationListContainer', (done) => {
    Routes.childRoutes[4].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(SecurityDelegationListContainer)
      done()
    })
  })
  it('security/create should return SecurityPlugSecurityDelegationFormContainerinsConfContainer', (done) => {
    Routes.childRoutes[5].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(SecurityDelegationFormContainer)
      done()
    })
  })
  it('security/:id/:mode should return SecurityDelegationFormContainer', (done) => {
    Routes.childRoutes[6].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(SecurityDelegationFormContainer)
      done()
    })
  })
})
