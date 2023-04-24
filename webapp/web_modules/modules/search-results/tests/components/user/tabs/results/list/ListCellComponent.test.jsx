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
import get from 'lodash/get'
import Checkbox from 'material-ui/Checkbox'
import { UIDomain, DamDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ListCellComponent from '../../../../../../src/components/user/tabs/results/list/ListCellComponent'
import DownloadEntityFileComponent from '../../../../../../src/components/user/tabs/results/common/options/DownloadEntityFileComponent'
import { ListViewContainer } from '../../../../../../src/containers/user/tabs/results/list/ListViewContainer'
import EntityDescriptionComponent from '../../../../../../src/components/user/tabs/results/common/options/EntityDescriptionComponent'
import SearchRelatedEntitiesComponent from '../../../../../../src/components/user/tabs/results/common/options/SearchRelatedEntitiesComponent'
import OneElementServicesContainer from '../../../../../../src/containers/user/tabs/results/common/options/OneElementServicesContainer'
import AddElementToCartContainer from '../../../../../../src/containers/user/tabs/results/common/options/AddElementToCartContainer'
import styles from '../../../../../../src/styles'
import { dataEntityWithServices, dataEntity, datasetEntity } from '../../../../../dumps/entities.dump'
import { dataContext } from '../../../../../dumps/data.context.dump'

const context = buildTestContext(styles)

/**
 * Test ListCellComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ListCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ListCellComponent)
  })
  const testCases = [{
    label: 'data (selected, with services, description, cart and download, without search)',
    tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
    presentationModels: dataContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].types[DamDomain.ENTITY_TYPES_ENUM.DATA].modes[UIDomain.RESULTS_VIEW_MODES_ENUM.LIST].presentationModels,
    entity: dataEntityWithServices,
    enableServices: true,
    descriptionAvailable: true,
    enableSelection: true,
    enableCart: true,
    disableLabelDisplay: false,
    enableDownload: true,
    enableSearch: false,
    selected: true,
    expectThumbnail: true,
  }, {
    label: 'data (unselected, services enabled but empty, description, cart, download and search)',
    tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
    presentationModels: dataContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].types[DamDomain.ENTITY_TYPES_ENUM.DATA].modes[UIDomain.RESULTS_VIEW_MODES_ENUM.LIST].presentationModels,
    entity: dataEntity,
    enableServices: true,
    descriptionAvailable: false,
    enableSelection: true,
    enableCart: false,
    disableLabelDisplay: false,
    enableDownload: false,
    enableSearch: false,
    selected: false,
    expectThumbnail: true,
  }, {
    label: 'dataset (with description, search, cart and download, without selection and service)',
    tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
    presentationModels: dataContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].types[DamDomain.ENTITY_TYPES_ENUM.DATASET].modes[UIDomain.RESULTS_VIEW_MODES_ENUM.LIST].presentationModels,
    entity: datasetEntity,
    enableServices: false,
    descriptionAvailable: true,
    disableLabelDisplay: false,
    enableSelection: false,
    enableCart: false,
    enableDownload: true,
    enableSearch: false,
    selected: false,
    expectThumbnail: false,
  }]

  testCases.forEach(({
    label,
    tabType,
    presentationModels,
    entity,
    enableServices,
    enableCart,
    disableLabelDisplay,
    enableDownload,
    enableSearch,
    descriptionAvailable,
    enableSelection,
    selected,
    expectThumbnail,
  }) => it(`should render correctly for ${label}`, () => {
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
    const props = {
      tabType,
      entity,
      thumbnailRenderData,
      gridAttributesRenderData,
      descriptionAvailable,
      selected,
      enableSelection,
      enableDownload,
      disableLabelDisplay,
      accessToken: 'kikou',
      projectName: 'cookie',
      enableServices,
      enableSearchEntity: enableSearch,
      onSearchEntity: () => {},
      onAddElementToCart: enableCart ? () => {} : null,
      onSelect: () => {},
      onShowDescription: () => {},
    }
    const enzymeWrapper = shallow(<ListCellComponent {...props} />, { context })
    // 1 - Title: there should be entity label in h2 div
    const titleDiv = enzymeWrapper.find('h2')
    assert.lengthOf(titleDiv, 1, 'There should be the title division')
    assert.include(titleDiv.debug(), entity.content.label, 'Title division should show the entity label')
    // 2 - Selection (only when enabled)
    const selectionComp = enzymeWrapper.find(Checkbox)
    if (enableSelection) {
      assert.lengthOf(selectionComp, 1, 'Selection component should be shown')
      testSuiteHelpers.assertWrapperProperties(selectionComp, {
        checked: selected,
        onCheck: props.onSelect,
      }, 'Selection component properties should be correctly reported')
      if (selected) {
        assert.lengthOf(selectionComp, 1, 'Selection component should be shown')
      }
    } else {
      assert.lengthOf(selectionComp, 0, 'Selection component should not be shown')
    }
    // 3 - Download file
    const downloadFileComp = enzymeWrapper.find(DownloadEntityFileComponent)
    assert.lengthOf(downloadFileComp, 1, 'There should be download component')
    testSuiteHelpers.assertWrapperProperties(downloadFileComp, {
      entity,
      accessToken: props.accessToken,
      projectName: props.projectName,
    }, 'Download component properties should be correctly set')
    assert.equal(downloadFileComp.parent().props().show, enableDownload, 'Download file component should be shown / hidden according with enableDownload')

    // 4 - Description
    const descriptionComp = enzymeWrapper.find(EntityDescriptionComponent)
    assert.lengthOf(descriptionComp, 1, 'There should be description component')
    testSuiteHelpers.assertWrapperProperties(descriptionComp, {
      entity,
      onShowDescription: enzymeWrapper.instance().onShowDescription,
    }, 'Description component properties should be correctly set')
    assert.equal(descriptionComp.parent().props().show, descriptionAvailable, 'Description component should be shown / hidden according with descriptionAvailable')

    // 5 - Search entities
    const searchComponent = enzymeWrapper.find(SearchRelatedEntitiesComponent)
    assert.lengthOf(searchComponent, 1, 'There should be search component')
    testSuiteHelpers.assertWrapperProperties(searchComponent, {
      entity,
      onSearchEntity: props.onSearchEntity,
    }, 'Search component properties should be correctly set')
    assert.equal(searchComponent.parent().props().show, enableSearch, 'Search component should be shown / hidden according with enableSearch')

    // 6 - Services
    const servicesComponent = enzymeWrapper.find(OneElementServicesContainer)
    assert.lengthOf(servicesComponent, 1, 'There should be services component')
    testSuiteHelpers.assertWrapperProperties(servicesComponent, {
      tabType,
      entity,
    }, 'Services component properties should be correctly set')
    assert.equal(servicesComponent.parent().props().show, enableServices && get(entity.content, 'services.length', 0) > 0,
      'Services component should be shown / hidden according with enableServices and services list')

    // 7 - Add to cart
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

    // 8 - Thumbnail
    if (expectThumbnail) {
      assert.isOk(props.thumbnailRenderData && props.thumbnailRenderData.renderers.length, 'There should be thumbnail render data')
      assert.lengthOf(enzymeWrapper.find(props.thumbnailRenderData.renderers[0].RenderConstructor), 1, 'There shuld be the thumbnail render')
    }

    // 9 - Attributes
    assert.isOk(props.gridAttributesRenderData && props.gridAttributesRenderData.length, 'There should be attributes to render')
    props.gridAttributesRenderData.forEach((attrRenderData) => {
      assert.isOk(attrRenderData.renderers, 'There should be at least one renderer for each attribute')
      // check all renderes are drawn
      attrRenderData.renderers.forEach(({ RenderConstructor }) => {
        assert.isOk(enzymeWrapper.find(RenderConstructor).length, 'There should be the attribute render (one or more times)')
      })
    })
  }))
})
