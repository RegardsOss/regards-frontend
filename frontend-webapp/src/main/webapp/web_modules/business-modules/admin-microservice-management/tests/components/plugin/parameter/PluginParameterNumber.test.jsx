/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import PluginParameterNumber from '../../../../src/components/plugin/parameter/PluginParameterNumber'

const options = {
  context: buildTestContext(),
}

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
      pluginConfiguration: {
        content: {
          id: 2,
          label: 'Random configuration',
          version: '0.0.1',
          priorityOrder: 1,
          active: false,
          pluginClassName: 'Kerberos',
        },
      },
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
    const enzymeWrapper = shallow(<PluginParameterNumber {...props} />, options)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(1)
  })
})
