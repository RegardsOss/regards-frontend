/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
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
  })

  it('should render a Field ', () => {
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
    }
    const enzymeWrapper = shallow(<PluginParameterNumber {...props} />)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(1)
  })
})
