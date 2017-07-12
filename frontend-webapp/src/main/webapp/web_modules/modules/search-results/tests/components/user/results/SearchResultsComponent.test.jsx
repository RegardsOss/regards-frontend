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
import { TableContainer, TableSortOrders } from '@regardsoss/components'
import { searchDataobjectsActions, searchDatasetsActions } from '../../../../src/clients/SearchEntitiesClient'
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
    appName: 'test',
    project: 'project',
    allowingFacettes: true,
    showingFacettes: true,
    displayDatasets: true,
    filters: [],

    searchQuery: '',
    facettesQuery: '',
    attributesConf: [],
    attributesRegroupementsConf: [],
    attributeModels: {},

    onFiltersChanged: () => { },
    onSelectDataset: () => { },
    onSelectSearchTag: () => { },
    onShowDatasets: () => { },
    onShowDataobjects: () => { },
    onShowListView: () => { },
    onShowTableView: () => { },
    onSortChanged: () => { },
    onToggleShowFacettes: () => { },

    // services
    datasetServices: [],
    selectedDataobjectsServices: [],
    onDatasetServiceSelected: () => { },
    onSelectionServiceSelected: () => { },
    onDataobjectServiceSelected: () => { },
  }

  // define the test cases
  const testCases = [{
    caseLabel: 'Should render dataobjects in list mode',
    caseProperties: {
      showingDataobjects: true,
      resultPageActions: searchDataobjectsActions,
      viewMode: DisplayModeEnum.LIST,
      sortingOn: [],
    },
  }, {
    caseLabel: 'Should render dataobjects in table mode',
    caseProperties: {
      showingDataobjects: true,
      resultPageActions: searchDataobjectsActions,
      viewMode: DisplayModeEnum.TABLE,
      sortingOn: [],
    },
  }, {
    caseLabel: 'Should render datasets in list mode',
    caseProperties: {
      showingDataobjects: false,
      resultPageActions: searchDatasetsActions,
      viewMode: DisplayModeEnum.LIST,
      sortingOn: [],
    },
    // no dataset table
  }, {
    caseLabel: 'Should render with sorting',
    caseProperties: {
      showingDataobjects: true,
      resultPageActions: searchDataobjectsActions,
      viewMode: DisplayModeEnum.TABLE,
      sortingOn: [{ attributePath: 'label', type: TableSortOrders.ASCENDING_ORDER }],
    },
  }]

  // run them
  testCases.forEach(({ caseLabel, caseProperties }) => it(caseLabel, () => {
    const props = { ...commonProperties, ...caseProperties }
    const wrapper = shallow(<SearchResultsComponent {...props} />, options)
    assert.lengthOf(wrapper.find(TableContainer), 1, 'There should be a TableContainer rendered')
  }))
})
