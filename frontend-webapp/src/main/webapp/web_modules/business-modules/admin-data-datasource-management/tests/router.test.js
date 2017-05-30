/**
 * LICENSE_PLACEHOLDER
 **/
import { assert, expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import Routes from '../src/router'
import DatasourceFormContainer from '../src/containers/DatasourceFormContainer'
import DatasourceListContainer from '../src/containers/DatasourceListContainer'
import DatasourceCreateOrPickConnectionContainer from '../src/containers/DatasourceCreateOrPickConnectionContainer'

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isDefined(Routes)
    expect(Routes.childRoutes).to.have.length(4)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq('create/connection')
    expect(Routes.childRoutes[2].path).to.eq('create/:connectionId')
    expect(Routes.childRoutes[3].path).to.eq(':datasourceId/edit')
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
})
