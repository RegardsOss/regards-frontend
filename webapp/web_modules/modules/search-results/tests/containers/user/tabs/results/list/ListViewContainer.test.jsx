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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import ListViewComponent from '../../../../../../src/components/user/tabs/results/list/ListViewComponent'
import { ListViewContainer } from '../../../../../../src/containers/user/tabs/results/list/ListViewContainer'
import { getSearchCatalogClient } from '../../../../../../src/clients/SearchEntitiesClient'
import styles from '../../../../../../src/styles'
import { dataContext } from '../../../../../dumps/data.context.dump'

const context = buildTestContext(styles)

/**
 * Test ListViewContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ListViewContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ListViewContainer)
  })
  const testCases = [{
    tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
    type: DamDomain.ENTITY_TYPES_ENUM.DATA,
    resultsContext: dataContext,
    descriptionAvailable: true,
    enableCart: true,
    expectThumbnail: true,
    expectSelectionEnabled: true,
    expectDownloadEnabled: true,
    expectServicesEnabled: true,
    expectSearchEnabled: false,
  }, {
    tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
    type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
    resultsContext: dataContext,
    descriptionAvailable: false,
    enableCart: false,
    expectThumbnail: false,
    expectSelectionEnabled: false,
    expectDownloadEnabled: false,
    expectServicesEnabled: false,
    expectSearchEnabled: true,
  }]

  testCases.forEach(({
    tabType, type, resultsContext,
    descriptionAvailable, enableCart,
    expectThumbnail, expectSelectionEnabled, expectDownloadEnabled,
    expectServicesEnabled, expectSearchEnabled,
  }) => it(`should render correctly for ${type}`, () => {
    const { searchDataobjectsActions, searchDatasetsActions } = getSearchCatalogClient(tabType)
    const searchActions = type === DamDomain.ENTITY_TYPES_ENUM.DATASET ? searchDatasetsActions : searchDataobjectsActions
    const props = {
      tabType,
      resultsContext: UIDomain.ResultsContextHelper.deepMerge(resultsContext, {
        selectedTab: tabType,
        tabs: {
          [tabType]: {
            selectedType: type,
            types: {
              [type]: {
                selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.LIST,
              },
            },
          },
        },
      }),
      requestParameters: {},
      searchActions,
      descriptionAvailable,
      onShowDescription: () => {},
      accessToken: 'abc',
      projectName: 'def',
      onAddElementToCart: enableCart ? () => {} : null,
      onSearchEntity: () => {},
    }
    const enzymeWrapper = shallow(<ListViewContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(ListViewComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    const { thumbnailRenderData, gridAttributesRenderData } = enzymeWrapper.state()
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      tabType,
      type,
      requestParameters: props.requestParameters,
      searchActions: props.searchActions,
      thumbnailRenderData,
      gridAttributesRenderData,
      enableSelection: expectSelectionEnabled,
      descriptionAvailable: props.descriptionAvailable,
      onShowDescription: props.onShowDescription,
      enableDownload: expectDownloadEnabled,
      accessToken: props.accessToken,
      projectName: props.projectName,
      onAddElementToCart: props.onAddElementToCart,
      enableServices: expectServicesEnabled,
      enableSearchEntity: expectSearchEnabled,
      onSearchEntity: props.onSearchEntity,
    }, 'Component should define the expected properties')
    // check thumbnail expectations
    if (expectThumbnail) {
      assert.isOk(thumbnailRenderData, 'Thumbnail should be retrieved')
    } else {
      assert.isNotOk(thumbnailRenderData, 'Thumbnail should not be built')
    }
    // check built attributes
    const initialModels = resultsContext.tabs[tabType].types[type].modes[UIDomain.RESULTS_VIEW_MODES_ENUM.LIST].presentationModels
    assert.lengthOf(gridAttributesRenderData, initialModels.length - (expectThumbnail ? 1 : 0),
      'All attributes should have been rebuilt (except thumbnail if present)')
  }))
})
