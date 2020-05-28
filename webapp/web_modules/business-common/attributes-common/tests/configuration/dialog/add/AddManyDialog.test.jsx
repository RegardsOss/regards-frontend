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
import FlatButton from 'material-ui/FlatButton'
import { PositionedDialog } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AddManyDialog from '../../../../src/configuration/dialog/add/AddManyDialog'
import styles from '../../../../src/styles'
import { attributeModelsDictionary } from '../../../dumps/AttributeModels.dump'
import AttributeSelectionComponent from '../../../../src/configuration/dialog/add/AttributeSelectionComponent'

const context = buildTestContext(styles)

/**
 * Test AddManyDialog
 * @author Raphaël Mechali
 */
describe('[Attributes Common] Testing AddManyDialog', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AddManyDialog)
  })
  it('should render correctly when hidden', () => {
    const props = {
      initialSelectionModel: null,
      onConfirm: () => {},
      onCancel: () => {},
    }
    const enzymeWrapper = shallow(<AddManyDialog {...props} />, { context })
    // check dialog is closed
    const dialog = enzymeWrapper.find(PositionedDialog)
    assert.lengthOf(dialog, 1, 'There should be the dialog')
    assert.isFalse(dialog.props().open, 'Dialog should be hidden')
  })
  it('should render correctly when opened, update selection state and commit valid selection', () => {
    const props = {
      initialSelectionModel: [{
        attributeModel: attributeModelsDictionary[1],
        selected: false,
      }, {
        attributeModel: attributeModelsDictionary[2],
        selected: true,
      }],
      onConfirm: () => {},
      onCancel: () => {},
    }
    const enzymeWrapper = shallow(<AddManyDialog {...props} />, { context })
    // 0a - check dialog is opened
    const dialog = enzymeWrapper.find(PositionedDialog)
    assert.lengthOf(dialog, 1, 'There should be the dialog')
    assert.isTrue(dialog.props().open, 'Dialog should be opened')
    // 0b - check confirm / cancel buttons are displayed
    const buttons = enzymeWrapper.find(FlatButton)
    assert.lengthOf(buttons.findWhere(n => n.props().onClick === props.onCancel), 1, 'There should be cancel button')
    let confirmButton = buttons.findWhere(n => n.props().onClick === enzymeWrapper.instance().onConfirm)
    assert.lengthOf(confirmButton, 1, 'There should be confirm button')
    assert.isFalse(confirmButton.props().disabled, 'Confirm button should be initially enabled, as there are selected elements (0)')

    // 1a - check state as been correctly computed from initial model
    assert.isTrue(enzymeWrapper.state().someSelected, '(1) Some selected should be correctly computed')
    let { selectionModel } = enzymeWrapper.state()
    assert.deepEqual(selectionModel, props.initialSelectionModel, '(1) Selection model should be correctly reported from props')
    // 1b - check state is correctly rendered
    let selectionComponents = enzymeWrapper.find(AttributeSelectionComponent)
    assert.lengthOf(selectionComponents, props.initialSelectionModel.length, '(1) There should be a selector for each attribute of the selection model')
    selectionModel.forEach((attribute, index) => {
      const attributeSelectionComp = selectionComponents.at(index)
      testSuiteHelpers.assertWrapperProperties(attributeSelectionComp, {
        index,
        attribute,
        onToggleAttributeSelection: enzymeWrapper.instance().onToggleAttributeSelection,
      }, `(1) attribute selection component #${index} properties should be correctly set`)
    })

    // 2a - unselect second attribute and check state
    enzymeWrapper.instance().onToggleAttributeSelection(1)
    assert.isFalse(enzymeWrapper.state().someSelected, '(2) Some selected should be correctly computed')
    selectionModel = enzymeWrapper.state().selectionModel
    assert.deepEqual(selectionModel, [{
      attributeModel: attributeModelsDictionary[1],
      selected: false,
    }, {
      attributeModel: attributeModelsDictionary[2],
      selected: false,
    }], '(2) Selection model should be correctly updated')
    // 2b - check state is correctly rendered
    confirmButton = enzymeWrapper.findWhere(n => n.props().onClick === enzymeWrapper.instance().onConfirm)
    assert.lengthOf(confirmButton, 1, '(2) There should be confirm button')
    assert.isTrue(confirmButton.props().disabled, '(2) Confirm button should be disabled as no element is selected')
    selectionComponents = enzymeWrapper.find(AttributeSelectionComponent)
    assert.lengthOf(selectionComponents, selectionModel.length, '(2) There should be a selector for each attribute of the selection model')
    selectionModel.forEach((attribute, index) => {
      const attributeSelectionComp = selectionComponents.at(index)
      testSuiteHelpers.assertWrapperProperties(attributeSelectionComp, {
        index,
        attribute,
        onToggleAttributeSelection: enzymeWrapper.instance().onToggleAttributeSelection,
      }, `(2) attribute selection component #${index} properties should be correctly set`)
    })
    // 3a - select first attribute and check state
    enzymeWrapper.instance().onToggleAttributeSelection(0)
    assert.isTrue(enzymeWrapper.state().someSelected, '(3) Some selected should be correctly computed')
    selectionModel = enzymeWrapper.state().selectionModel
    assert.deepEqual(selectionModel, [{
      attributeModel: attributeModelsDictionary[1],
      selected: true,
    }, {
      attributeModel: attributeModelsDictionary[2],
      selected: false,
    }], '(3) Selection model should be correctly updated')
    // 3b - check state is correctly rendered
    confirmButton = enzymeWrapper.findWhere(n => n.props().onClick === enzymeWrapper.instance().onConfirm)
    assert.lengthOf(confirmButton, 1, '(3) There should be confirm button')
    assert.isFalse(confirmButton.props().disabled, '(3) Confirm button should be enabled as there are selected elements')
    selectionComponents = enzymeWrapper.find(AttributeSelectionComponent)
    assert.lengthOf(selectionComponents, selectionModel.length, '(3) There should be a selector for each attribute of the selection model')
    selectionModel.forEach((attribute, index) => {
      const attributeSelectionComp = selectionComponents.at(index)
      testSuiteHelpers.assertWrapperProperties(attributeSelectionComp, {
        index,
        attribute,
        onToggleAttributeSelection: enzymeWrapper.instance().onToggleAttributeSelection,
      }, `(3) attribute selection component #${index} properties should be correctly set`)
    })
    // 4a - select second attribute and check state
    enzymeWrapper.instance().onToggleAttributeSelection(1)
    assert.isTrue(enzymeWrapper.state().someSelected, '(4) Some selected should be correctly computed')
    selectionModel = enzymeWrapper.state().selectionModel
    assert.deepEqual(selectionModel, [{
      attributeModel: attributeModelsDictionary[1],
      selected: true,
    }, {
      attributeModel: attributeModelsDictionary[2],
      selected: true,
    }], '(4) Selection model should be correctly updated')
    // 4b - check state is correctly rendered
    confirmButton = enzymeWrapper.findWhere(n => n.props().onClick === enzymeWrapper.instance().onConfirm)
    assert.lengthOf(confirmButton, 1, '(4) There should be confirm button')
    assert.isFalse(confirmButton.props().disabled, '(4) Confirm button should be enabled as there are selected elements')
    selectionComponents = enzymeWrapper.find(AttributeSelectionComponent)
    assert.lengthOf(selectionComponents, selectionModel.length, '(4) There should be a selector for each attribute of the selection model')
    selectionModel.forEach((attribute, index) => {
      const attributeSelectionComp = selectionComponents.at(index)
      testSuiteHelpers.assertWrapperProperties(attributeSelectionComp, {
        index,
        attribute,
        onToggleAttributeSelection: enzymeWrapper.instance().onToggleAttributeSelection,
      }, `(3) attribute selection component #${index} properties should be correctly set`)
    })
  })
})
