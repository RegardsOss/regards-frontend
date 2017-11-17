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
import { PageableInfiniteTableContainer } from '@regardsoss/components'
import { AccessDomain, DamDomain } from '@regardsoss/domain'
import { searchDataobjectsActions, searchDatasetsActions, selectors as searchSelectors } from '../../../../src/clients/SearchEntitiesClient'
import SearchResultsComponent from '../../../../src/components/user/results/SearchResultsComponent'
import Styles from '../../../../src/styles/styles'
import DisplayModeEnum from '../../../../src/models/navigation/DisplayModeEnum'


/**
 * Tests for SearchResultsComponent
 * @author Sébastien binda
 */
describe('[Search Results] Testing SearchResultsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  const options = { context: buildTestContext(Styles) }

  const commonProperties = {
    isFetching: false,
    allowingFacettes: true,
    displayDatasets: true,

    showingFacettes: true,
    filters: [],
    resultsCount: 45,
    searchSelectors,

    hiddenColumnKeys: [],
    attributePresentationModels: [],
    facets: [],
    searchQuery: '',

    selectionServices: [],
    // control
    onChangeColumnsVisibility: () => { },
    onDeleteFacet: () => { },
    onSetEntityAsTag: () => { },
    onSelectFacet: () => { },
    onShowDatasets: () => { },
    onShowDataobjects: () => { },
    onShowListView: () => { },
    onShowTableView: () => { },
    onSortByAttribute: () => { },
    onToggleShowFacettes: () => { },
    // from PluginServicesContainer HOC
    onStartSelectionService: null,
    // from OrderCartContainer HOC
    onAddSelectionToCart: null, // callback to add selection to cart, null when disabled
    onAddElementToCart: null, // callback to add element

  }

  // define the test cases
  const testCases = [{
    caseLabel: 'Should render correctly',
    caseProperties: {
      isFetching: true,
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      searchActions: searchDataobjectsActions,
      viewMode: DisplayModeEnum.LIST,
    },
  }, {
    caseLabel: 'Should render dataobjects in list mode',
    caseProperties: {
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      searchActions: searchDataobjectsActions,
      viewMode: DisplayModeEnum.LIST,
    },
  }, {
    caseLabel: 'Should render dataobjects in table mode',
    caseProperties: {
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      searchActions: searchDataobjectsActions,
      viewMode: DisplayModeEnum.TABLE,
    },
  }, {
    caseLabel: 'Should render datasets in list mode',
    caseProperties: {
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      searchActions: searchDatasetsActions,
      viewMode: DisplayModeEnum.LIST,
    },
  }, {
    caseLabel: 'Should render datasets in list mode',
    caseProperties: {
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      searchActions: searchDatasetsActions,
      viewMode: DisplayModeEnum.TABLE,
    },
  }]

  // run them
  testCases.forEach(({ caseLabel, caseProperties }) => it(caseLabel, () => {
    const props = { ...commonProperties, ...caseProperties }
    const wrapper = shallow(<SearchResultsComponent {...props} />, options)
    assert.lengthOf(wrapper.find(PageableInfiniteTableContainer), 1, 'There should be a TableContainer rendered')
  }))

  it('should render selection services, indepently of view modes and types', () => {
    const props = {
      ...commonProperties,
      ...testCases[1].caseProperties,
      selectionServices: [{
        content: {
          configId: 0,
          label: 'ui-service-0',
          icon: null,
          applicationModes: [AccessDomain.applicationModes.ONE],
          entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATA],
          type: AccessDomain.pluginTypes.UI,
        },
      }, {
        content: {
          configId: 0,
          label: 'catalog-service-0',
          icon: 'http://my-little-poney/ponatator.gif',
          applicationModes: [AccessDomain.applicationModes.ONE],
          entityTypes: [DamDomain.ENTITY_TYPES_ENUM.DATA],
          type: AccessDomain.pluginTypes.CATALOG,
        },
      }],
    }
    shallow(<SearchResultsComponent {...props} />, options)
    // note: it would be very long here to count services as their component are in table properties,
    // and therefore not in an enzyme wrapper
  })
})
