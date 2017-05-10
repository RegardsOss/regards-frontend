/**
 * LICENSE_PLACEHOLDER
 **/
import { assert, expect } from 'chai'
import Routes from '../src/router'
import ServiceConfigurationFormContainer from '../src/containers/ServiceConfigurationFormContainer'
import ServiceConfigurationListContainer from '../src/containers/ServiceConfigurationListContainer'
import ServiceListContainer from '../src/containers/ServiceListContainer'


describe('[ADMIN UI SERVICE MANAGEMENT] Testing router', () => {
  it('should return the correct value', () => {
    assert.isDefined(Routes)
    expect(Routes.childRoutes).to.have.length(4)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq(':uiPluginId/list')
    expect(Routes.childRoutes[2].path).to.eq(':uiPluginId/:uiPluginConfId/:mode')
    expect(Routes.childRoutes[3].path).to.eq(':uiPluginId/create')
  })
  it('list should return ConnectionListContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ServiceListContainer)
      done()
    })
  })
  it('edit should return ConnectionFormContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ServiceConfigurationListContainer)
      done()
    })
  })
  it('create should return ConnectionFormContainer', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ServiceConfigurationFormContainer)
      done()
    })
  })
  it('create should return ConnectionFormContainer', (done) => {
    Routes.childRoutes[3].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ServiceConfigurationFormContainer)
      done()
    })
  })
})
