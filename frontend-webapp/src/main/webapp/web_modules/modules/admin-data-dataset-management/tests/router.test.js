/**
 * LICENSE_PLACEHOLDER
 **/
import { assert, expect } from 'chai'
import Routes from '../src/router'
import DatasetFormContainer from '../src/containers/DatasetFormContainer'
import DatasetListContainer from '../src/containers/DatasetListContainer'
import DatasetEditLinksContainer from '../src/containers/DatasetEditLinksContainer'

describe('[ADMIN DATA DATASET MANAGEMENT] Testing router', () => {
  it('should return the correct value', () => {
    assert.isDefined(Routes)
    expect(Routes.childRoutes).to.have.length(4)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq('create')
    expect(Routes.childRoutes[2].path).to.eq(':datasetId/links')
    expect(Routes.childRoutes[3].path).to.eq(':datasetId/:mode')
  })
  it('list should return DatasetListContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasetListContainer)
      done()
    })
  })
  it('edit should return DatasetFormContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasetFormContainer)
      done()
    })
  })
  it('create should return DatasetFormContainer', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasetEditLinksContainer)
      done()
    })
  })
  it('create should return DatasetFormContainer', (done) => {
    Routes.childRoutes[3].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasetFormContainer)
      done()
    })
  })
})
