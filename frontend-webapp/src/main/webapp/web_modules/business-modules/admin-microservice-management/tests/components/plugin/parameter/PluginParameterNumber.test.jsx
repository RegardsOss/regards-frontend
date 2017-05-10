/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ListItem } from 'material-ui/List'
import { Field } from '@regardsoss/form-utils'
import PluginParameterNumber from '../../../../src/components/plugin/parameter/PluginParameterNumber'

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN PROJECT MANAGEMENT] Testing plugin parameter number component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginParameterNumber)
    assert.isDefined(Field)
    assert.isDefined(ListItem)
  })

  it('should render a ListItem in view mode', () => {
    const props = {
      pluginParameter: {
        id: 0,
        name: 'height',
        value: '179',
        dynamic: false,
      },
      pluginParameterType: {
        name: 'height',
        type: 'java.lang.Integer',
        paramType: 'PRIMITIVE',
      },
      mode: 'view',
    }
    const enzymeWrapper = shallow(<PluginParameterNumber {...props} />)
    const subComponent = enzymeWrapper.find(ListItem)
    expect(subComponent).to.have.length(1)
  })

  it('should render a Field in edit mode', () => {
    const props = {
      pluginParameter: {
        id: 0,
        name: 'height',
        value: '179',
        dynamic: false,
      },
      pluginParameterType: {
        name: 'height',
        type: 'java.lang.Integer',
        paramType: 'PRIMITIVE',
      },
      mode: 'edit',
    }
    const enzymeWrapper = shallow(<PluginParameterNumber {...props} />)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(1)
  })
})
