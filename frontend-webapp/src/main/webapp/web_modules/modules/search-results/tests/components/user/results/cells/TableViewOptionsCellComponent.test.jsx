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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ShowableAtRender } from '@regardsoss/components'
import TableViewOptionsCellComponent from '../../../../../src/components/user/results/cells/TableViewOptionsCellComponent'
import AddElementToCartButton from '../../../../../src/components/user/results/options/AddElementToCartButton'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing TableViewOptionsCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TableViewOptionsCellComponent)
  })
  it('should render properly without cart', () => {
    const props = {
      displayAddToBasket: true,
      onShowDescription: () => { },
      onAddToCart: null,
    }

    const renderWrapper = shallow(<TableViewOptionsCellComponent {...props} />, { context })
    const showableWrapper = renderWrapper.find(ShowableAtRender)
    assert.lengthOf(showableWrapper, 1, 'There should be a showable wrapper for add to cart button')
    assert.isFalse(showableWrapper.props().show, 'Cart button should be hidden')
  })
  it('should render properly with cart', () => {
    const props = {
      displayAddToBasket: true,
      onShowDescription: () => { },
      onAddToCart: () => { },
    }

    const renderWrapper = shallow(<TableViewOptionsCellComponent {...props} />, { context })
    const showableWrapper = renderWrapper.find(ShowableAtRender)
    assert.lengthOf(showableWrapper, 1, 'There should be a showable wrapper for add to cart button')
    assert.isTrue(showableWrapper.props().show, 'Cart button should be visible')
    const buttonWrapper = renderWrapper.find(AddElementToCartButton)
    assert.lengthOf(buttonWrapper, 1, 'The should be the cart button')
    assert.equal(buttonWrapper.props().onAddToCart, props.onAddToCart, 'The callback should be correctly reported')
  })
})
