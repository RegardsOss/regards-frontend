/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DBDatasourceFormContainer from '../src/containers/db/DBDatasourceFormContainer'
import DatasourceListContainer from '../src/containers/DatasourceListContainer'
import DBDatasourceCreateOrPickConnectionContainer from '../src/containers/db/DBDatasourceCreateOrPickConnectionContainer'
import DataSourceMonitoringContainer from '../src/containers/DataSourceMonitoringContainer'
import DatasoucePickInterfaceContainer from '../src/containers/DatasoucePickInterfaceContainer'
import AIPDatasourceFormContainer from '../src/containers/aip/AIPDatasourceFormContainer'
import OSConfigurationFormContainer from '../src/containers/opensearch/OSConfigurationFormContainer'
import FeatureDatasourceFormContainer from '../src/containers/feature/FeatureDatasourceFormContainer'

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isDefined(Routes)
    expect(Routes.childRoutes).to.have.length(12)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq('create/interface')
    expect(Routes.childRoutes[2].path).to.eq('db/create/connection')
    expect(Routes.childRoutes[3].path).to.eq('db/create/:connectionId')
    expect(Routes.childRoutes[4].path).to.eq('db/:datasourceId/edit')
    expect(Routes.childRoutes[5].path).to.eq('monitor')
    expect(Routes.childRoutes[6].path).to.eq('aip/:datasourceId/edit')
    expect(Routes.childRoutes[7].path).to.eq('aip/create')
    expect(Routes.childRoutes[8].path).to.eq('opensearch/create')
    expect(Routes.childRoutes[9].path).to.eq('opensearch/:datasourceId/edit')
    expect(Routes.childRoutes[10].path).to.eq('feature/:datasourceId/edit')
    expect(Routes.childRoutes[11].path).to.eq('feature/create')
  })
  it('list should return DatasourceListContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasourceListContainer)
      done()
    })
  })
  it('create should return DatasoucePickInterfaceContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasoucePickInterfaceContainer)
      done()
    })
  })
  it('create should return DBDatasourceCreateOrPickConnectionContainer', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DBDatasourceCreateOrPickConnectionContainer)
      done()
    })
  })
  it('edit should return DBDatasourceFormContainer', (done) => {
    Routes.childRoutes[3].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DBDatasourceFormContainer)
      done()
    })
  })
  it('create should return DBDatasourceFormContainer', (done) => {
    Routes.childRoutes[4].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DBDatasourceFormContainer)
      done()
    })
  })
  it('monitor should return DataSourceMonitoringContainer', (done) => {
    Routes.childRoutes[5].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DataSourceMonitoringContainer)
      done()
    })
  })
  it('edit should return AIPDatasourceFormContainer', (done) => {
    Routes.childRoutes[6].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(AIPDatasourceFormContainer)
      done()
    })
  })
  it('create should return AIPDatasourceFormContainer', (done) => {
    Routes.childRoutes[7].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(AIPDatasourceFormContainer)
      done()
    })
  })
  it('create should return OSCrawlerConfigurationContainer', (done) => {
    Routes.childRoutes[8].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(OSConfigurationFormContainer)
      done()
    })
  })
  it('edit should return OSCrawlerConfigurationContainer', (done) => {
    Routes.childRoutes[9].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(OSConfigurationFormContainer)
      done()
    })
  })
  it('edit should return FeatureDatasourceFormContainer', (done) => {
    Routes.childRoutes[10].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(FeatureDatasourceFormContainer)
      done()
    })
  })
  it('create should return FeatureDatasourceFormContainer', (done) => {
    Routes.childRoutes[11].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(FeatureDatasourceFormContainer)
      done()
    })
  })
})
