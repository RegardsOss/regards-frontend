/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { PluginConfigurationListContainer } from '../../../src/containers/plugin/PluginConfigurationListContainer'
import PluginConfigurationContainer from '../../../src/containers/plugin/PluginConfigurationContainer'

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
    assert.isDefined(PluginConfigurationContainer)
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
      isPluginConfigurationFetching: false,
      // from mapDispatchToProps
      fetchPluginMetaDataList: () => {
      },
      deletePluginConfiguration: () => {
      },
    }
    const enzymeWrapper = shallow(<PluginConfigurationListContainer {...props} />, options)
    expect(enzymeWrapper.find(PluginConfigurationContainer)).to.have.length(4)
  })
})
