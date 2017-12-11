/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import keys from 'lodash/keys'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import MenuItem from 'material-ui/MenuItem'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { DamDomain } from '@regardsoss/domain'
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
            jsonPath: 'properties.attribute1',
            type: 'string',
          },
        },
        1: {
          content: {
            id: 1,
            name: 'attribute2',
            label: 'x2',
            type: 'string',
            jsonPath: 'properties.attribute2',
          },
        },
        2: {
          content: {
            id: 2,
            name: 'attribute3',
            label: 'x3',
            type: 'string',
            jsonPath: 'properties.attribute3',
          },
        },
      },
      plugin: {
        name: 'test plugin',
        plugin: () => { },
        messages: {},
        styles: {},
        info: TestPluginInfo,
      },
    }
    const wrapper = shallow(
      <CriteriaConfigurationComponent {...props} />, options,
    )

    const numberOfAttributesToConfigure = TestPluginInfo.conf.attributes.length
    const attributes = wrapper.find(Field)
    assert.lengthOf(attributes, numberOfAttributesToConfigure, `There should be ${numberOfAttributesToConfigure} attributes to configure for this test plugin configuration`)
    assert.equal(attributes.at(0).prop('name'), 'conf.attributes.searchField1', 'The first attribute to configure should be searchField1 as defined in TestPlugin-info.json')
    assert.equal(attributes.at(1).prop('name'), 'conf.attributes.searchField2', 'The second attribute to configure should be searchField2 as defined in TestPlugin-info.json')

    const numberOfSelectableAttributes = keys(props.selectableAttributes).length + DamDomain.AttributeModelController.searchableStandardAttributes.length
    assert.lengthOf(attributes.at(0).find(MenuItem), numberOfSelectableAttributes, `There  should be ${numberOfSelectableAttributes} selectable attributes for configuration`)
    assert.lengthOf(attributes.at(1).find(MenuItem), numberOfSelectableAttributes, `There  should be ${numberOfSelectableAttributes} selectable attributes for configuration`)
  })
})
