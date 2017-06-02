/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import MenuItem from 'material-ui/MenuItem'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import TestPluginInfo from './TestPlugin-info.json'
import Styles from '../../../../src/styles/styles'
import CriteriaConfigurationComponent from '../../../../src/components/admin/criterion/CriteriaConfigurationComponent'

/**
 * Tests for CriteriaConfigurationComponent
 * @author Sébastien binda
 */
describe('[SEARCH FORM] Testing CriteriaConfigurationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const options = { context: buildTestContext(Styles) }

  it('Should render a CriteriaConfigurationComponent', () => {
    const props = {
      selectableAttributes: {
        0: {
          content: {
            id: 0,
            name: 'attribute1',
            label: 'x1',
            type: 'string',
          },
        },
        1: {
          content: {
            id: 1,
            name: 'attribute2',
            label: 'x2',
            type: 'string',
          },
        },
        2: {
          content: {
            id: 2,
            name: 'attribute3',
            label: 'x3',
            type: 'string',
          },
        },
      },
      plugin: {
        name: 'test plugin',
        plugin: () => { },
        messages: {},
        info: TestPluginInfo,
      },
    }
    const wrapper = shallow(
      <CriteriaConfigurationComponent {...props} />, options,
    )

    const attributes = wrapper.find(Field)
    assert.lengthOf(attributes, 2, 'There should be 2 attributes to configure for this test plugin configuration')
    assert.equal(attributes.at(0).prop('name'), 'conf.attributes.searchField1', 'The first attribute to configure should be searchField1 as defined in TestPlugin-info.json')
    assert.equal(attributes.at(1).prop('name'), 'conf.attributes.searchField2', 'The second attribute to configure should be searchField2 as defined in TestPlugin-info.json')

    assert.lengthOf(attributes.at(0).find(MenuItem), 3, 'There  should be 2 selectable attributes for configuration')
    assert.lengthOf(attributes.at(1).find(MenuItem), 3, 'There  should be 2 selectable attributes for configuration')
  })
})
