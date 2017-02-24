/**
 * LICENSE_PLACEHOLDER
 **/
import { assert, expect } from 'chai'
import Routes from '../src/router'
import DatasourceFormContainer from '../src/containers/DatasourceFormContainer'
import DatasourceListContainer from '../src/containers/DatasourceListContainer'
import DatasourceCreateOrPickConnectionContainer from '../src/containers/DatasourceCreateOrPickConnectionContainer'

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing router', () => {
  it('should return the correct value', () => {
    assert.isDefined(Routes)
    expect(Routes.childRoutes).to.have.length(4)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq('create')
    expect(Routes.childRoutes[2].path).to.eq(':datasourceId/links')
    expect(Routes.childRoutes[3].path).to.eq(':datasourceId/:mode')
  })
  it('list should return DatasourceListContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasourceListContainer)
      done()
    })
  })
  it('edit should return DatasourceFormContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasourceFormContainer)
      done()
    })
  })
  it('create should return DatasourceFormContainer', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasourceCreateOrPickConnectionContainer)
      done()
    })
  })
  it('create should return DatasourceFormContainer', (done) => {
    Routes.childRoutes[3].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(DatasourceFormContainer)
      done()
    })
  })
})
