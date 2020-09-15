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
import DatasetListContainer from '../src/containers/DatasetListContainer'
import DatasetCreateOrPickDatasourceContainer from '../src/containers/DatasetCreateOrPickDatasourceContainer'
import DatasetFormContainer from '../src/containers/DatasetFormContainer'
import DatasetEditLinksContainer from '../src/containers/DatasetEditLinksContainer'
import DatasetEditPluginContainer from '../src/containers/DatasetEditPluginContainer'
import DatasetEditUIServicesContainer from '../src/containers/DatasetEditUIServicesContainer'
import DatasetEditFilesContainer from '../src/containers/DatasetEditFilesContainer'

describe('[ADMIN DATA DATASET MANAGEMENT] Testing router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isDefined(Routes)
    expect(Routes.childRoutes).to.have.length(7)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq('create/datasource')
    expect(Routes.childRoutes[2].path).to.eq('create/:datasourceId')
    expect(Routes.childRoutes[3].path).to.eq(':datasetId/edit')
    expect(Routes.childRoutes[4].path).to.eq(':datasetId/files')
    expect(Routes.childRoutes[5].path).to.eq(':datasetId/links')
    expect(Routes.childRoutes[7].path).to.eq(':datasetId/:datasetIpId/pluginsUIprocessing')
  })
  it('list should return DatasetListContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasetListContainer)
      done()
    })
  })
  it('edit should return DatasetCreateOrPickDatasourceContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasetCreateOrPickDatasourceContainer)
      done()
    })
  })
  it('edit should return DatasetFormContainer', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasetFormContainer)
      done()
    })
  })
  it('create should return DatasetFormContainer', (done) => {
    Routes.childRoutes[3].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasetFormContainer)
      done()
    })
  })
  it('edit links should return DatasetEditFilesContainer', (done) => {
    Routes.childRoutes[4].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasetEditFilesContainer)
      done()
    })
  })
  it('edit links should return DatasetEditLinksContainer', (done) => {
    Routes.childRoutes[5].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasetEditLinksContainer)
      done()
    })
  })
  it('edit should return DatasetEditPluginUIProcessingContainer', (done) => {
    Routes.childRoutes[6].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasetEditPluginUIProcessingContainer)
      done()
    })
  })
})
