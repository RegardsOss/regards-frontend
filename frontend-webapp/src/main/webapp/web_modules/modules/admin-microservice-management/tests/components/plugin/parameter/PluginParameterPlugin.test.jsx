import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import IconMenu from 'material-ui/IconMenu'
import { Field } from '@regardsoss/form-utils'
import { PluginParameterPlugin } from '../../../../src/components/plugin/parameter/PluginParameterPlugin'

describe('[ADMIN PROJECT MANAGEMENT] Testing plugin parameter plugin component', () => {
  it('should exists', () => {
    assert.isDefined(PluginParameterPlugin)
    assert.isDefined(ListItem)
    assert.isDefined(Field)
    assert.isDefined(IconMenu)
    assert.isDefined(RaisedButton)
  })

  it('should render a ListItem in view mode', () => {
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
      mode: 'view',
    }
    const enzymeWrapper = shallow(<PluginParameterPlugin {...props} />)
    const subComponent = enzymeWrapper.find(ListItem)
    expect(subComponent).to.have.length(1)
  })

  it('should render a Raised Button and an IconMenu and Field in edit mode', () => {
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
    const enzymeWrapper = shallow(<PluginParameterPlugin {...props} />)
    expect(enzymeWrapper.find(Field)).to.have.length(1)
    expect(enzymeWrapper.find(IconMenu)).to.have.length(1)
    expect(enzymeWrapper.find(RaisedButton)).to.have.length(1)
  })
})
