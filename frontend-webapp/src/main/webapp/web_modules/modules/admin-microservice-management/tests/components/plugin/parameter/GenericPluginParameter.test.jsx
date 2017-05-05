/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import GenericPluginParameter from '../../../../src/components/plugin/parameter/GenericPluginParameter'
import PluginParameterString from '../../../../src/components/plugin/parameter/PluginParameterString'
import PluginParameterNumber from '../../../../src/components/plugin/parameter/PluginParameterNumber'
import PluginParameterBoolean from '../../../../src/components/plugin/parameter/PluginParameterBoolean'
import PluginParameterPlugin from '../../../../src/components/plugin/parameter/PluginParameterPlugin'

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN PROJECT MANAGEMENT] Testing generic plugin parameter component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(GenericPluginParameter)
    assert.isDefined(PluginParameterString)
    assert.isDefined(PluginParameterNumber)
    assert.isDefined(PluginParameterBoolean)
    assert.isDefined(PluginParameterPlugin)
  })

  it('should render a PluginParameterString when the parameter type is a String', () => {
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
      },
      mode: 'edit',
    }
    const enzymeWrapper = shallow(<GenericPluginParameter {...props} />)
    const subComponent = enzymeWrapper.find(PluginParameterString)
    expect(subComponent).to.have.length(1)
  })

  it('should render a PluginParameterNumber when the parameter type is a Number', () => {
    const props = {
      pluginParameter: {
        id: 0,
        name: 'height',
        value: '23',
        dynamic: false,
      },
      pluginParameterType: {
        name: 'height',
        type: 'java.lang.Integer',
        paramType: 'PRIMITIVE',
      },
      mode: 'edit',
    }
    const enzymeWrapper = shallow(<GenericPluginParameter {...props} />)
    const subComponent = enzymeWrapper.find(PluginParameterNumber)
    expect(subComponent).to.have.length(1)
  })

  it('should render a PluginParameterBoolean when the parameter type is a Boolean', () => {
    const props = {
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
      mode: 'edit',
    }
    const enzymeWrapper = shallow(<GenericPluginParameter {...props} />)
    const subComponent = enzymeWrapper.find(PluginParameterBoolean)
    expect(subComponent).to.have.length(1)
  })

  it('should render a PluginParameterPlugin when the parameter type is a Plugin', () => {
    const props = {
      pluginParameter: {
        id: 0,
        name: 'plgInterface',
        value: '40',
        dynamic: false,
      },
      pluginParameterType: {
        name: 'plgInterface',
        type: 'IPluginInterfacer',
        paramType: 'PLUGIN',
      },
      mode: 'edit',
    }
    const enzymeWrapper = shallow(<GenericPluginParameter {...props} />)
    const subComponent = enzymeWrapper.find(PluginParameterPlugin)
    expect(subComponent).to.have.length(1)
  })
})
