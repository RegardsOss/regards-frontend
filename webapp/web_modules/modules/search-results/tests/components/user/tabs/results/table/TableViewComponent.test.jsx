/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { PageableInfiniteTableContainer } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { getSearchCatalogClient } from '../../../../../../src/clients/SearchEntitiesClient'
import { getTableClient } from '../../../../../../src/clients/TableClient'
import TableViewComponent from '../../../../../../src/components/user/tabs/results/table/TableViewComponent'
import { TableViewContainer } from '../../../../../../src/containers/user/tabs/results/table/TableViewContainer'
import styles from '../../../../../../src/styles'
import { dataContext } from '../../../../../dumps/data.context.dump'

const context = buildTestContext(styles)

/**
 * Test TableViewComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing TableViewComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TableViewComponent)
  })

  const testCases = [{
    type: DamDomain.ENTITY_TYPES_ENUM.DATA,
    tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
    presentationModels: dataContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].types[DamDomain.ENTITY_TYPES_ENUM.DATA].modes[UIDomain.RESULTS_VIEW_MODES_ENUM.LIST].presentationModels,
    enableSelection: true,
    descriptionAvailable: false,
    enableDownload: true,
    enableCart: true,
    enableServices: true,
    enableSearchEntity: false,
  }, {
    type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
    tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
    presentationModels: dataContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].types[DamDomain.ENTITY_TYPES_ENUM.DATASET].modes[UIDomain.RESULTS_VIEW_MODES_ENUM.LIST].presentationModels,
    enableSelection: false,
    descriptionAvailable: true,
    enableDownload: false,
    enableCart: false,
    enableServices: false,
    enableSearchEntity: true,
  }]

  testCases.forEach(({
    type, tabType, presentationModels, enableSelection, descriptionAvailable,
    enableDownload, enableCart, enableServices, enableSearchEntity,
  }) => it(`should render correctly for ${type}`, () => {
    const { searchDataobjectsActions, searchDatasetsActions, searchSelectors } = getSearchCatalogClient(tabType)
    const searchActions = type === DamDomain.ENTITY_TYPES_ENUM.DATASET ? searchDatasetsActions : searchDataobjectsActions
    const props = {
      tabType,
      type,
      columnPresentationModels: TableViewContainer.convertToColumnPresentationModels(presentationModels, []),
      requestParameters: {},
      searchActions,
      onSort: () => {},
      descriptionAvailable,
      onShowDescription: () => {},
      enableDownload,
      accessToken: 'abc',
      projectName: 'def',
      onAddElementToCart: enableCart ? () => {} : null,
      enableServices,
      enableSearchEntity,
      onSearchEntity: () => {},
    }
    const enzymeWrapper = shallow(<TableViewComponent {...props} />, { context })
    // check table and its properties
    const tableWrapper = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(tableWrapper, 1, 'There should be the table')
    testSuiteHelpers.assertWrapperProperties(tableWrapper, {
      pageActions: props.searchActions,
      pageSelectors: searchSelectors,
      tableActions: getTableClient(tabType).tableActions,
      requestParams: props.requestParameters,
      displayColumnsHeader: true,
      emptyComponent: TableViewComponent.EMPTY_COMPONENT,
      queryPageSize: UIDomain.ResultsContextConstants.PAGE_SIZE_FOR[UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE],
    })
    assert.isOk(tableWrapper.props().lineHeight, 'Line height should be provided')
    const columnModels = props.columnPresentationModels
    assert.isTrue(columnModels.length > 0, 'Some columns should have been provided, from configuration')
    assert.lengthOf(tableWrapper.props().columns, columnModels.length, 'There should be one table column for each model')
  }))
})
