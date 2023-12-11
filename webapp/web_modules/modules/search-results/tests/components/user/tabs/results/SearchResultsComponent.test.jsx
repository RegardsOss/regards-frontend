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
import { TableLayout } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import SearchResultsComponent, { QuicklooksViewContainerWithEntitiesCache } from '../../../../../src/components/user/tabs/results/SearchResultsComponent'
import OptionsHeaderRowComponent from '../../../../../src/components/user/tabs/results/header/OptionsHeaderRowComponent'
import ResultFacetsHeaderRowContainer from '../../../../../src/containers/user/tabs/results/header/ResultFacetsHeaderRowContainer'
import ApplyingCriteriaHeaderRowContainer from '../../../../../src/containers/user/tabs/results/header/ApplyingCriteriaHeaderRowContainer'
import TableViewContainer from '../../../../../src/containers/user/tabs/results/table/TableViewContainer'
import ListViewContainer from '../../../../../src/containers/user/tabs/results/list/ListViewContainer'
import MapViewContainer from '../../../../../src/containers/user/tabs/results/map/MapViewContainer'
import styles from '../../../../../src/styles'
import { dataContext } from '../../../../dumps/data.context.dump'
import { getSearchCatalogClient } from '../../../../../src/clients/SearchEntitiesClient'

const context = buildTestContext(styles)

/**
 * Test SearchResultsComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing SearchResultsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchResultsComponent)
  })
  it('should render correctly data and dataset, for each possible view type and mode', () => {
    const props = {
      moduleId: 1,
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      resultsContext: dataContext,
      requestParameters: {},
      searchActions: getSearchCatalogClient(UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS).searchDataobjectsActions,
      onShowDescription: () => { },
      isDescAvailableFor: () => true,
      onAddElementToCart: () => { },
      onAddSelectionToCart: () => { },
      selectionServices: [],
      onStartSelectionService: () => { },
      accessToken: 'mememe',
      projectName: 'DaProject',
      onSearchEntity: () => { },
      flushSelection: () => { },
    }
    const enzymeWrapper = shallow(<SearchResultsComponent {...props} />, { context })
    // 1- check common components
    assert.lengthOf(enzymeWrapper.find(TableLayout), 1, 'There should be the table layout')
    const optionsHeaderRow = enzymeWrapper.find(OptionsHeaderRowComponent)
    assert.lengthOf(optionsHeaderRow, 1, 'There should be options header row')
    testSuiteHelpers.assertWrapperProperties(optionsHeaderRow, {
      moduleId: props.moduleId,
      resultsContext: props.resultsContext,
      selectionServices: props.selectionServices,
      onStartSelectionService: props.onStartSelectionService,
      onAddSelectionToCart: props.onAddSelectionToCart,
      requestParameters: props.requestParameters,
      searchActions: props.searchActions,
    }, 'Options header row properties should be correctly set')
    const resultsFacetHeaderRow = enzymeWrapper.find(ResultFacetsHeaderRowContainer)
    assert.lengthOf(resultsFacetHeaderRow, 1, 'There should be results facets header row')
    testSuiteHelpers.assertWrapperProperties(resultsFacetHeaderRow, {
      moduleId: props.moduleId,
      resultsContext: props.resultsContext,
    }, 'Options header row properties should be correctly set')
    const applyingCriteriaHeaderRow = enzymeWrapper.find(ApplyingCriteriaHeaderRowContainer)
    assert.lengthOf(applyingCriteriaHeaderRow, 1, 'There should be applying criteria header row')
    testSuiteHelpers.assertWrapperProperties(applyingCriteriaHeaderRow, {
      moduleId: props.moduleId,
      resultsContext: props.resultsContext,
    }, 'Options header row properties should be correctly set')

    // 2 - Change modes and check the results component is correctly displayed
    const testViews = [{
      type: DamDomain.ENTITY_TYPES_ENUM.DATA,
      modes: [
        UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
        UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
        UIDomain.RESULTS_VIEW_MODES_ENUM.MAP,
        UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK,
      ],
      tabs: [
        UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
      ],
    }, {
      type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      modes: [
        UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
        UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
      ],
      tabs: [
        UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
      ],
    }]
    testViews.forEach(({ type, modes, tabs }) => tabs.forEach((tab) => modes.forEach((mode) => {
      enzymeWrapper.setProps({
        ...props,
        tabType: tab,
        // create here a context with expected type and mode selected
        resultsContext: UIDomain.ResultsContextHelper.deepMerge(dataContext, {
          selectedTab: tab,
          tabs: {
            [tab]: {
              selectedType: type,
              types: {
                [type]: {
                  selectedMode: mode,
                },
              },
            },
          },
        }),
      })
      switch (mode) {
        case UIDomain.RESULTS_VIEW_MODES_ENUM.LIST:
          {
            const listViewContainer = enzymeWrapper.find(ListViewContainer)
            assert.lengthOf(listViewContainer, 1, `[${tab}/${type}/${mode}] There should be the list container`)
            assert.lengthOf(enzymeWrapper.find(TableViewContainer), 0, `[${tab}/${type}/${mode}] There should not be the table container`)
            assert.lengthOf(enzymeWrapper.find(QuicklooksViewContainerWithEntitiesCache), 0, `[${tab}/${type}/${mode}] There should not be the quicklook container`)
            assert.lengthOf(enzymeWrapper.find(MapViewContainer), 0, `[${tab}/${type}/${mode}] There should not be the map container`)
          }
          break
        case UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE:
          {
            const tableViewContainer = enzymeWrapper.find(TableViewContainer)
            assert.lengthOf(tableViewContainer, 1, `[${tab}/${type}/${mode}] There should be the table container`)
            assert.lengthOf(enzymeWrapper.find(ListViewContainer), 0, `[${tab}/${type}/${mode}] There should not be the list container`)
            assert.lengthOf(enzymeWrapper.find(QuicklooksViewContainerWithEntitiesCache), 0, `[${tab}/${type}/${mode}] There should not be the quicklooks container`)
            assert.lengthOf(enzymeWrapper.find(MapViewContainer), 0, `[${tab}/${type}/${mode}] There should not be the map container`)
          }
          break
        case UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK:
          {
            const quicklooksViewContainer = enzymeWrapper.find(QuicklooksViewContainerWithEntitiesCache)
            assert.lengthOf(quicklooksViewContainer, 1, `[${tab}/${type}/${mode}] There should be the quicklooks container`)
            assert.lengthOf(enzymeWrapper.find(ListViewContainer), 0, `[${tab}/${type}/${mode}] There should not be the list container`)
            assert.lengthOf(enzymeWrapper.find(TableViewContainer), 0, `[${tab}/${type}/${mode}] There should not be the table container`)
            assert.lengthOf(enzymeWrapper.find(MapViewContainer), 0, `[${tab}/${type}/${mode}] There should not be the map container`)
          }
          break
        case UIDomain.RESULTS_VIEW_MODES_ENUM.MAP:
          {
            const mapViewContainer = enzymeWrapper.find(MapViewContainer)
            assert.lengthOf(mapViewContainer, 1, 'There should be the map container')
            assert.lengthOf(enzymeWrapper.find(ListViewContainer), 0, 'There should not be the list container')
            assert.lengthOf(enzymeWrapper.find(TableViewContainer), 0, 'There should not be the table container')
            assert.lengthOf(enzymeWrapper.find(QuicklooksViewContainerWithEntitiesCache), 0, 'There should not be the quicklooks container')
          }
          break
        default:
          throw new Error('FAIL type!')
      }
    })))
  })
})
