import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { PluginConfigurationContainer } from '../../../src/containers/plugin/PluginConfigurationContainer'
import PluginConfigurationComponent from '../../../src/components/plugin/PluginConfigurationComponent'

// Test a components rendering
describe('[ADMIN MICROSERVICE MANAGEMENT] Testing plugin configuration container', () => {
  it('should exists', () => {
    assert.isDefined(PluginConfigurationContainer)
    assert.isDefined(PluginConfigurationComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      // from router
      params: {
        project: 'projectName',
        microserviceName: 'some-microservice',
        pluginId: 'aPluginId',
        pluginConfigurationId: 0,
        formMode: 'create',
      },
      // from mapStateToProps
      pluginConfiguration: {
        pluginId: '6',
        pluginType: 'Other',
        pluginClassName: 'Kerberos',
        author: 'Jules Verne',
        version: '0.0.5',
        description: 'Allows the users to log in with their usual email and password.',
      },
      pluginMetaData: {
        pluginId: '8',
        pluginType: 'Other',
        pluginClassName: 'Titi',
        author: 'Victor Hugo',
        version: '2.0.5',
        description: 'This plugin is pretty useless actually.',
      },
      isPluginConfigurationFetching: false,
      // from mapDispatchToProps
      updatePluginConfiguration: () => {
      },
      deletePluginConfiguration: () => {
      },
    }
    const enzymeWrapper = shallow(<PluginConfigurationContainer {...props} />)
    expect(enzymeWrapper.find(PluginConfigurationComponent)).to.have.length(1)
  })
})
