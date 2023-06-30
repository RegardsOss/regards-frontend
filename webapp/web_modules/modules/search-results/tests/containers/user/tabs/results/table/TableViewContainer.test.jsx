/* eslint-disable no-undef */
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
import { UIDomain, DamDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { getSearchCatalogClient } from '../../../../../../src/clients/SearchEntitiesClient'
import TableViewComponent from '../../../../../../src/components/user/tabs/results/table/TableViewComponent'
import { TableViewContainer } from '../../../../../../src/containers/user/tabs/results/table/TableViewContainer'
import styles from '../../../../../../src/styles'
import { dataContext } from '../../../../../dumps/data.context.dump'

const context = buildTestContext(styles)

/**
 * Test TableViewContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing TableViewContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TableViewContainer)
  })
  const testCases = [{
    type: DamDomain.ENTITY_TYPES_ENUM.DATA,
    tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
    resultsContext: dataContext,
    searchActions: getSearchCatalogClient(UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS).searchDataobjectsActions,
    descriptionAvailable: true,
    enableCart: true,
    expectDownloadEnabled: true,
    expectServicesEnabled: true,
    expectSearchEnabled: false,
  }, {
    type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
    tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
    resultsContext: dataContext,
    searchActions: getSearchCatalogClient(UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS).searchDatasetsActions,
    descriptionAvailable: false,
    enableCart: false,
    expectDownloadEnabled: false,
    expectServicesEnabled: false,
    expectSearchEnabled: true,
  }]

  testCases.forEach(({
    type, tabType, resultsContext, searchActions,
    descriptionAvailable, enableCart,
    expectDownloadEnabled, expectServicesEnabled, expectSearchEnabled,
  }) => it(`should render correctly for ${type}`, () => {
    const props = {
      moduleId: 1,
      tabType,
      resultsContext: UIDomain.ResultsContextHelper.deepMerge(resultsContext, {
        selectedTab: tabType,
        tabs: {
          [tabType]: {
            selectedType: type,
            types: {
              [type]: {
                selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
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
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<TableViewContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(TableViewComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    const { columnPresentationModels } = enzymeWrapper.state()
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      tabType,
      type,
      columnPresentationModels,
      requestParameters: props.requestParameters,
      searchActions: props.searchActions,
      descriptionAvailable: props.descriptionAvailable,
      onShowDescription: props.onShowDescription,
      enableDownload: expectDownloadEnabled,
      accessToken: props.accessToken,
      projectName: props.projectName,
      onAddElementToCart: props.onAddElementToCart,
      enableServices: expectServicesEnabled,
      enableSearchEntity: expectSearchEnabled,
      onSearchEntity: props.onSearchEntity,
      onSort: enzymeWrapper.instance().onSort,
    }, 'Component should define the expected properties')
    assert.lengthOf(columnPresentationModels,
      props.resultsContext.tabs[tabType].types[type].modes[UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE].presentationModels.length,
      'There should be one column presentation model for each configured column')
  }))
})
