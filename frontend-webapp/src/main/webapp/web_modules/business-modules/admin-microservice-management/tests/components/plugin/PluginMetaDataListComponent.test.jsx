/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { buildTestContext, DumpProvider, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AppBar from 'material-ui/AppBar'
import PluginMetaDataListComponent from '../../../src/components/plugin/PluginMetaDataListComponent'

const context = buildTestContext()

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN MICROSERVICE MANAGEMENT] Testing plugin metata data list component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginMetaDataListComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      microserviceName: 'some-microservice',
      // from mapStateToProps
      pluginMetaDataList: DumpProvider.get('CommonClient', 'PluginMetaData'),
      pluginTypes: [],
      handleClose: () => {
      },
      handleProjectConfigurationListClick: () => {
      },
    }

    const enzymeWrapper = shallow(<PluginMetaDataListComponent {...props} />, { context })
    expect(enzymeWrapper.find(AppBar)).to.have.length(2)
  })
})
