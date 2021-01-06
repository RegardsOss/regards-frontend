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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableSelectionModes } from '@regardsoss/components'
import ListCellComponent from '../../../../../../src/components/user/tabs/results/list/ListCellComponent'
import { ListCellContainer } from '../../../../../../src/containers/user/tabs/results/list/ListCellContainer'
import ListViewContainer from '../../../../../../src/containers/user/tabs/results/list/ListViewContainer'
import styles from '../../../../../../src/styles'
import { dataEntity, dataEntityWithServices, datasetEntity } from '../../../../../dumps/entities.dump'
import { dataContext } from '../../../../../dumps/data.context.dump'

const context = buildTestContext(styles)

/**
 * Test ListCellContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ListCellContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ListCellContainer)
  })

  const testCases = [{
    label: 'data with services',
    entity: dataEntityWithServices,
    tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
    presentationModels: dataContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].types[DamDomain.ENTITY_TYPES_ENUM.DATA].modes[UIDomain.RESULTS_VIEW_MODES_ENUM.LIST].presentationModels,
    enableSelection: true,
    descriptionAvailable: true,
    enableDownload: true,
    enableCart: true,
    enableServices: true,
    enableSearchEntity: false,
  }, {
    label: 'data without service',
    entity: dataEntity,
    tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
    presentationModels: dataContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].types[DamDomain.ENTITY_TYPES_ENUM.DATA].modes[UIDomain.RESULTS_VIEW_MODES_ENUM.LIST].presentationModels,
    enableSelection: true,
    descriptionAvailable: false,
    enableDownload: false,
    enableCart: false,
    enableServices: false,
    enableSearchEntity: false,
  }, {
    label: 'dataset',
    entity: datasetEntity,
    tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
    presentationModels: dataContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].types[DamDomain.ENTITY_TYPES_ENUM.DATASET].modes[UIDomain.RESULTS_VIEW_MODES_ENUM.LIST].presentationModels,
    enableSelection: false,
    descriptionAvailable: true,
    enableDownload: false,
    enableCart: true,
    enableServices: false,
    enableSearchEntity: true,
  }]

  testCases.forEach(({
    tabType, label, entity, presentationModels,
    enableSelection, descriptionAvailable, enableDownload,
    enableCart, enableServices, enableSearchEntity,
  }) => it(`It should render correctly ${label}`, () => {
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
      rowIndex: 1,
      entity,
      tabType,
      thumbnailRenderData,
      gridAttributesRenderData,
      enableSelection,
      descriptionAvailable,
      onShowDescription: () => {},
      enableDownload,
      accessToken: 'abc',
      projectName: 'def',
      onAddElementToCart: enableCart ? () => {} : null,
      enableServices,
      enableSearchEntity,
      onSearchEntity: () => {},
      toggledElements: {},
      selectionMode: TableSelectionModes.includeSelected,
      onSelect: () => {},
    }
    const enzymeWrapper = shallow(<ListCellContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(ListCellComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      entity: props.entity,
      thumbnailRenderData: props.thumbnailRenderData,
      gridAttributesRenderData: props.gridAttributesRenderData,
      descriptionAvailable: props.descriptionAvailable,
      onShowDescription: props.onShowDescription,
      enableDownload: props.enableDownload,
      accessToken: props.accessToken,
      projectName: props.projectName,
      onAddElementToCart: props.onAddElementToCart,
      enableServices: props.enableServices,
      enableSelection: props.enableSelection,
      selected: enzymeWrapper.instance().isSelectedRow(),
      onSelect: props.onSelect,
      enableSearchEntity: props.enableSearchEntity,
      onSearchEntity: enzymeWrapper.instance().onSearchEntity,
    }, 'Component should define the expected properties')
  }))
})
