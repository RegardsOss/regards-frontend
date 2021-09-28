/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DamDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AttributesListConfigurationComponent } from '../../src/configuration/AttributesListConfigurationComponent'
import AttributeListTableComponent from '../../src/configuration/table/AttributeListTableComponent'
import AddManyDialog from '../../src/configuration/dialog/add/AddManyDialog'
import EditItemDialog from '../../src/configuration/dialog/edit/EditItemDialog'
import styles from '../../src/styles'
import { attributeModelsDictionary, attributeModelsArray } from '../dumps/AttributeModels.dump'

const context = buildTestContext(styles)

/**
 * Test AttributesListConfigurationComponent
 * @author Raphaël Mechali
 */
describe('[Attributes Common] Testing AttributesListConfigurationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AttributesListConfigurationComponent)
  })
  it('should render correctly empty', () => {
    const props = {
      selectableAttributes: {},
      attributesList: [],
      allowAttributesGroups: true,
      allowLabel: true,
      hintMessageKey: 'hello.table',
      attributesListFieldName: 'xxx',
      changeField: () => { },
    }
    const enzymeWrapper = shallow(<AttributesListConfigurationComponent {...props} />, { context })
    const wrapperInstance = enzymeWrapper.instance()
    const wrapperState = enzymeWrapper.state()
    // check dialogs
    const editDialogWrapper = enzymeWrapper.find(EditItemDialog)
    assert.lengthOf(editDialogWrapper, 1, 'There should be the edit dialog component')
    testSuiteHelpers.assertWrapperProperties(editDialogWrapper, {
      allowLabel: props.allowLabel,
      allowAttributesGroups: props.allowAttributesGroups,
      attributeModels: wrapperState.attributeModels, // attribute models should be reported from the state
      editionData: null, // dialog should be hidden (edition is not in progress)
      onCancel: wrapperInstance.onCancelEdit,
      onConfirm: wrapperInstance.onConfirmEdit,
    }, 'Edit dialog properties should be correctly computed and reported')

    const addManyDialogWrapper = enzymeWrapper.find(AddManyDialog)
    assert.lengthOf(addManyDialogWrapper, 1, 'There should be the dialog component')
    testSuiteHelpers.assertWrapperProperties(addManyDialogWrapper, {
      initialSelectionModel: wrapperState.multipleSelectionData,
      onCancel: wrapperInstance.onCancelAddMany,
      onConfirm: wrapperInstance.onConfirmAddMany,
    }, 'Dialog properties should be correctly computed and reported')

    // check table component
    const tableWrapper = enzymeWrapper.find(AttributeListTableComponent)
    assert.lengthOf(tableWrapper, 1, 'There should be the dialog component')
    testSuiteHelpers.assertWrapperProperties(tableWrapper, {
      hintMessageKey: props.hintMessageKey,
      attributesList: props.attributesList,
      attributeModels: wrapperState.attributeModels, // attribute models should be reported from the state
      allowAttributesGroups: props.allowAttributesGroups,
      allowLabel: props.allowLabel,
      onAdd: wrapperInstance.onShowAddDialog,
      onEdit: wrapperInstance.onShowEditDialog,
      onDelete: wrapperInstance.onDelete,
    }, 'Table properties should be correctly computed and reported')

    // check attributes contain all standard attributes (and not more, as the attributeModel is empty)
    assert.lengthOf(wrapperState.attributeModels, DamDomain.AttributeModelController.getSortableStandardAttributes().length, 'Attribute models should contain only sortable standard attributes')
  })
  it('should render correctly with attributes and filter non existing ones', () => {
    let spiedChangeField = { name: null, value: null }
    const props = {
      allowAttributesGroups: true,
      allowLabel: true,
      hintMessageKey: 'hello.table',
      attributesListFieldName: 'xxx',
      changeField: (name, value) => {
        spiedChangeField = { name, value }
      },
      selectableAttributes: attributeModelsDictionary,
      attributesList: [{ // first element: one existing server attribute, one none existing
        attributes: [{ name: 'properties.default.attr2' }, { name: 'unexisting attribute' }],
      }, { // second element: one existing standard attribute
        attributes: [{ name: 'label' }],
      }, { // third element: all non existing attributes
        attributes: [{ name: 'unexisting attribute 2' }],
      }],
    }
    const enzymeWrapper = shallow(<AttributesListConfigurationComponent {...props} />, { context })
    // A - check available attributes are both selectable and standard ones (no filter), sorted alphabetically
    assert.includeMembers(enzymeWrapper.state().attributeModels, attributeModelsArray, 'Attributes with standard models should be correctly computed')
    // B - check selected attributes have been updated to remove the unexisting attributes
    assert.deepEqual(spiedChangeField, {
      name: props.attributesListFieldName,
      value: [{
        attributes: [{ name: 'properties.default.attr2' }], // unexisting element should have been filtered
      }, {
        attributes: [{ name: 'label' }],
      }], // third element should have been removed
    }, 'The component should have updated field array to remove attributes not found by their json path and elemenents containing no valid attribute')
  })
  it('should filter available attributes using filter method as property', () => {
    const props = {
      allowAttributesGroups: true,
      allowLabel: true,
      hintMessageKey: 'hello.table',
      attributesListFieldName: 'xxx',
      changeField: () => { },
      selectableAttributes: attributeModelsDictionary,
      attributesFilter: (attribute) => attribute.content.name.includes('1'), // keep only attr1
      attributesList: [],
    }
    const enzymeWrapper = shallow(<AttributesListConfigurationComponent {...props} />, { context })
    assert.deepEqual(enzymeWrapper.state().attributeModels, [attributeModelsDictionary[1]],
      'Only attr1 should be available for selection')
  })
})
