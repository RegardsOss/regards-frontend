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
import flatMap from 'lodash/flatMap'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain } from '@regardsoss/domain'
import { modulesManager } from '@regardsoss/modules'
import { TableSelectionModes } from '@regardsoss/components'
import { searchDataobjectsActions } from '../../../../src/clients/SearchEntitiesClient'
import { OrderCartContainer } from '../../../../src/containers/user/results/OrderCartContainer'
import SearchResultsComponent from '../../../../src/components/user/results/SearchResultsComponent'
import DisplayModeEnum from '../../../../src/models/navigation/DisplayModeEnum'

const context = buildTestContext()

/**
* Test OrderCartContainer
* @author Raphaël Mechali
*/
describe('[Search Results] Testing OrderCartContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderCartContainer)
  })

  // build the list of values we want to combine to check all the use cases
  const showingDataobjectsVals = [true, false]
  const isAuthenticatedVals = [true, false]
  const availableEndpointsVals = [
    ['fake.list.should.not.be.available'], // should inhibit selection
    [...OrderCartContainer.BASKET_DEPENDENCIES], // should enable selection
  ]
  const toggledElementsVals = [
    {}, // should inhibit selection when in include mode
    {
      15: { // should enable selection (there is one element on line 15)
        id: 38,
        ipId: 'idk',
        label: 'idk',
        entityType: DamDomain.ENTITY_TYPES_ENUM.DATA,
        properties: {},
        tags: [],
      },
    },
  ]

  const selectionModsVals = [
    TableSelectionModes.includeSelected, // enables selection when there are toggled elements
    TableSelectionModes.excludeSelected, // should always enable selection
  ]

  const modulesVals = [
    {},
    {
      // an order-cart module in list, enabling cart selection
      1: { content: { id: 1, type: modulesManager.ModuleTypes.ORDER_CART, name: 'idk1', active: true, container: 'a-container', conf: {} } },
    }, {
      // no order-cart module, disabling cart selection
      1: { content: { id: 1, type: 'IDK', name: 'idk1', active: true, container: 'a-container', conf: {} } },
    }]

  const commonProps = {
    openSearchQuery: '',
    availableEndpoints: [],
    toggledElements: {}, // empty selection
    selectionMode: TableSelectionModes.includeSelected,
    pageMetadata: { number: 0, size: 10, totalElements: 20 },
    dispatchAddToCart: () => { },
    // for search results: (tests only, many are not coherent)
    appName: 'test',
    project: 'project',
    allowingFacettes: true,
    displayDatasets: true,
    filters: [],
    showingFacettes: true,
    searchQuery: '',
    facettesQuery: '',
    attributesConf: [],
    attributesRegroupementsConf: [],
    attributeModels: {},
    resultPageActions: searchDataobjectsActions,
    viewMode: DisplayModeEnum.LIST,
    sortingOn: [],
    onFiltersChanged: () => { },
    onSelectDataset: () => { },
    onSelectSearchTag: () => { },
    onShowDatasets: () => { },
    onShowDataobjects: () => { },
    onShowListView: () => { },
    onShowTableView: () => { },
    onSortChanged: () => { },
    onToggleShowFacettes: () => { },
  }

  // combine all use cases to get component appliable properties
  const allTestCases = flatMap(showingDataobjectsVals, showingDataobjects =>
    flatMap(modulesVals, modules =>
      flatMap(isAuthenticatedVals, isAuthenticated =>
        flatMap(availableEndpointsVals, availableEndpoints =>
          flatMap(toggledElementsVals, toggledElements =>
            flatMap(selectionModsVals, selectionMode => ({
              // rendering props combinated
              ...commonProps,
              showingDataobjects,
              modules,
              isAuthenticated,
              availableEndpoints,
              toggledElements,
              selectionMode,
            })))))))

  // for test to expect if there should be the callbacks with a given properties set
  const hasAddElementCallback = ({ modules, isAuthenticated, availableEndpoints, toggledElements, selectionMode }) =>
    isAuthenticated && // use must be authenticated to access the cart functionality
    modules === modulesVals[1] && // there must be cart module
    availableEndpoints === availableEndpointsVals[1] // user must have all required dependencies
  // note: selection showing dataobjects are ignored for add element
  const hasAddSelectionCallback = ({ showingDataobjects, modules, isAuthenticated, availableEndpoints, toggledElements, selectionMode }) =>
    isAuthenticated && // use must be authenticated to access the cart functionality
    modules === modulesVals[1] && // there must be cart module
    availableEndpoints === availableEndpointsVals[1] && // user must have all required dependencies
    (selectionMode === TableSelectionModes.excludeSelected || toggledElements === toggledElementsVals[1]) && // selection must not be empty
    showingDataobjects // there must be no selection callback when showing datasets (cannot add datasets groups)


  // run the tests for each properties back
  allTestCases.forEach((testProperties) => {
    const expectAddElementCallback = hasAddElementCallback(testProperties)
    const expectAddSelectionCallback = hasAddSelectionCallback(testProperties)

    // Build test label (otherwise it unusable xD)
    const propsLabel = ['showingDataobjects', 'isAuthenticated', 'modules', 'availableEndpoints', 'toggledElements', 'selectionMode']
      .reduce((acc, prop) => `${acc}\n${prop}: ${JSON.stringify(testProperties[prop])}`, '')
    const testLabel = `should show the SearchResultsComponent ${expectAddElementCallback ? 'with add element callback' : 'without add element callback'} and \
${expectAddSelectionCallback ? 'with add selection callback' : 'without add selection callback'} when:${propsLabel}`
    it(testLabel, () => {
      const enzymeWrapper = shallow(<OrderCartContainer {...testProperties} />, { context })
      const componentWrapper = enzymeWrapper.find(SearchResultsComponent)
      // verify component was drawn
      assert.lengthOf(componentWrapper, 1, 'There must be the sub component')
      // verify callback are added / removed according with expected test state
      const { onAddSelectionToCart, onAddElementToCart } = componentWrapper.props()
      if (expectAddElementCallback) {
        // assert the right callback is set up for mode
        if (testProperties.showingDataobjects) {
          assert.equal(onAddElementToCart, enzymeWrapper.instance().onAddDataOjbectToBasketHandler, 'The add element callback should be set to dataobject callback')
        } else {
          assert.equal(onAddElementToCart, enzymeWrapper.instance().onAddDatasetToBasketHandler, 'The add element callback should be set to dataset callback')
        }
      } else {
        assert.isNotOk(onAddElementToCart, 'The add element callback should not be present')
      }
      if (expectAddSelectionCallback) {
        // only one possible callback here
        assert.equal(onAddSelectionToCart, enzymeWrapper.instance().onAddDataOjbectsSelectionToBasketHandler,
          'The add selection callback should be set to dataobjects selection callback')
      } else {
        assert.isNotOk(onAddSelectionToCart, 'The add selection callback should not be present')
      }
    })
  })
})
