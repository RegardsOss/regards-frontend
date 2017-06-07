/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import PluginParameterString from '../../../../src/components/plugin/parameter/PluginParameterString'

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN PROJECT MANAGEMENT] Testing plugin parameter string component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginParameterString)
    assert.isDefined(Field)
  })

  it('should render a Field', () => {
    const props = {
      pluginParameter: {
        id: 0,
        name: 'suffix',
        value: '_thesuffix',
        dynamic: false,
      },
      pluginParameterType: {
        name: 'suffix',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: true,
        defaultValue: 'default',
      },
    }
    const enzymeWrapper = shallow(<PluginParameterString {...props} />)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(1)
  })

  it('should handle required/not required fields', () => {
    const props0 = {
      pluginParameter: {
        id: 0,
        name: 'suffix',
        value: '_thesuffix',
        dynamic: false,
      },
      pluginParameterType: {
        name: 'suffix',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: false,
        defaultValue: 'default',
      },
    }
    const enzymeWrapper0 = shallow(<PluginParameterString {...props0} />)
    const subComponent0 = enzymeWrapper0.find(Field)
    expect(subComponent0.prop('validate')).to.have.length(2)

    const props1 = {
      pluginParameter: {
        id: 0,
        name: 'suffix',
        value: '_thesuffix',
        dynamic: false,
      },
      pluginParameterType: {
        name: 'suffix',
        type: 'java.lang.String',
        paramType: 'PRIMITIVE',
        optional: true,
        defaultValue: 'default',
      },
    }
    const enzymeWrapper1 = shallow(<PluginParameterString {...props1} />)
    const subComponent1 = enzymeWrapper1.find(Field)
    expect(subComponent1.prop('validate')).to.have.length(1)
  })
})
