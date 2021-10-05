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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ConfirmDialogComponent } from '@regardsoss/components'
import DeleteOrderConfirmationComponent from '../../../../src/components/orders/dialog/DeleteOrderConfirmationComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test DeleteOrderConfirmationComponent
* @author Raphaël Mechali
*/
describe('[Order Common] Testing DeleteOrderConfirmationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DeleteOrderConfirmationComponent)
  })
  it('should render correctly closed', () => {
    const props = {
      onClose: () => { },
      deleteConfirmation: null,
    }
    const enzymeWrapper = shallow(<DeleteOrderConfirmationComponent {...props} />, { context })
    const dialog = enzymeWrapper.find(ConfirmDialogComponent)
    assert.lengthOf(dialog, 1, 'There should be a dialog')
    assert.isFalse(dialog.props().open, 'It should be closed')
  })
  it('should render correctly a superficial delete', () => {
    const props = {
      onClose: () => { },
      deleteConfirmation: {
        isCompleteDelete: false,
        onDelete: () => { },
        orderLabel: 'test',
      },
    }
    const enzymeWrapper = shallow(<DeleteOrderConfirmationComponent {...props} />, { context })
    const dialog = enzymeWrapper.find(ConfirmDialogComponent)
    assert.lengthOf(dialog, 1, 'There should be a dialog')
    assert.isTrue(dialog.props().open, 'It should be opened')
    assert.equal(dialog.props().message, 'order.list.option.cell.delete.superficially.confirmation.message')
    assert.equal(dialog.props().title, 'order.list.option.cell.delete.superficially.confirmation.title')
  })
  it('should render correctly a complete delete', () => {
    const props = {
      onClose: () => { },
      deleteConfirmation: {
        isCompleteDelete: true,
        onDelete: () => { },
        orderLabel: 'test',
      },
    }
    const enzymeWrapper = shallow(<DeleteOrderConfirmationComponent {...props} />, { context })
    const dialog = enzymeWrapper.find(ConfirmDialogComponent)
    assert.lengthOf(dialog, 1, 'There should be a dialog')
    assert.isTrue(dialog.props().open, 'It should be opened')
    assert.equal(dialog.props().message, 'order.list.option.cell.delete.completely.confirmation.message')
    assert.equal(dialog.props().title, 'order.list.option.cell.delete.completely.confirmation.title')
  })
  it('should call close only when cancelled and delete then closewhen confirmed', () => {
    let closeCount = 0
    let deleteCount = 0
    const props = {
      onClose: () => { closeCount += 1 },
      deleteConfirmation: {
        isCompleteDelete: true,
        onDelete: () => { deleteCount += 1 },
        orderLabel: 'test',
      },
    }
    const enzymeWrapper = shallow(<DeleteOrderConfirmationComponent {...props} />, { context })
    const dialog = enzymeWrapper.find(ConfirmDialogComponent)
    dialog.props().onClose()
    assert.equal(closeCount, 1, 'Close should have been called')
    assert.equal(deleteCount, 0, 'Delete has been cancelled and should not have been called')

    dialog.props().onConfirm()
    assert.equal(closeCount, 2, 'Close should have been called')
    assert.equal(deleteCount, 1, 'Delete should have been called')
  })
})
