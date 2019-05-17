/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ListViewComponent from '../../../../../src/components/user/results/list/ListViewComponent'
import ListViewContainer from '../../../../../src/containers/user/results/list/ListViewContainer'
import { tableActions } from '../../../../../src/clients/TableClient'
import {
  searchDataobjectsActions, searchDatasetsActions, searchDocumentsActions, selectors as searchSelectors,
} from '../../../../../src/clients/SearchEntitiesClient'
import styles from '../../../../../src/styles'
import { dataContext } from '../../../../dumps/data.context.dump'
import { documentsContext } from '../../../../dumps/documents.context.dump'

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
    presentationModels: dataContext.typeState[DamDomain.ENTITY_TYPES_ENUM.DATA].modeState[UIDomain.RESULTS_VIEW_MODES_ENUM.LIST].presentationModels,
    actions: searchDataobjectsActions,
    enableSelection: true,
    descriptionAvailable: false,
    enableDownload: true,
    enableCart: true,
    enableServices: true,
    enableSearchEntity: false,
  }, {
    type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
    presentationModels: dataContext.typeState[DamDomain.ENTITY_TYPES_ENUM.DATASET].modeState[UIDomain.RESULTS_VIEW_MODES_ENUM.LIST].presentationModels,
    actions: searchDatasetsActions,
    enableSelection: false,
    descriptionAvailable: true,
    enableDownload: false,
    enableCart: false,
    enableServices: false,
    enableSearchEntity: true,
  }, {
    type: DamDomain.ENTITY_TYPES_ENUM.DOCUMENT,
    presentationModels: documentsContext.typeState[DamDomain.ENTITY_TYPES_ENUM.DOCUMENT].modeState[UIDomain.RESULTS_VIEW_MODES_ENUM.LIST].presentationModels,
    actions: searchDocumentsActions,
    enableSelection: false,
    descriptionAvailable: true,
    enableDownload: true,
    enableCart: false,
    enableServices: false,
    enableSearchEntity: false,
  }]

  testCases.forEach(({
    type, presentationModels, actions, enableSelection, descriptionAvailable,
    enableDownload, enableCart, enableServices, enableSearchEntity,
  }) => it(`should render correctly for ${type}`, () => {
    const props = {
      type,
      requestParameters: {},
      searchActions: actions,
      thumbnailRenderData: ListViewContainer.buildThumbnailRenderData(presentationModels),
      gridAttributesRenderData: ListViewContainer.buildGridAttributesRenderData(presentationModels),
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
      tableActions,
      requestParams: props.requestParameters,
      displayColumnsHeader: false,

      queryPageSize: ListViewComponent.RESULTS_PAGE_SIZE,
      emptyComponent: ListViewComponent.EMPTY_COMPONENT,
    })
    assert.isOk(tableWrapper.props().lineHeight, 'Line height should be set')
    assert.lengthOf(tableWrapper.props().columns, 1, 'There should be list single column')
  }))
})