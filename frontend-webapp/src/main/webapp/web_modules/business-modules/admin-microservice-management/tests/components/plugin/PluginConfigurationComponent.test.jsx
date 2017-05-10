/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Card } from 'material-ui/Card'
import PluginConfigurationComponent from '../../../src/components/plugin/PluginConfigurationComponent'

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
      pluginConfiguration: {
        content: {
          id: 2,
          label: 'Random configuration',
          version: '0.0.1',
          priorityOrder: 1,
          active: false,
          pluginClassName: 'Kerberos',
        },
        links: [],
      },
      onActiveToggle: () => { },
      onCopyClick: () => { },
      onDeleteClick: () => { },
      onEditClick: () => { },
      onDownwardClick: () => { },
      onUpwardClick: () => { },
    }
    const enzymeWrapper = shallow(<PluginConfigurationComponent {...props} />)
    const subComponent = enzymeWrapper.find(Card)
    expect(subComponent).to.have.length(1)
  })
})
