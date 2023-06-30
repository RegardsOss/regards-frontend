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
import Routes from '../src/router'
import MicroserviceBoardContainer from '../src/containers/MicroserviceBoardContainer'
import PluginMetaDataListContainer from '../src/containers/PluginMetaDataListContainer'
import MicroserviceConfBackupContainer from '../src/containers/MicroserviceConfBackupContainer'

describe('[ADMIN MICROSERVICE MANAGEMENT] Testing data board router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(3)
    expect(Routes.childRoutes[0].path).to.eq('board')
    expect(Routes.childRoutes[1].path).to.eq(':microserviceName/plugin/list')
    expect(Routes.childRoutes[2].path).to.eq(':microserviceName/conf-backup')
  })
  it('board should return MicroserviceBoardContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(MicroserviceBoardContainer)
      done()
    })
  })
  it(':microserviceName/plugin/list should return PluginMetaDataListContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(PluginMetaDataListContainer)
      done()
    })
  })
  it(':microserviceName/conf-backup should return MicroserviceConfBackupContainer', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(MicroserviceConfBackupContainer)
      done()
    })
  })
})
