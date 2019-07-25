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
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { UIClient } from '@regardsoss/client'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { searchDataobjectsActions } from '../../../../../src/clients/SearchEntitiesClient'
import QuicklooksViewComponent from '../../../../../src/components/user/results/quickooks/QuicklooksViewComponent'
import { QuicklooksViewContainer } from '../../../../../src/containers/user/results/quickooks/QuicklooksViewContainer'
import styles from '../../../../../src/styles'
import { dataContext } from '../../../../dumps/data.context.dump'

const context = buildTestContext(styles)

/**
 * Test QuicklooksViewContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing QuicklooksViewContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(QuicklooksViewContainer)
  })
  it('should render correctly in standalone quicklooks view', () => {
    const props = {
      resultsContext: UIClient.ResultsContextHelper.mergeDeep(dataContext, {
        type: DamDomain.ENTITY_TYPES_ENUM.DATA,
        typeState: {
          [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
            mode: UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK,
          },
        },
      }),
      requestParameters: {},
      searchActions: searchDataobjectsActions,
      descriptionAvailable: true,
      onShowDescription: () => {},
      accessToken: 'abc',
      projectName: 'def',
      onAddElementToCart: null,
      embedInMap: false,
      mapThumbnailHeight: null,
      currentTheme: {
        id: 11,
        name: 'Fake thme',
        active: true,
        configuration: { fakeColor: '#Z0V5YY' },
      },
      locale: 'en',
    }
    const enzymeWrapper = shallow(<QuicklooksViewContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(QuicklooksViewComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')

    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      requestParameters: props.requestParameters,
      searchActions: searchDataobjectsActions,
      embedInMap: false,
      cellProperties: {
        presentationModels: dataContext.typeState[DamDomain.ENTITY_TYPES_ENUM.DATA].modeState[UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK].presentationModels,
        enableServices: true,
        descriptionAvailable: true,
        onAddElementToCart: props.onAddElementToCart,
        onShowDescription: props.onShowDescription,
        enableDownload: true,
        accessToken: props.accessToken,
        projectName: props.projectName,
        embedInMap: false,
        mapThumbnailHeight: null,
        currentTheme: props.currentTheme,
        locale: props.locale,
      },
    }, 'Component should define the expected properties')
  })
  it('should render correctly embedded in map view', () => {
    const props = {
      resultsContext: UIClient.ResultsContextHelper.mergeDeep(dataContext, {
        type: DamDomain.ENTITY_TYPES_ENUM.DATA,
        typeState: {
          [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
            mode: UIDomain.RESULTS_VIEW_MODES_ENUM.MAP,
          },
        },
      }),
      requestParameters: {},
      searchActions: searchDataobjectsActions,
      descriptionAvailable: false,
      onShowDescription: () => {},
      accessToken: 'abc',
      projectName: 'def',
      onAddElementToCart: () => {},
      embedInMap: true,
      mapThumbnailHeight: 55,
      currentTheme: {
        id: 11,
        name: 'Fake thme',
        active: true,
        configuration: { fakeColor: '#Z0V5YY' },
      },
      locale: 'en',
    }
    const enzymeWrapper = shallow(<QuicklooksViewContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(QuicklooksViewComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')

    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      requestParameters: props.requestParameters,
      searchActions: searchDataobjectsActions,
      embedInMap: true,
      cellProperties: {
        presentationModels: dataContext.typeState[DamDomain.ENTITY_TYPES_ENUM.DATA].modeState[UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK].presentationModels,
        enableServices: true,
        descriptionAvailable: false,
        onAddElementToCart: props.onAddElementToCart,
        onShowDescription: props.onShowDescription,
        enableDownload: true,
        accessToken: props.accessToken,
        projectName: props.projectName,
        embedInMap: true,
        mapThumbnailHeight: 55,
        currentTheme: props.currentTheme,
        locale: props.locale,
      },
    }, 'Component should define the expected properties')
  })
})
