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
import { UIDomain } from '@regardsoss/domain'
import { InfiniteGalleryContainer } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { getSearchCatalogClient } from '../../../../../../src/clients/SearchEntitiesClient'
import QuicklooksViewComponent from '../../../../../../src/components/user/tabs/results/quickooks/QuicklooksViewComponent'
import QuicklookCellComponent from '../../../../../../src/components/user/tabs/results/quickooks/QuicklookCellComponent'
import styles from '../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test QuicklooksViewComponent
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
describe('[SEARCH RESULTS] Testing QuicklooksViewComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(QuicklooksViewComponent)
  })
  it('should render correctly embedded in map', () => {
    const { searchDataobjectsActions, searchSelectors } = getSearchCatalogClient(UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS)
    const props = {
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      requestParameters: {},
      loadedEntities: [],
      searchActions: searchDataobjectsActions,
      cellProperties: {
        tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
        presentationModels: [],
        enableServices: true,
        descriptionAvailable: true,
        onAddElementToCart: () => { },
        onShowDescription: () => { },
        enableDownload: true,
        accessToken: 'abc',
        projectName: 'def',
        embedInMap: true,
        mapThumbnailHeight: 150,
        primaryQuicklookGroup: 'myMainGroup',
        onProductSelected: () => { },
        locale: UIDomain.LOCALES_ENUM.en,
        selectedProducts: {},
      },
      embedInMap: true,
      isItemOfInterest: () => { },
    }
    const enzymeWrapper = shallow(<QuicklooksViewComponent {...props} />, { context })
    const galleryWrapper = enzymeWrapper.find(InfiniteGalleryContainer)
    assert.lengthOf(galleryWrapper, 1, 'There should be the gallery container')
    testSuiteHelpers.assertWrapperProperties(galleryWrapper, {
      itemComponent: QuicklookCellComponent,
      pageActions: props.searchActions,
      requestParams: props.requestParameters,
      itemProps: props.cellProperties,
      loadedEntities: props.loadedEntities,
      pageSelectors: searchSelectors,
    }, 'Gallery wrapper properties should be correctly set')
    assert.isOk(galleryWrapper.props().pageSelectors, 'Page selectors should be provided')
    assert.isOk(galleryWrapper.props().columnWidth, 'Column width should be provided')
    assert.isOk(galleryWrapper.props().columnGutter, 'Column gutter should be provided')
  })
  it('should render correctly as standalone view', () => {
    const { searchDataobjectsActions, searchSelectors } = getSearchCatalogClient(UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS)
    const props = {
      tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
      requestParameters: {},
      loadedEntities: [],
      searchActions: searchDataobjectsActions,
      cellProperties: {
        tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
        presentationModels: [],
        enableServices: false,
        descriptionAvailable: false,
        onAddElementToCart: null,
        onShowDescription: () => { },
        enableDownload: false,
        accessToken: 'abc',
        projectName: 'def',
        embedInMap: false,
        mapThumbnailHeight: 150,
        primaryQuicklookGroup: 'myMainGroup',
        onProductSelected: () => { },
        locale: UIDomain.LOCALES_ENUM.fr,
        selectedProducts: {},
      },
      embedInMap: false,
      isItemOfInterest: () => { },
    }
    const enzymeWrapper = shallow(<QuicklooksViewComponent {...props} />, { context })
    const galleryWrapper = enzymeWrapper.find(InfiniteGalleryContainer)
    assert.lengthOf(galleryWrapper, 1, 'There should be the gallery container')
    testSuiteHelpers.assertWrapperProperties(galleryWrapper, {
      itemComponent: QuicklookCellComponent,
      pageActions: props.searchActions,
      requestParams: props.requestParameters,
      itemProps: props.cellProperties,
      loadedEntities: props.loadedEntities,
      pageSelectors: searchSelectors,
    }, 'Gallery wrapper properties should be correctly set')
    assert.isOk(galleryWrapper.props().columnWidth, 'Column width should be provided')
    assert.isOk(galleryWrapper.props().columnGutter, 'Column gutter should be provided')
  })
})
