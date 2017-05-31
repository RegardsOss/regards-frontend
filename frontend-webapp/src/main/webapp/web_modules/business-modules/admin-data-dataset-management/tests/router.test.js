/**
 * LICENSE_PLACEHOLDER
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
    expect(Routes.childRoutes[4].path).to.eq(':datasetId/links')
    expect(Routes.childRoutes[5].path).to.eq(':datasetId/plugins')
    expect(Routes.childRoutes[6].path).to.eq(':datasetId/ui-services')
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
  it('edit links should return DatasetEditLinksContainer', (done) => {
    Routes.childRoutes[4].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasetEditLinksContainer)
      done()
    })
  })
  it('edit should return DatasetEditPluginContainer', (done) => {
    Routes.childRoutes[5].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasetEditPluginContainer)
      done()
    })
  })
  it('create should return DatasetEditUIServicesContainer', (done) => {
    Routes.childRoutes[6].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasetEditUIServicesContainer)
      done()
    })
  })
})
