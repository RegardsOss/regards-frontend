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
import { getSearchCatalogClient } from '../../../../../../src/clients/SearchEntitiesClient'
import MapViewComponent from '../../../../../../src/components/user/tabs/results/map/MapViewComponent'
import { MapViewContainer } from '../../../../../../src/containers/user/tabs/results/map/MapViewContainer'
import styles from '../../../../../../src/styles'
import { dataContext } from '../../../../../dumps/data.context.dump'

const context = buildTestContext(styles)

/**
 * Test MapViewContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing MapViewContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MapViewContainer)
  })
  const testCases = [{
    tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
    descriptionAvailable: true,
    enableCart: true,
  }, {
    tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
    descriptionAvailable: false,
    enableCart: false,
  }]
  testCases.forEach(({ tabType, descriptionAvailable, enableCart }) => it(
    `should render correctly, ${enableCart ? 'with' : 'without'} cart and ${descriptionAvailable ? 'with' : 'without'} desciption`, () => {
      const props = {
        moduleId: 1,
        tabType,
        resultsContext: UIDomain.ResultsContextHelper.deepMerge(dataContext, {
          type: DamDomain.ENTITY_TYPES_ENUM.DATA,
          typeState: {
            [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
              mode: UIDomain.RESULTS_VIEW_MODES_ENUM.MAP,
            },
          },
        }),
        requestParameters: {},
        searchActions: getSearchCatalogClient(UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS).searchDataobjectsActions,
        descriptionAvailable,
        onShowDescription: () => {},
        accessToken: 'abc',
        projectName: 'def',
        onAddElementToCart: enableCart ? () => {} : null,
        updateResultsContext: () => {},
        dispatchSelectAll: () => {},
      }
      const enzymeWrapper = shallow(<MapViewContainer {...props} />, { context })
      const componentWrapper = enzymeWrapper.find(MapViewComponent)
      assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
      testSuiteHelpers.assertWrapperProperties(componentWrapper, {
        moduleId: props.moduleId,
        tabType,
        resultsContext: props.resultsContext,
        requestParameters: props.requestParameters,
        searchActions: props.searchActions,
        descriptionAvailable: props.descriptionAvailable,
        onShowDescription: props.onShowDescription,
        accessToken: props.accessToken,
        projectName: props.projectName,
        onAddElementToCart: props.onAddElementToCart,
        onSplitDropped: enzymeWrapper.instance().onSplitDropped,
      }, 'Component should define the expected properties')
    }))
})
