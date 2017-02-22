import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { PluginConfigurationFormContainer } from '../../../src/containers/plugin/PluginConfigurationFormContainer'
import PluginConfigurationFormComponent from '../../../src/components/plugin/PluginConfigurationFormComponent'

// Test a components rendering
describe('[ADMIN MICROSERVICE MANAGEMENT] Testing plugin configuration form container', () => {
  it('should exists', () => {
    assert.isDefined(PluginConfigurationFormContainer)
    assert.isDefined(PluginConfigurationFormComponent)
  })

  it('should render self and subcomponents in create mode', () => {
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
      createPluginConfiguration: () => {
      },
      fetchPluginConfiguration: () => {
      },
      updatePluginConfiguration: () => {
      },
      fetchPluginMetaData: () => {
      },
    }
    const enzymeWrapper = shallow(<PluginConfigurationFormContainer {...props} />)
    expect(enzymeWrapper.find(PluginConfigurationFormComponent)).to.have.length(1)
  })
})
