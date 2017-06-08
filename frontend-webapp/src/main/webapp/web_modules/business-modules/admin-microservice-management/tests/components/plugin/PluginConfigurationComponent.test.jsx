/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { Card } from 'material-ui/Card'
import PluginConfigurationComponent from '../../../src/components/plugin/PluginConfigurationComponent'

const options = {
  context: buildTestContext(),
}

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN PROJECT MANAGEMENT] Testing plugin configuration component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginConfigurationComponent)
    assert.isDefined(Card)
  })

  it('should render sub-components', () => {
    const props = {
      microserviceName: 'rs-test',
      pluginConfiguration: DumpProvider.getFirstEntity('CommonClient', 'PluginConfiguration'),
      pluginMetaData: DumpProvider.getFirstEntity('CommonClient', 'PluginMetaData'),
      onActiveToggle: () => { },
      onCopyClick: () => { },
      onDeleteClick: () => { },
      onEditClick: () => { },
      onDownwardClick: () => { },
      onUpwardClick: () => { },
    }
    const enzymeWrapper = shallow(<PluginConfigurationComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Card)
    expect(subComponent).to.have.length(1)
  })
})
