/* eslint-disable no-undef */
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
import { UIDomain, DamDomain } from '@regardsoss/domain'
import { UIClient } from '@regardsoss/client'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { searchDataobjectsActions, searchDatasetsActions, searchDocumentsActions } from '../../../../../src/clients/SearchEntitiesClient'
import TableViewComponent from '../../../../../src/components/user/results/table/TableViewComponent'
import { TableViewContainer } from '../../../../../src/containers/user/results/table/TableViewContainer'
import styles from '../../../../../src/styles'
import { dataContext } from '../../../../dumps/data.context.dump'
import { documentsContext } from '../../../../dumps/documents.context.dump'

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
    resultsContext: dataContext,
    searchActions: searchDataobjectsActions,
    descriptionAvailable: true,
    enableCart: true,
    expectDownloadEnabled: true,
    expectServicesEnabled: true,
    expectSearchEnabled: false,
  }, {
    type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
    resultsContext: dataContext,
    searchActions: searchDatasetsActions,
    descriptionAvailable: false,
    enableCart: false,
    expectDownloadEnabled: false,
    expectServicesEnabled: false,
    expectSearchEnabled: true,
  }, {
    type: DamDomain.ENTITY_TYPES_ENUM.DOCUMENT,
    resultsContext: documentsContext,
    searchActions: searchDocumentsActions,
    descriptionAvailable: true,
    enableCart: false,
    expectDownloadEnabled: true,
    expectServicesEnabled: false,
    expectSearchEnabled: false,
  }]

  testCases.forEach(({
    type, resultsContext, searchActions,
    descriptionAvailable, enableCart,
    expectDownloadEnabled, expectServicesEnabled, expectSearchEnabled,
  }) => it(`should render correctly for ${type}`, () => {
    const props = {
      moduleId: 1,
      resultsContext: UIClient.ResultsContextHelper.mergeDeep(resultsContext, {
        type,
        typeState: {
          [type]: { mode: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE },
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
      resultsContext.typeState[type].modeState[UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE].presentationModels.length,
      'There should be one column presentation model for each configured column')
  }))
})
