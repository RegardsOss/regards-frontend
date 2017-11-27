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
import DatasourceFormContainer from '../src/containers/DatasourceFormContainer'
import DatasourceListContainer from '../src/containers/DatasourceListContainer'
import DatasourceCreateOrPickConnectionContainer from '../src/containers/DatasourceCreateOrPickConnectionContainer'
import DataSourceMonitoringContainer from '../src/containers/DataSourceMonitoringContainer'

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isDefined(Routes)
    expect(Routes.childRoutes).to.have.length(5)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq('create/connection')
    expect(Routes.childRoutes[2].path).to.eq('create/:connectionId')
    expect(Routes.childRoutes[3].path).to.eq(':datasourceId/edit')
    expect(Routes.childRoutes[4].path).to.eq('monitor')
  })
  it('list should return DatasourceListContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasourceListContainer)
      done()
    })
  })
  it('create should return DatasourceCreateOrPickConnectionContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasourceCreateOrPickConnectionContainer)
      done()
    })
  })
  it('edit should return DatasourceFormContainer', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasourceFormContainer)
      done()
    })
  })
  it('create should return DatasourceFormContainer', (done) => {
    Routes.childRoutes[3].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasourceFormContainer)
      done()
    })
  })
  it('monitor should return DataSourceMonitoringContainer', (done) => {
    Routes.childRoutes[4].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DataSourceMonitoringContainer)
      done()
    })
  })
})
