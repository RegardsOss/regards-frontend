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
import get from 'lodash/get'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import NoPictureIcon from 'mdi-material-ui/ImageOff'
import BrokenPictureIcon from 'mdi-material-ui/ImageBroken'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import QuicklookCellComponent from '../../../../../../src/components/user/tabs/results/quickooks/QuicklookCellComponent'
import QuicklookCellAttributesComponent from '../../../../../../src/components/user/tabs/results/quickooks/QuicklookCellAttributesComponent'
import EntityDescriptionComponent from '../../../../../../src/components/user/tabs/results/common/options/EntityDescriptionComponent'
import OneElementServicesContainer from '../../../../../../src/containers/user/tabs/results/common/options/OneElementServicesContainer'
import AddElementToCartContainer from '../../../../../../src/containers/user/tabs/results/common/options/AddElementToCartContainer'
import DownloadEntityFileComponent from '../../../../../../src/components/user/tabs/results/common/options/DownloadEntityFileComponent'
import styles from '../../../../../../src/styles'
import { dataContext } from '../../../../../dumps/data.context.dump'
import { dataEntityWithServices, dataEntity } from '../../../../../dumps/entities.dump'

const context = buildTestContext(styles)

const EXPECTED_PICTURE_STATE = {
  NONE: 'NONE',
  BROKEN: 'BROKEN',
  VALID: 'VALID',
}

