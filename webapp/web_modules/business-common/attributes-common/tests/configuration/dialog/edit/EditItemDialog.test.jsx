/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { PositionedDialog } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { EditItemDialog } from '../../../../src/configuration/dialog/edit/EditItemDialog'
import EditItemForm from '../../../../src/configuration/dialog/edit/EditItemForm'
import styles from '../../../../src/styles'
import { attributeModelsArray } from '../../../dumps/AttributeModels.dump'

const context = buildTestContext(styles)

/**
 * Test EditItemDialog
 * @author Raphaël Mechali
 */
describe('[Attributes Common] Testing EditItemDialog', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EditItemDialog)
  })
  it('should render correctly for new items and commit correctly values', () => {
    let spiedConfirmValue = null
    const props = {
      allowLabel: true,
      allowAttributesGroups: true,
      allowRendererSelection: true,
      attributeModels: attributeModelsArray,
      // edition data: this dialog is visible only when it is porvided
      editionData: {
        attributesList: [{
          attributes: [{
            label: {
              en: 'A test',
              fr: 'Un test',
            },
            name: 'label',
          }],
        }],
        editedElementIndex: 0,
        isNewItem: true,
      },
      onCancel: () => { },
      onConfirm: (resultingValue) => { spiedConfirmValue = resultingValue },
    }
    const enzymeWrapper = shallow(<EditItemDialog {...props} />, { context })

    const dialog = enzymeWrapper.find(PositionedDialog)
    assert.lengthOf(dialog, 1, 'There should be the dialog')
    assert.isTrue(dialog.props().open, 'dialog should be visible when there is edition data')
    assert.equal(dialog.props().title, 'attribute.configuration.new.item.title', 'There should be the new item title')

    const form = enzymeWrapper.find(EditItemForm)
    assert.lengthOf(form, 1, 'There should be the edition form')
    testSuiteHelpers.assertWrapperProperties(form, {
      allowLabel: props.allowLabel,
      allowAttributesGroups: props.allowAttributesGroups,
      allowRendererSelection: props.allowRendererSelection,
      attributeModels: props.attributeModels,
      editionData: props.editionData,
      onCancel: props.onCancel,
      onConfirm: enzymeWrapper.instance().onConfirm,
    }, 'Form properties should be correctly reported')

    // test commiting an edited item (ignores the elements shape, useless here)
    assert.isNull(spiedConfirmValue, 'Confirm should not have been called yet')
    enzymeWrapper.instance().onConfirm({ x: 'test' }, 0)
    assert.deepEqual(spiedConfirmValue, [{ x: 'test' }], 'The edited list should be correctly restitued')
  })
  it('should render correctly for existing items and commit correctly values', () => {
    let spiedConfirmValue = null
    const props = {
      allowLabel: true,
      allowAttributesGroups: true,
      allowRendererSelection: false,
      attributeModels: attributeModelsArray,
      // edition data: this dialog is visible only when it is porvided
      editionData: {
        attributesList: [{
          attributes: [{
            label: {
              en: 'First',
              fr: 'Premier',
            },
            name: 'label',
          }],
        }, {
          attributes: [{
            label: {
              en: 'Second',
              fr: 'Second',
            },
            name: 'id',
          }],
        }, {
          attributes: [{
            label: {
              en: 'Third',
              fr: 'Troisième',
            },
            name: 'attr3',
          }],
        }],
        editedElementIndex: 1,
        isNewItem: false,
      },
      onCancel: () => { },
      onConfirm: (resultingValue) => { spiedConfirmValue = resultingValue },
    }
    const enzymeWrapper = shallow(<EditItemDialog {...props} />, { context })

    const dialog = enzymeWrapper.find(PositionedDialog)
    assert.lengthOf(dialog, 1, 'There should be the dialog')
    assert.isTrue(dialog.props().open, 'dialog should be visible when there is edition data')
    assert.equal(dialog.props().title, 'attribute.configuration.edit.item.title', 'There should be the new item title')

    const form = enzymeWrapper.find(EditItemForm)
    assert.lengthOf(form, 1, 'There should be the edition form')
    testSuiteHelpers.assertWrapperProperties(form, {
      allowLabel: props.allowLabel,
      allowAttributesGroups: props.allowAttributesGroups,
      allowRendererSelection: props.allowRendererSelection,
      attributeModels: props.attributeModels,
      editionData: props.editionData,
      onCancel: props.onCancel,
      onConfirm: enzymeWrapper.instance().onConfirm,
    }, 'Form properties should be correctly reported')

    // test commiting an edited item (ignores the elements shape, useless here)
    assert.isNull(spiedConfirmValue, 'Confirm should not have been called yet')
    enzymeWrapper.instance().onConfirm({ x: 'test' }, 2)
    assert.deepEqual(spiedConfirmValue, [
      props.editionData.attributesList[0],
      props.editionData.attributesList[2],
      { x: 'test' }, // replace element at 1
    ], 'The edited list should be correctly restitued')
  })
  it('should render correctly when closed', () => {
    const props = {
      allowLabel: true,
      allowAttributesGroups: true,
      allowRendererSelection: false,
      attributeModels: attributeModelsArray,
      // edition data: this dialog is visible only when it is porvided
      editionData: null,
      onCancel: () => { },
      onConfirm: () => { },
    }

    const enzymeWrapper = shallow(<EditItemDialog {...props} />, { context })
    const dialog = enzymeWrapper.find(PositionedDialog)
    assert.lengthOf(dialog, 1, 'There should be the dialog')
    assert.isFalse(dialog.props().open, 'dialog should be hidden when there is no edition data')
  })
})
