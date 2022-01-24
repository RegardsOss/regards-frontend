/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers, ReduxFormTestHelper } from '@regardsoss/tests-helpers'
import { DamDomain } from '@regardsoss/domain'
import MultipleAttributesFieldRender from '../../../src/configuration/multiple/MultipleAttributesFieldRender'
import AvailableAttributesTable from '../../../src/configuration/multiple/available/AvailableAttributesTable'
import SelectedAttributesTable from '../../../src/configuration/multiple/selected/SelectedAttributesTable'
import styles from '../../../src/styles'
import { attributeModelsArray } from '../../dumps/AttributeModels.dump'

const context = buildTestContext(styles)

/**
 * Test MultipleAttributesFieldRender
 * @author Raphaël Mechali
 */
describe('[Attributes Common] Testing MultipleAttributesFieldRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MultipleAttributesFieldRender)
  })
  it('should render correctly', () => {
    const props = {
      allowRendererSelection: true,
      attributeModels: attributeModelsArray,
      fields: ReduxFormTestHelper.getFieldsProps([{
        name: 'attr2',
        jsonPath: 'properties.attr2',
        label: 'Attr2',
        type: DamDomain.MODEL_ATTR_TYPES.DATE_INTERVAL,
      }, {
        name: 'id',
        jsonPath: 'id',
        label: 'Id',
        type: DamDomain.MODEL_ATTR_TYPES.STRING,
      }]),
      meta: ReduxFormTestHelper.getMetaFieldProps('idk', true),
      label: 'any',
      intl: context.intl,
    }
    const enzymeWrapper = shallow(<MultipleAttributesFieldRender {...props} />, { context })
    // check that selected and available attributes are stored in state
    const state = enzymeWrapper.state()
    assert.deepEqual(state.selectedAttributes, props.fields.getAll(), 'Selected attributes should be retrieved from fields.getAll')
    assert.deepEqual(state.availableAttributesModels,
      attributeModelsArray.filter(({ content: { jsonPath } }) => jsonPath !== 'properties.attr2' && jsonPath !== 'id'),
      'Available attributes should be filtered, not including the attributes already selected')
    // check the right properties are provided to available attributes table
    const availableAttributesTable = enzymeWrapper.find(AvailableAttributesTable)
    assert.lengthOf(availableAttributesTable, 1, 'There should be the available attributes table')
    assert.equal(availableAttributesTable.props().onAdd, enzymeWrapper.instance().onAdd, 'onAdd callback should be correctly reported')
    assert.deepEqual(availableAttributesTable.props().attributeModels, state.availableAttributesModels, 'Available attributes should be correctly reported')
    // check the right properties are provided to selected attributes table
    const selectedAttributesTable = enzymeWrapper.find(SelectedAttributesTable)
    assert.lengthOf(selectedAttributesTable, 1, 'There should be the selected attributes table')
    testSuiteHelpers.assertWrapperProperties(selectedAttributesTable, {
      allowRendererSelection: props.allowRendererSelection,
      selectedAttributes: state.selectedAttributes,
      attributeModels: props.attributeModels,
      onRendererSelected: enzymeWrapper.instance().onRendererSelected,
      onRemove: enzymeWrapper.instance().onRemove,
      invalid: props.meta.invalid,
      error: props.meta.error,
    }, 'Selected attributes table properties should be correctly reported, holding error state')
  })
})
