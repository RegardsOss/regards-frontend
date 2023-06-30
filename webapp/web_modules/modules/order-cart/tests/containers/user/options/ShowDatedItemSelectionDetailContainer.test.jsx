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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ShowDatedItemSelectionDetailComponent from '../../../../src/components/user/options/ShowDatedItemSelectionDetailComponent'
import { ShowDatedItemSelectionDetailContainer } from '../../../../src/containers/user/options/ShowDatedItemSelectionDetailContainer'
import styles from '../../../../src/styles/styles'
import { mockBasket1 } from '../../../BasketMocks'

const context = buildTestContext(styles)

/**
* Test ShowDatedItemSelectionDetailContainer
* @author Raphaël Mechali
*/
describe('[Order Cart] Testing ShowDatedItemSelectionDetailContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ShowDatedItemSelectionDetailContainer)
  })
  it('should render correctly', () => {
    const props = {
      disabled: false,
      datasetLabel: 'test-label',
      date: '2017-09-08T15:59:57.664Z',
      selectionRequest: mockBasket1.datasetSelections[0].itemsSelections[0].selectionRequest,
      dispatchShowDetail: () => { },
    }
    const enzymeWrapper = shallow(<ShowDatedItemSelectionDetailContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(ShowDatedItemSelectionDetailComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    assert.equal(componentWrapper.props().onShowDetail, props.dispatchShowDetail, 'The component callback should be correctly set up')
    assert.equal(componentWrapper.props().disabled, props.disabled, 'The component disabled state should be correctly reported')
  })
})
