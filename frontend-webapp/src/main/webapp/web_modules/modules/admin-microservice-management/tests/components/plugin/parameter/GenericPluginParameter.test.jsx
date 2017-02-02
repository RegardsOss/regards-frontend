import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { ListItem } from 'material-ui/List'
import { Field } from '@regardsoss/form-utils'
import GenericPluginParameter from '../../../../src/components/plugin/parameter/GenericPluginParameter'

describe('[ADMIN PROJECT MANAGEMENT] Testing generic plugin parameter component', () => {
  it('should exists', () => {
    assert.isDefined(GenericPluginParameter)
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
    const enzymeWrapper = shallow(<GenericPluginParameter {...props} />)
    const subComponent = enzymeWrapper.find(ListItem)
    expect(subComponent).to.have.length(1)
  })

  it('should render a TextField in edit mode with a String', () => {
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
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(1)
  })
})
