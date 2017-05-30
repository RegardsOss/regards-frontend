/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import PluginConfigurationListComponent from '../../../src/components/plugin/PluginConfigurationListComponent'
import PluginConfigurationContainer from '../../../src/containers/plugin/PluginConfigurationContainer'

const options = {
  context: buildTestContext(),
}
/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN MICROSERVICE MANAGEMENT] Testing plugin configuration list component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginConfigurationListComponent)
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
      pluginConfigurationList: DumpProvider.get('CommonClient', 'PluginConfiguration'),
      pluginMetaData: DumpProvider.getFirstEntity('CommonClient', 'PluginMetaData'),
      handleBackClick: () => {
      },
      handleAddClick: () => {
      },
    }

    const enzymeWrapper = shallow(<PluginConfigurationListComponent {...props} />, options)
    expect(enzymeWrapper.find(PluginConfigurationContainer)).to.have.length(4)
  })
})
