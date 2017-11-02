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
import { PageableInfiniteTableContainer, TableSortOrders } from '@regardsoss/components'
import { AccessDomain, DamDomain } from '@regardsoss/domain'
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
    selectionServices: [],

    onFiltersChanged: () => { },
    onSetEntityAsTag: () => { },
    onSelectSearchTag: () => { },
    onShowDatasets: () => { },
    onShowDataobjects: () => { },
    onShowListView: () => { },
    onShowTableView: () => { },
    onSortChanged: () => { },
    onToggleShowFacettes: () => { },
    onStartSelectionService: () => { },

  }

  // define the test cases
  const testCases = [{
    caseLabel: 'Should render dataobjects in list mode',
    caseProperties: {
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      resultPageActions: searchDataobjectsActions,
      viewMode: DisplayModeEnum.LIST,
      sortingOn: [],
    },
  }, {
    caseLabel: 'Should render dataobjects in table mode',
    caseProperties: {
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      resultPageActions: searchDataobjectsActions,
      viewMode: DisplayModeEnum.TABLE,
      sortingOn: [],
    },
  }, {
    caseLabel: 'Should render datasets in list mode',
    caseProperties: {
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
      resultPageActions: searchDatasetsActions,
      viewMode: DisplayModeEnum.LIST,
      sortingOn: [],
    },
    // no dataset table
  }, {
    caseLabel: 'Should render with sorting',
    caseProperties: {
      viewObjectType: DamDomain.ENTITY_TYPES_ENUM.DATA,
      resultPageActions: searchDataobjectsActions,
      viewMode: DisplayModeEnum.TABLE,
      sortingOn: [{ attributePath: 'label', type: TableSortOrders.ASCENDING_ORDER }],
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
      ...testCases[0].caseProperties,
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
