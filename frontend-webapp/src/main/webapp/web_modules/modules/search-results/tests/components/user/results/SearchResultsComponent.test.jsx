/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableContainer, TableSortOrders } from '@regardsoss/components'
import { searchDataobjectsActions, searchDatasetsActions } from '../../../../src/clients/SearchEntitiesClient'
import SearchResultsComponent from '../../../../src/components/user/results/SearchResultsComponent'
import Styles from '../../../../src/styles/styles'


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
      viewMode: SearchResultsComponent.ViewModes.LIST,
      sortingOn: [],
    },
  }, {
    caseLabel: 'Should render dataobjects in table mode',
    caseProperties: {
      showingDataobjects: true,
      resultPageActions: searchDataobjectsActions,
      viewMode: SearchResultsComponent.ViewModes.TABLE,
      sortingOn: [],
    },
  }, {
    caseLabel: 'Should render datasets in list mode',
    caseProperties: {
      showingDataobjects: false,
      resultPageActions: searchDatasetsActions,
      viewMode: SearchResultsComponent.ViewModes.LIST,
      sortingOn: [],
    },
    // no dataset table
  }, {
    caseLabel: 'Should render with sorting',
    caseProperties: {
      showingDataobjects: true,
      resultPageActions: searchDataobjectsActions,
      viewMode: SearchResultsComponent.ViewModes.TABLE,
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
