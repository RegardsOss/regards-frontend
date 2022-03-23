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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { PositionedDialog } from '@regardsoss/components'
import OrderProcessingListComponent from '../../../../src/components/orders/dialog/OrderProcessingListComponent'
import { SOME_ORDER_PROCESSINGS } from '../../../dumps/OrderProcessings.dump'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test OrderProcessingListComponent
 * @author Théo Lasserre
 */
describe('[Order Common] Testing OrderProcessingListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderProcessingListComponent)
  })
  it('should render correctly an order processing list', () => {
    const props = {
      orderProcessings: SOME_ORDER_PROCESSINGS,
      onClose: () => { },
    }
    const enzymeWrapper = shallow(<OrderProcessingListComponent {...props} />, { context })
    const dialog = enzymeWrapper.find(PositionedDialog)
    assert.lengthOf(dialog, 1, 'There should be a dialog')
    assert.isTrue(dialog.props().open, 'It should be closed')
  })
})
