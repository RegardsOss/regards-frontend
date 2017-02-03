/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MenuItem from 'material-ui/MenuItem'
import { Field } from '@regardsoss/form-utils'
import TestPluginInfo from './TestPlugin-info.json'
import Styles from '../../../../src/styles/styles'
import CriteriaConfigurationComponent from '../../../../src/components/admin/criterion/CriteriaConfigurationComponent'

/**
 * Tests for CriteriaConfigurationComponent
 * @author Sébastien binda
 */
describe('[FORM MODULE] Testing CriteriaConfigurationComponent', () => {
  const muiTheme = getMuiTheme({})
  const options = {
    context: {
      muiTheme,
      moduleTheme: Styles(muiTheme),
      intl: {
        formatMessage: id => (id.id),
      },
    },
  }

  it('Should render a CriteriaConfigurationComponent', () => {
    const props = {
      selectableAttributes: {
        0: {
          content: {
            id: 0,
            name: 'attribute1',
          },
        },
        1: {
          content: {
            id: 1,
            name: 'attribute2',
          },
        },
        2: {
          content: {
            id: 2,
            name: 'attribute3',
          },
        },
      },
      plugin: {
        name: 'test plugin',
        plugin: () => {},
        messages: {},
        info: TestPluginInfo,
      },
    }
    const wrapper = shallow(
      <CriteriaConfigurationComponent {...props} />, options,
    )

    const attributes = wrapper.find(Field)
    assert.lengthOf(attributes, 2, 'There should be 2 attributes to configure for this test plugin configuration')
    assert.equal(attributes.at(0).prop('name'), 'pluginConf.attributes.searchField1', 'The first attribute to configure should be searchField1 as defined in TestPlugin-info.json')
    assert.equal(attributes.at(1).prop('name'), 'pluginConf.attributes.searchField2', 'The second attribute to configure should be searchField2 as defined in TestPlugin-info.json')

    assert.lengthOf(attributes.at(0).find(MenuItem), 3, 'There  should be 2 selectable attributes for configuration')
    assert.lengthOf(attributes.at(1).find(MenuItem), 3, 'There  should be 2 selectable attributes for configuration')
  })
})
