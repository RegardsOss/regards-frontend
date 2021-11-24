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
import { connectionDataManagementRouter } from '@regardsoss/admin-data-connection-management'
import { datasourceDataManagementRouter } from '@regardsoss/admin-data-datasource-management'
import { processingChainManagementRouter } from '@regardsoss/admin-ingest-processing-chain-management'
import { dataProviderManagementRouter } from '@regardsoss/admin-data-provider-management'
import { storageManagementRouter } from '@regardsoss/admin-storage-management'
import { oaisManagementRouter } from '@regardsoss/admin-oais-management'
import { dashboardManagementRouter } from '@regardsoss/admin-dashboard-management'
import { featureManagementRouter } from '@regardsoss/admin-feature-management'
import { dataPreparationManagementRouter } from '@regardsoss/admin-datapreparation-management'
import Routes from '../src/router'
import ModuleContainer from '../src/components/ModuleContainer'

describe('[ADMIN BOARD Acquisition] Testing acquisition board router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(10)
    expect(Routes.childRoutes[0].path).to.eq('board')
    expect(Routes.childRoutes[1].path).to.eq('chain')
    expect(Routes.childRoutes[2].path).to.eq('dataprovider')
    expect(Routes.childRoutes[3].path).to.eq('datasource')
    expect(Routes.childRoutes[4].path).to.eq('connection')
    expect(Routes.childRoutes[5].path).to.eq('storage')
    expect(Routes.childRoutes[6].path).to.eq('oais')
    expect(Routes.childRoutes[7].path).to.eq('dashboard')
    expect(Routes.childRoutes[8].path).to.eq('featuremanager')
    expect(Routes.childRoutes[9].path).to.eq('datapreparation')
  })

  it('should return BoardContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ModuleContainer)
      done()
    })
  })
  it('should return processingChainManagementRouter', (done) => {
    Routes.childRoutes[1].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(processingChainManagementRouter)
      done()
    })
  })
  it('should return dataProviderManagementRouter', (done) => {
    Routes.childRoutes[2].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(dataProviderManagementRouter)
      done()
    })
  })
  it('should return datasourceDataManagementRouter', (done) => {
    Routes.childRoutes[3].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(datasourceDataManagementRouter)
      done()
    })
  })
  it('should return connectionDataManagementRouter', (done) => {
    Routes.childRoutes[4].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(connectionDataManagementRouter)
      done()
    })
  })
  it('should return storageManagementRouter', (done) => {
    Routes.childRoutes[5].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(storageManagementRouter)
      done()
    })
  })
  it('should return oaisManagementRouter', (done) => {
    Routes.childRoutes[6].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(oaisManagementRouter)
      done()
    })
  })
  it('should return dashboardManagementRouter', (done) => {
    Routes.childRoutes[7].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(dashboardManagementRouter)
      done()
    })
  })
  it('should return featureManagementRouter', (done) => {
    Routes.childRoutes[8].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(featureManagementRouter)
      done()
    })
  })
  it('should return dataPreparationManagementRouter', (done) => {
    Routes.childRoutes[9].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(dataPreparationManagementRouter)
      done()
    })
  })
})
