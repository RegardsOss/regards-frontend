/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import IconMenu from 'material-ui/IconMenu'
import { Field } from '@regardsoss/form-utils'
import { PluginParameterPlugin } from '../../../../src/components/plugin/parameter/PluginParameterPlugin'

const options = {
  context: buildTestContext(),
}

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN PROJECT MANAGEMENT] Testing plugin parameter plugin component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PluginParameterPlugin)
    assert.isDefined(ListItem)
    assert.isDefined(Field)
    assert.isDefined(IconMenu)
    assert.isDefined(RaisedButton)
  })

  it('should render a Raised Button and an IconMenu and Field', () => {
    const props = {
      pluginMetaData: DumpProvider.getFirstEntity('CommonClient', 'PluginMetaData'),
      pluginConfigurationList: DumpProvider.get('CommonClient', 'PluginConfiguration'),
      pluginMetaDataList: DumpProvider.get('CommonClient', 'PluginMetaData'),
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
    }
    const enzymeWrapper = shallow(<PluginParameterPlugin {...props} />, options)
    expect(enzymeWrapper.find(Field)).to.have.length(1)
    expect(enzymeWrapper.find(IconMenu)).to.have.length(1)
    expect(enzymeWrapper.find(RaisedButton)).to.have.length(1)
  })
})
