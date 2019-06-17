/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Dialog from 'material-ui/Dialog'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DeleteAIPOnSomeStoragesDialogComponent from '../../../../src/components/aip/dialogs/DeleteAIPOnSomeStoragesDialogComponent'
import StorageSelectionCheckbox from '../../../../src/components/aip/dialogs/StorageSelectionCheckbox'
import styles from '../../../../src/styles'
import { storage1, storage2 } from '../../../dumps/DataStorages.dump'


const context = buildTestContext(styles)

/**
 * Test DeleteAIPOnSomeStoragesDialogComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN STORAGE AIP MANAGEMENT] Testing DeleteAIPOnSomeStoragesDialogComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DeleteAIPOnSomeStoragesDialogComponent)
  })
  it('should render correctly', () => {
    const props = {
      storagesSelectionModel: [{
        storage: storage1,
        selected: false,
      }, {
        storage: storage2,
        selected: true,
      }],
      canDelete: true,
      onToggleStorage: () => {},
      onConfirmDelete: () => {},
      onClose: () => {},
    }
    const enzymeWrapper = shallow(<DeleteAIPOnSomeStoragesDialogComponent {...props} />, { context })
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be a dialog')
    assert.isTrue(dialogWrapper.props().open, 'It should be opened')
    const allSelectionCheckboxes = dialogWrapper.find(StorageSelectionCheckbox)
    assert.lengthOf(allSelectionCheckboxes, props.storagesSelectionModel.length, 'There should be one check box by selectable storage space')
    props.storagesSelectionModel.forEach((selectionModel, index) => {
      const checkBox = allSelectionCheckboxes.findWhere(n => n.props().storage === selectionModel.storage)
      assert.lengthOf(checkBox, 1, `There should be the checkbox for selection model n°${index + 1}`)
      testSuiteHelpers.assertWrapperProperties(checkBox, {
        selected: selectionModel.selected,
        index,
        onToggleStorage: props.onToggleStorage,
      }, `Properties should be correctly provided to check box for model n°${index + 1}`)
    })
  })
})
