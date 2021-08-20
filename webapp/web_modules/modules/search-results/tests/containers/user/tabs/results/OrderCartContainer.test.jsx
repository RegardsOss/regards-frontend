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
import flatMap from 'lodash/flatMap'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { modulesManager } from '@regardsoss/modules'
import { TableSelectionModes } from '@regardsoss/components'
import { OrderCartContainer } from '../../../../../src/containers/user/tabs/results/OrderCartContainer'

const context = buildTestContext()

// Tests render component
const TestComponent = ({ onAddSelectionToCart, onAddElementToCart }) => <div />
TestComponent.propTypes = {
  onAddSelectionToCart: PropTypes.func,
  onAddElementToCart: PropTypes.func,
}

/**
* Test OrderCartContainer
* @author Raphaël Mechali
*/
describe('[SEARCH RESULTS] Testing OrderCartContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderCartContainer)
  })

  // build the list of values we want to combine to check all the use cases
  const viewObjectTypeVals = [DamDomain.ENTITY_TYPES_ENUM.DATA, DamDomain.ENTITY_TYPES_ENUM.DATASET]
  const isAuthenticatedVals = [true, false]
  const availableDependenciesVals = [
    ['fake.list.should.not.be.available'], // should inhibit selection
    [...OrderCartContainer.BASKET_DEPENDENCIES], // should enable selection
  ]
  const modulesVals = [
    {},
    {
      // an order-cart module in list, enabling cart selection
      1: {
        content: {
          id: 1, type: modulesManager.AllDynamicModuleTypes.ORDER_CART, name: 'idk1', active: true, container: 'a-container', conf: {},
        },
      },
    }, {
      // no order-cart module, disabling cart selection
      1: {
        content: {
          id: 1, type: 'IDK', name: 'idk1', active: true, container: 'a-container', conf: {},
        },
      },
    }]

  const emptySelectionVals = [true, false]

  const commonProps = { // properties not used in dynamic computations
    tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
    requestParameters: {},
    selectionMode: TableSelectionModes.excludeSelected,
    toggledElements: {},
    dispatchAddToCart: () => { },
    tableViewMode: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
  }

  // combine all use cases to get component appliable properties
  const allTestCases = flatMap(viewObjectTypeVals, (viewObjectType) => flatMap(modulesVals, (modules) => flatMap(isAuthenticatedVals, (isAuthenticated) => flatMap(availableDependenciesVals, (availableDependencies) => flatMap(emptySelectionVals, (emptySelection) => ({
    // rendering props combinated
    ...commonProps,
    viewObjectType,
    modules,
    isAuthenticated,
    availableDependencies,
    // complete empty selection state (aprroximated for tests)
    emptySelection,
  }))))))

  // for test to expect if there should be the callbacks with a given properties set
  const hasAddElementCallback = ({ modules, isAuthenticated, availableDependencies }) => isAuthenticated // use must be authenticated to access the cart functionality
    && modules === modulesVals[1] // there must be cart module
    && availableDependencies === availableDependenciesVals[1] // user must have all required dependencies
  // note: selection showing dataobjects are ignored for add element
  const hasAddSelectionCallback = ({
    viewObjectType, modules, isAuthenticated, availableDependencies, emptySelection,
  }) => isAuthenticated // use must be authenticated to access the cart functionality
  && modules === modulesVals[1] // there must be cart module
  && availableDependencies === availableDependenciesVals[1] // user must have all required dependencies
  && !emptySelection // selection must not be empty
    && viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATA // there must be no selection callback when showing datasets (cannot add datasets groups)

  // run the tests for each properties back
  allTestCases.forEach((testProperties) => {
    const expectAddElementCallback = hasAddElementCallback(testProperties)
    const expectAddSelectionCallback = hasAddSelectionCallback(testProperties)

    // Build test label (otherwise it unusable xD)
    const propsLabel = ['viewObjectType', 'emptySelection', 'isAuthenticated', 'modules', 'availableDependencies']
      .reduce((acc, prop) => `${acc}\n${prop}: ${JSON.stringify(testProperties[prop])}`, '')
    const testLabel = `should show the sub component ${expectAddElementCallback ? 'with add element callback' : 'without add element callback'} and \
${expectAddSelectionCallback ? 'with add selection callback' : 'without add selection callback'} when:${propsLabel}`
    it(testLabel, () => {
      const enzymeWrapper = shallow(
        <OrderCartContainer {...testProperties}>
          <TestComponent />
        </OrderCartContainer>, { context })
      const componentWrapper = enzymeWrapper.find(TestComponent)
      // verify component was drawn
      assert.lengthOf(componentWrapper, 1, 'There must be the sub component')
      // verify callback are added / removed according with expected test state
      const { onAddSelectionToCart, onAddElementToCart } = componentWrapper.props()
      if (expectAddElementCallback) {
        // assert the right callback is set up for mode
        if (testProperties.viewObjectType === DamDomain.ENTITY_TYPES_ENUM.DATA) {
          assert.equal(onAddElementToCart, enzymeWrapper.instance().onAddDataObjectToBasket, 'The add element callback should be set to dataobject callback')
        } else {
          assert.equal(onAddElementToCart, enzymeWrapper.instance().onAddDatasetToBasket, 'The add element callback should be set to dataset callback')
        }
      } else {
        assert.isNotOk(onAddElementToCart, 'The add element callback should not be present')
      }
      if (expectAddSelectionCallback) {
        // only one possible callback here
        assert.equal(
          onAddSelectionToCart, enzymeWrapper.instance().onAddDataObjectsSelectionToBasket,
          'The add selection callback should be set to dataobjects selection callback',
        )
      } else {
        assert.isNotOk(onAddSelectionToCart, 'The add selection callback should not be present')
      }
    })
  })
})
