/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { searchDataobjectsActions, selectors as searchSelectors } from '../../../../../src/clients/SearchEntitiesClient'
import QuicklooksViewComponent from '../../../../../src/components/user/results/quickooks/QuicklooksViewComponent'
import QuicklookCellComponent from '../../../../../src/components/user/results/quickooks/QuicklookCellComponent'
import styles from '../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test QuicklooksViewComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing QuicklooksViewComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(QuicklooksViewComponent)
  })
  it('should render correctly embedded in map', () => {
    const props = {
      requestParameters: {},
      searchActions: searchDataobjectsActions,
      cellProperties: {
        presentationModels: [],
        enableServices: true,
        descriptionAvailable: true,
        onAddElementToCart: () => {},
        onShowDescription: () => {},
        enableDownload: true,
        accessToken: 'abc',
        projectName: 'def',
        embedInMap: true,
        mapThumbnailHeight: 150,
        locale: UIDomain.LOCALES_ENUM.en,
      },
      embedInMap: true,
    }
    const enzymeWrapper = shallow(<QuicklooksViewComponent {...props} />, { context })
    const galleryWrapper = enzymeWrapper.find(InfiniteGalleryContainer)
    assert.lengthOf(galleryWrapper, 1, 'There should be the gallery container')
    testSuiteHelpers.assertWrapperProperties(galleryWrapper, {
      itemComponent: QuicklookCellComponent,
      pageActions: props.searchActions,
      requestParams: props.requestParameters,
      itemProps: props.cellProperties,
      pageSelectors: searchSelectors,
    }, 'Gallery wrapper properties should be correctly set')
    assert.isOk(galleryWrapper.props().pageSelectors, 'Page selectors should be provided')
    assert.isOk(galleryWrapper.props().columnWidth, 'Column width should be provided')
    assert.isOk(galleryWrapper.props().columnGutter, 'Column gutter should be provided')
  })
  it('should render correctly as standalone view', () => {
    const props = {
      requestParameters: {},
      searchActions: searchDataobjectsActions,
      cellProperties: {
        presentationModels: [],
        enableServices: false,
        descriptionAvailable: false,
        onAddElementToCart: null,
        onShowDescription: () => {},
        enableDownload: false,
        accessToken: 'abc',
        projectName: 'def',
        embedInMap: false,
        mapThumbnailHeight: 150,
        locale: UIDomain.LOCALES_ENUM.fr,
      },
      embedInMap: false,
    }
    const enzymeWrapper = shallow(<QuicklooksViewComponent {...props} />, { context })
    const galleryWrapper = enzymeWrapper.find(InfiniteGalleryContainer)
    assert.lengthOf(galleryWrapper, 1, 'There should be the gallery container')
    testSuiteHelpers.assertWrapperProperties(galleryWrapper, {
      itemComponent: QuicklookCellComponent,
      pageActions: props.searchActions,
      requestParams: props.requestParameters,
      itemProps: props.cellProperties,
      pageSelectors: searchSelectors,
    }, 'Gallery wrapper properties should be correctly set')
    assert.isOk(galleryWrapper.props().columnWidth, 'Column width should be provided')
    assert.isOk(galleryWrapper.props().columnGutter, 'Column gutter should be provided')
  })
})
