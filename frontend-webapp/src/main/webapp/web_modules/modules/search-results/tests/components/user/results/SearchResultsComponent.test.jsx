/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableContainer } from '@regardsoss/components'
import CatalogDataobjectEntityActions from '../../../../src/models/catalog/CatalogDataobjectEntityActions'
import CatalogDatasetEntityActions from '../../../../src/models/catalog/CatalogDatasetEntityActions'
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
  }

  // define the test cases
  const testCases = [{
    caseLabel: 'Should render dataobjects in list mode',
    caseProperties: {
      showingDataobjects: true,
      resultPageActions: CatalogDataobjectEntityActions,
      viewMode: SearchResultsComponent.ViewModes.LIST,
    },
  }, {
    caseLabel: 'Should render dataobjects in table mode',
    caseProperties: {
      showingDataobjects: true,
      resultPageActions: CatalogDataobjectEntityActions,
      viewMode: SearchResultsComponent.ViewModes.TABLE,
    },
  }, {
    caseLabel: 'Should render datasets in list mode',
    caseProperties: {
      showingDataobjects: false,
      resultPageActions: CatalogDatasetEntityActions,
      viewMode: SearchResultsComponent.ViewModes.LIST,
    },
    // no dataset table
  }]

  // run them
  testCases.forEach(({ caseLabel, caseProperties }) => it(caseLabel, () => {
    const props = { ...commonProperties, ...caseProperties }
    const wrapper = shallow(<SearchResultsComponent {...props} />, options)
    assert.lengthOf(wrapper.find(TableContainer), 1, 'There should be a TableContainer rendered')
  }))
})
