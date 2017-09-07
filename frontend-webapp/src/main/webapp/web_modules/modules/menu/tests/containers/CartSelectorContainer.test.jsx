/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import CartSelectorComponent from '../../src/components/CartSelectorComponent'
import { CartSelectorContainer } from '../../src/containers/CartSelectorContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test CartSelectorContainer
* @author Raphaël Mechali
*/
describe('[Menu] Testing CartSelectorContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CartSelectorContainer)
  })
  it('should render correctly', () => {
    const props = {
      project: 'any',
      cartModuleId: 0,
      objectsCount: 10,
      dispatchGetBasket: () => { },
    }
    const enzymeWrapper = shallow(<CartSelectorContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(CartSelectorComponent)
    assert.lengthOf(componentWrapper, 1, 'The component should be rendered')
    // check component properties
    assert.equal(componentWrapper.props().notifications, enzymeWrapper.props().notifications, 'The notifications should be reported')
    assert.equal(componentWrapper.props().onCartClicked, enzymeWrapper.instance().onCartClicked, 'Container should provide on cart clicked method')
  })
})
