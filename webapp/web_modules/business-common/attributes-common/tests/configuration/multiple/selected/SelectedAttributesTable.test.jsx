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
import { TableHeaderText, InfiniteTableContainer } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SelectedAttributesTable from '../../../../src/configuration/multiple/selected/SelectedAttributesTable'
import styles from '../../../../src/styles'
import { attributeModelsArray } from '../../../dumps/AttributeModels.dump'

const context = buildTestContext(styles)

/**
 * Test SelectedAttributesTable
 * @author Raphaël Mechali
 */
describe('[Attributes Common] Testing SelectedAttributesTable', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SelectedAttributesTable)
  })
  it('should render correctly without element and in error', () => {
    const props = {
      invalid: true,
      allowRendererSelection: false,
      error: 'hello',
      selectedAttributes: [],
      attributeModels: attributeModelsArray,
      onRendererSelected: () => {},
      onRemove: () => { },
    }
    const enzymeWrapper = shallow(<SelectedAttributesTable {...props} />, { context })
    // check error is correctly reported
    const headerText = enzymeWrapper.find(TableHeaderText)
    assert.lengthOf(headerText, 1, 'There should be the header text')
    assert.isTrue(headerText.props().error, 'It should be marked in error')
    assert.equal(headerText.props().text, props.error, 'Error text should be correctly reported')
    // check table
    const table = enzymeWrapper.find(InfiniteTableContainer)
    assert.lengthOf(table, 1, 'There should be the table')
    assert.isEmpty(table.props().entities, 'There should be no entity in table')
    assert.lengthOf(table.props().columns, 2, 'There should be attribute and options columns')
  })
  it('should render correctly with elements and no error', () => {
    const props = {
      invalid: false,
      allowRendererSelection: true,
      error: null,
      selectedAttributes: [{ name: 'properties.attr1' }, { name: 'label' }],
      attributeModels: attributeModelsArray,
      onRendererSelected: () => {},
      onRemove: () => { },
    }
    const enzymeWrapper = shallow(<SelectedAttributesTable {...props} />, { context })
    // check error is correctly reported
    const headerText = enzymeWrapper.find(TableHeaderText)
    assert.lengthOf(headerText, 1, 'There should be the header text')
    assert.isFalse(headerText.props().error, 'It should not be marked in error')
    assert.equal(headerText.props().text, 'attribute.configuration.selected.attributes.header', 'Elements count should be internationalized')
    // check table
    const table = enzymeWrapper.find(InfiniteTableContainer)
    assert.lengthOf(table, 1, 'There should be the table')
    assert.deepEqual(table.props().entities, props.selectedAttributes, 'Selected elements should be displayed')
    assert.lengthOf(table.props().columns, 3, 'There should be attribute, render and options columns')
  })
})
