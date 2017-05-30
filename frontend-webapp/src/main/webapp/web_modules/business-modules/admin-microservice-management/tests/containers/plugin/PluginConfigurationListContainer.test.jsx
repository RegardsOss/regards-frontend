/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { PluginConfigurationListContainer } from '../../../src/containers/plugin/PluginConfigurationListContainer'

const options = {
  context: buildTestContext(),
}
/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN MICROSERVICE MANAGEMENT] Testing plugin configuration list container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginConfigurationListContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('should render self and subcomponents', () => {
    const props = {
      // from router
      params: {
        project: 'projectName',
        microserviceName: 'some-microservice',
        pluginId: 'aPluginId',
        pluginConfigurationId: '0',
      },
      // from mapStateToProps
      pluginConfigurationList: DumpProvider.get('CommonClient', 'PluginConfiguration'),
      pluginMetaData: DumpProvider.getFirstEntity('CommonClient', 'PluginMetaData'),
      // from mapDispatchToProps
      fetchPluginMetaData: () => {
      },
      fetchPluginConfigurationList: () => {
      },
      deletePluginConfiguration: () => {
      },
    }

    const enzymeWrapper = shallow(<PluginConfigurationListContainer {...props} />, options)
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
  })
})
