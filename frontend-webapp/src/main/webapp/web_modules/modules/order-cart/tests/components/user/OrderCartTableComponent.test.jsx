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
import { TreeTableComponent } from '@regardsoss/components'
import OrderCartTableComponent from '../../../src/components/user/OrderCartTableComponent'
import styles from '../../../src/styles/styles'

import { emptyBasket, mockBasket1, mockBasket2 } from '../../BasketMocks'

const context = buildTestContext(styles)

/**
* Test OrderCartTableComponent
* @author Raphaël Mechali
*/
describe('[OrderCart] Testing OrderCartTableComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderCartTableComponent)
  })
  it('should render correctly when no data', () => {
    const props = { basket: undefined }
    const enzymeWrapper = shallow(<OrderCartTableComponent {...props} />, { context })
    const treeTableWrapper = enzymeWrapper.find(TreeTableComponent)
    assert.lengthOf(treeTableWrapper, 1, 'There should be a tree table')
    assert.equal(treeTableWrapper.props().model, props.basket, 'Model should be correctly reported')
  })
  it('should render correctly with a basket', () => {
    const props = { basket: mockBasket1 }
    const enzymeWrapper = shallow(<OrderCartTableComponent {...props} />, { context })
    const treeTableWrapper = enzymeWrapper.find(TreeTableComponent)
    assert.lengthOf(treeTableWrapper, 1, 'There should be a tree table')
    assert.equal(treeTableWrapper.props().model, props.basket, 'Model should be correctly reported')
  })
  it('should generete correctly a tree model baskets', () => {
    // render (we just want here to obtain the instance)
    const props = { basket: undefined }
    const enzymeWrapper = shallow(<OrderCartTableComponent {...props} />, { context })

    // test empty model
    assert.lengthOf(enzymeWrapper.instance().buildTableRows(undefined), 0, 'There should be no dataset row when basket is undefined')
    // test empty basket
    assert.lengthOf(enzymeWrapper.instance().buildTableRows(emptyBasket), 0, 'There should be no dataset row when using empty basket model')
    // test complex mock models
    const models = [{ label: 'Mock model 1', model: mockBasket1 }, { label: 'Mock model 2', model: mockBasket2 }]
    models.forEach(({ label, model }) => {
      const dsSelections = model.datasetSelections
      const treeRows = enzymeWrapper.instance().buildTableRows(model)
      assert.lengthOf(treeRows, dsSelections.length, `In model ${label}, dataset selections should be correctly reported to rows`)
      for (let i = 0; i < dsSelections.length; i += 1) {
        assert.lengthOf(treeRows[i].subRows, dsSelections[i].itemsSelections.length, `In model ${label}/dataset${i}: there should be one row for each item`)
      }
    })
  })
})
