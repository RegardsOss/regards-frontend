import { assert, expect } from 'chai'
import Routes from '../src/router'
import MicroserviceBoardContainer from '../src/containers/MicroserviceBoardContainer'
import PluginMetaDataListContainer from '../src/containers/PluginMetaDataListContainer'
import PluginConfigurationListContainer from '../src/containers/PluginConfigurationListContainer'
import PluginConfigurationFormContainer from '../src/containers/PluginConfigurationFormContainer'

describe('[ADMIN MICROSERVICE MANAGEMENT] Testing data board router', () => {
  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(5)
    expect(Routes.childRoutes[0].path).to.eq('board')
    expect(Routes.childRoutes[1].path).to.eq(':microserviceName/plugin/list')
    expect(Routes.childRoutes[2].path).to.eq(':microserviceName/plugin/:pluginId/configuration/list')
    expect(Routes.childRoutes[3].path).to.eq(':microserviceName/plugin/:pluginId/configuration/:formMode')
    expect(Routes.childRoutes[4].path).to.eq(':microserviceName/plugin/:pluginId/configuration/:pluginConfigurationId/:formMode')
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
  it(':microserviceName/plugin/:pluginId/configuration/list should return PluginConfigurationListContainer', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(PluginConfigurationListContainer)
      done()
    })
  })
  it(':microserviceName/plugin/:pluginId/configuration/:formMode should return PluginConfigurationFormContainer', (done) => {
    Routes.childRoutes[3].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(PluginConfigurationFormContainer)
      done()
    })
  })
  it(':microserviceName/plugin/:pluginId/configuration/:pluginConfigurationId/:formMode should return PluginConfigurationFormContainer', (done) => {
    Routes.childRoutes[4].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(PluginConfigurationFormContainer)
      done()
    })
  })
})