/**
 * Test QuicklookCellComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing QuicklookCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(QuicklookCellComponent)
  })
  const testCases = [{
    label: 'data with valid quicklook (with services, description, cart and download, outside map)',
    presentationModels: dataContext.tabs[UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS].types[DamDomain.ENTITY_TYPES_ENUM.DATA].modes[UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK].presentationModels,
    entity: dataEntityWithServices,
    enableServices: true,
    descriptionAvailable: true,
    enableCart: true,
    enableDownload: true,
    embedInMap: false,
    locale: UIDomain.LOCALES_ENUM.en,
    expectedPictureState: EXPECTED_PICTURE_STATE.VALID,
  }, {
    label: 'data with broken quicklook (without services, description, cart, download and search, in map)',
    presentationModels: dataContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].types[DamDomain.ENTITY_TYPES_ENUM.DATA].modes[UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK].presentationModels,
    entity: {
      content: {
        ...dataEntityWithServices.content,
        files: {
          [DamDomain.DATATYPE_ENUM.QUICKLOOK_SD]: [{
            ...dataEntityWithServices.content.files[DamDomain.DATATYPE_ENUM.QUICKLOOK_SD][0],
            imageWidth: null,
            imageHeight: null,
          }],
        },
      },
    },
    enableServices: false,
    descriptionAvailable: false,
    enableCart: false,
    enableDownload: false,
    embedInMap: true,
    locale: UIDomain.LOCALES_ENUM.fr,
    expectedPictureState: EXPECTED_PICTURE_STATE.BROKEN,
  }, {
    label: 'data without quicklook (services enabled but no entity service, description, cart and download, outside map)',
    presentationModels: dataContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].types[DamDomain.ENTITY_TYPES_ENUM.DATA].modes[UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK].presentationModels,
    entity: {
      content: {
        ...dataEntity.content,
        files: {
          [DamDomain.DATATYPE_ENUM.QUICKLOOK_SD]: [],
        },
      },
    },
    enableServices: true,
    descriptionAvailable: true,
    enableCart: true,
    enableDownload: true,
    embedInMap: false,
    locale: UIDomain.LOCALES_ENUM.en,
    expectedPictureState: EXPECTED_PICTURE_STATE.NONE,
  }]

  testCases.forEach(({
    label,
    presentationModels,
    entity,
    enableServices,
    enableCart,
    enableDownload,
    descriptionAvailable,
    embedInMap,
    locale,
    expectedPictureState,
  }) => it(`should render correctly for ${label}`, () => {
    const props = {
      top: 25,
      left: 536,
      width: 300,
      gridWidth: 350,
      entity,
      presentationModels,
      enableServices,
      descriptionAvailable,
      onShowDescription: () => {},
      enableDownload,
      accessToken: 'kikou',
      projectName: 'cookie',
      onAddElementToCart: enableCart ? () => {} : null,
      embedInMap,
      mapThumbnailHeight: 100,
      locale,
    }
    const enzymeWrapper = shallow(<QuicklookCellComponent {...props} />, { context })
    const quicklookPicture = enzymeWrapper.find('img')
    const brokenPictureIcon = enzymeWrapper.find(BrokenPictureIcon)
    const noPictureIcon = enzymeWrapper.find(NoPictureIcon)

    // 1 - Picture
    switch (expectedPictureState) {
      case EXPECTED_PICTURE_STATE.VALID:
        assert.lengthOf(quicklookPicture, 1, 'There should be quicklook picture displayer')
        assert.lengthOf(brokenPictureIcon, 0, 'There should not be broken picture icon')
        assert.lengthOf(noPictureIcon, 0, 'There should not be no picture icon')
        break
      case EXPECTED_PICTURE_STATE.BROKEN:
        assert.lengthOf(quicklookPicture, 0, 'There should not be quicklook picture displayer')
        assert.lengthOf(brokenPictureIcon, 1, 'There should be broken picture icon')
        assert.lengthOf(noPictureIcon, 0, 'There should not be no picture icon')
        break
      case EXPECTED_PICTURE_STATE.NONE:
      default:
        assert.lengthOf(quicklookPicture, 0, 'There should not be quicklook picture displayer')
        assert.lengthOf(brokenPictureIcon, 0, 'There should not be broken picture icon')
        assert.lengthOf(noPictureIcon, 1, 'There should not be picture icon')
    }

    // 2 - Description
    const descriptionComp = enzymeWrapper.find(EntityDescriptionComponent)
    assert.lengthOf(descriptionComp, 1, 'There should be description component')
    testSuiteHelpers.assertWrapperProperties(descriptionComp, {
      entity,
      onShowDescription: enzymeWrapper.instance().onShowDescription,
    }, 'Description component properties should be correctly set')
    assert.equal(descriptionComp.parent().props().show, descriptionAvailable,
      'Description component should be shown / hidden according with descriptionAvailable')

    // 3 - Services
    const servicesComponent = enzymeWrapper.find(OneElementServicesContainer)
    assert.lengthOf(servicesComponent, 1, 'There should be services component')
    testSuiteHelpers.assertWrapperProperties(servicesComponent, {
      entity,
    }, 'Services component properties should be correctly set')
    assert.equal(servicesComponent.parent().props().show, enableServices && get(entity.content, 'services.length', 0) > 0,
      'Services component should be shown / hidden according with enableServices and services list')

    // 4 - Add to cart
    const addToCartComponent = enzymeWrapper.find(AddElementToCartContainer)
    if (enableCart) {
      assert.lengthOf(addToCartComponent, 1, 'There should be add to cart component')
      testSuiteHelpers.assertWrapperProperties(addToCartComponent, {
        entity,
        onAddElementToCart: props.onAddElementToCart,
      }, 'Add to cart component should not be visible')
    } else {
      assert.lengthOf(addToCartComponent, 0, 'Add to cart component should not be visible')
    }

    // 5 - Download file
    const downloadFileComp = enzymeWrapper.find(DownloadEntityFileComponent)
    assert.lengthOf(downloadFileComp, 1, 'There should be download component')
    testSuiteHelpers.assertWrapperProperties(downloadFileComp, {
      entity,
      accessToken: props.accessToken,
      projectName: props.projectName,
    }, 'Download component properties should be correctly set')
    assert.equal(downloadFileComp.parent().props().show, enableDownload, 'Download file component should be shown / hidden according with enableDownload')


    // 9 - Attributes
    const attributesComponent = enzymeWrapper.find(QuicklookCellAttributesComponent)
    assert.lengthOf(attributesComponent, 1, 'There should be attributes render component')
    testSuiteHelpers.assertWrapperProperties(attributesComponent, {
      presentationModels: props.presentationModels,
      entity: props.entity,
      locale,
    }, 'Attribute render component properties should be correctly set')
  }))
})
