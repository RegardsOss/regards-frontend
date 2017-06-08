/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { ListItem } from 'material-ui/List'
import { Field } from '@regardsoss/form-utils'
import PluginParameterBoolean from '../../../../src/components/plugin/parameter/PluginParameterBoolean'

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
const context = buildTestContext()

describe('[ADMIN PROJECT MANAGEMENT] Testing plugin parameter boolean component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginParameterBoolean)
    assert.isDefined(Field)
    assert.isDefined(ListItem)
  })

  it('should render a Field', () => {
    const props = {
      pluginMetaData: DumpProvider.getFirstEntity('CommonClient', 'PluginMetaData'),
      pluginParameter: {
        id: 0,
        name: 'isActive',
        value: 'false',
        dynamic: false,
      },
      pluginParameterType: {
        name: 'isActive',
        type: 'java.lang.Boolean',
        paramType: 'PRIMITIVE',
      },
    }
    const enzymeWrapper = shallow(<PluginParameterBoolean {...props} />, { context })
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(1)
  })
})
