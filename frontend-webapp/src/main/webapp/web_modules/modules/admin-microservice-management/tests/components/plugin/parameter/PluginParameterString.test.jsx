/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { ListItem } from 'material-ui/List'
import { Field } from '@regardsoss/form-utils'
import PluginParameterString from '../../../../src/components/plugin/parameter/PluginParameterString'

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN PROJECT MANAGEMENT] Testing plugin parameter string component', () => {
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(PluginParameterString)
    assert.isDefined(Field)
    assert.isDefined(ListItem)
  })

  it('should render a ListItem in view mode', () => {
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
      mode: 'view',
    }
    const enzymeWrapper = shallow(<PluginParameterString {...props} />)
    const subComponent = enzymeWrapper.find(ListItem)
    expect(subComponent).to.have.length(1)
  })

  it('should render a Field in edit mode', () => {
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
    const enzymeWrapper = shallow(<PluginParameterString {...props} />)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(1)
  })
})
