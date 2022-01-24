/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { PageableInfiniteTableContainer } from '@regardsoss/components'
import ListViewComponent from '../../../../../../src/components/user/tabs/results/list/ListViewComponent'
import { ListViewContainer } from '../../../../../../src/containers/user/tabs/results/list/ListViewContainer'
import { getSearchCatalogClient } from '../../../../../../src/clients/SearchEntitiesClient'
import EmptyTableContainer from '../../../../../../src/containers/user/tabs/results/common/EmptyTableContainer'
import styles from '../../../../../../src/styles'
import { dataContext } from '../../../../../dumps/data.context.dump'

const context = buildTestContext(styles)

/**
 * Test ListViewComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ListViewComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ListViewComponent)
  })
  const testCases = [{
    type: DamDomain.ENTITY_TYPES_ENUM.DATA,
    presentationModels: dataContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].types[DamDomain.ENTITY_TYPES_ENUM.DATA].modes[UIDomain.RESULTS_VIEW_MODES_ENUM.LIST].presentationModels,
    tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
    enableSelection: true,
    descriptionAvailable: false,
    enableDownload: true,
    enableCart: true,
    enableServices: true,
    enableSearchEntity: false,
  }, {
    type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
    presentationModels: dataContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].types[DamDomain.ENTITY_TYPES_ENUM.DATASET].modes[UIDomain.RESULTS_VIEW_MODES_ENUM.LIST].presentationModels,
    tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
    enableSelection: false,
    descriptionAvailable: true,
    enableDownload: false,
    enableCart: false,
    enableServices: false,
    enableSearchEntity: true,
  }]

  testCases.forEach(({
    type, presentationModels, tabType, enableSelection, descriptionAvailable,
    enableDownload, enableCart, enableServices, enableSearchEntity,
  }) => it(`should render correctly for ${type}`, () => {
    // prepare render data
    const { th: thumbnailRenderData, gA: gridAttributesRenderData } = presentationModels.reduce(({ th, gA }, model) => {
      if (model.attributes.length === 1
        && model.attributes[0].model.content.type === DamDomain.PSEUDO_ATTR_TYPES.THUMBNAIL_PSEUDO_TYPE) {
        return {
          th: ListViewContainer.buildAttributeRenderData(model),
          gA,
        }
      }
      return {
        th, gA: [...gA, ListViewContainer.buildAttributeRenderData(model)],
      }
    }, { th: null, gA: [] })
    const { searchDataobjectsActions, searchDatasetsActions, searchSelectors } = getSearchCatalogClient(tabType)
    const searchActions = type === DamDomain.ENTITY_TYPES_ENUM.DATASET ? searchDatasetsActions : searchDataobjectsActions
    const props = {
      type,
      tabType,
      requestParameters: {},
      searchActions,
      thumbnailRenderData,
      gridAttributesRenderData,
      enableSelection,
      descriptionAvailable,
      onShowDescription: () => {},
      enableDownload,
      accessToken: 'idk',
      projectName: 'some',
      onAddElementToCart: enableCart ? () => {} : null,
      enableServices,
      enableSearchEntity,
      onSearchEntity: () => {},
    }
    const enzymeWrapper = shallow(<ListViewComponent {...props} />, { context })
    const tableWrapper = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(tableWrapper, 1, 'There should be the table')
    testSuiteHelpers.assertWrapperProperties(tableWrapper, {
      pageActions: props.searchActions,
      pageSelectors: searchSelectors,
      requestParams: props.requestParameters,
      displayColumnsHeader: false,
      queryPageSize: UIDomain.ResultsContextConstants.PAGE_SIZE_FOR[UIDomain.RESULTS_VIEW_MODES_ENUM.LIST],
      emptyComponent: <EmptyTableContainer tabType={tabType} />,
    })
    assert.isOk(tableWrapper.props().lineHeight, 'Line height should be set')
    assert.lengthOf(tableWrapper.props().columns, 1, 'There should be list single column')
  }))
})
