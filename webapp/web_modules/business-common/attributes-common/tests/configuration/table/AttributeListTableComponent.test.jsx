/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import FlatButton from 'material-ui/FlatButton'
import { InfiniteTableContainer, TableColumnBuilder } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AttributeListTableComponent from '../../../src/configuration/table/AttributeListTableComponent'
import styles from '../../../src/styles'
import { attributeModelsArray } from '../../dumps/AttributeModels.dump'

const context = buildTestContext(styles)

/**
 * Test AttributeListTableComponent
 * @author Raphaël Mechali
 */
describe('[Attributes Common] Testing AttributeListTableComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AttributeListTableComponent)
  })
  it('should render correctly with all options', () => {
    const props = {
      hintMessageKey: 'any',
      attributesList: [{ label: { en: 'a', fr: 'b' }, attributes: [{ name: 'attr2' }] }],
      attributeModels: attributeModelsArray,
      allowAttributesGroups: true,
      allowLabel: true,
      onAddOneItem: () => { },
      onAddManyItems: () => { },
      onEdit: () => { },
      onDelete: () => { },
    }
    const enzymeWrapper = shallow(<AttributeListTableComponent {...props} />, { context })
    // check add buttons
    const addButton = enzymeWrapper.find(FlatButton)
    assert.lengthOf(addButton, 2)
    testSuiteHelpers.assertWrapperProperties(addButton.at(0), {
      label: 'attributes.configuration.add.one.item.label',
      onClick: props.onAddOneItem,
    }, 'Add one item button properties should be correctly set')
    testSuiteHelpers.assertWrapperProperties(addButton.at(1), {
      label: 'attributes.configuration.add.many.items.label',
      onClick: props.onAddManyItems,
    }, 'Add many items button properties should be correctly set')
    // check table and columns
    const table = enzymeWrapper.find(InfiniteTableContainer)
    assert.deepEqual(table.props().entities, props.attributesList, 'Entities to display should be correctly reported')
    const { columns = [] } = table.props()
    const expectedColumnsKeys = [
      'label.en', // english label (as label functionnality is enabled)
      'label.fr', // french label (as label functionnality is enabled)
      'attributes', // attributes list (as groups functionnality is enabled)
      TableColumnBuilder.optionsColumnKey, // options column
    ]
    expectedColumnsKeys.forEach((key) => {
      const foundColumn = columns.find((c) => c.key === key)
      assert.isOk(foundColumn, `Expected column ${key} not found`)
    })
  })
  it('should render correctly with no option', () => {
    const props = {
      hintMessageKey: 'any',
      attributesList: [{ attributes: [{ name: 'attr2' }] }],
      attributeModels: attributeModelsArray,
      allowAttributesGroups: false,
      allowLabel: false,
      onAddOneItem: () => { },
      onAddManyItems: () => { },
      onEdit: () => { },
      onDelete: () => { },
    }
    const enzymeWrapper = shallow(<AttributeListTableComponent {...props} />, { context })
    // check table and columns
    const table = enzymeWrapper.find(InfiniteTableContainer)
    assert.deepEqual(table.props().entities, props.attributesList, 'Entities to display should be correctly reported')
    const { columns = [] } = table.props()
    const expectedColumnsKeys = [
      'label', // basic label as user labels functionnality is disabled
      TableColumnBuilder.optionsColumnKey, // options column
    ]
    expectedColumnsKeys.forEach((key) => {
      const foundColumn = columns.find((c) => c.key === key)
      assert.isOk(foundColumn, `Expected column ${key} not found`)
    })
  })
})
