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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain, UIDomain } from '@regardsoss/domain'
import MapViewComponent from '../../../../../../src/components/user/tabs/results/map/MapViewComponent'
import { getSearchCatalogClient } from '../../../../../../src/clients/SearchEntitiesClient'
import styles from '../../../../../../src/styles'
import { dataContext } from '../../../../../dumps/data.context.dump'

const context = buildTestContext(styles)

/**
 * Test MapViewComponent
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
describe('[SEARCH RESULTS] Testing MapViewComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MapViewComponent)
  })
  it('should render correctly', () => {
    const props = {
      moduleId: 1,
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      resultsContext: {
        ...dataContext,
        tabs: {
          ...dataContext.tabs,
          [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
            ...dataContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS],
            selectedtype: DamDomain.ENTITY_TYPES_ENUM.DATA,
            types: {
              ...dataContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].types,
              selectedMode: UIDomain.RESULTS_VIEW_MODES_ENUM.MAP,
            },
          },
        },

      },
      loadedEntities: [],
      requestParameters: {},
      searchActions: getSearchCatalogClient(UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS).searchDataobjectsActions,
      descriptionAvailable: true,
      onShowDescription: () => { },
      accessToken: 'abc',
      projectName: 'def',
      onAddElementToCart: () => { },
      onZoomToFeature: () => { },
      onSplitDropped: () => { },
      onNewItemOfInterestPicked: () => { },
    }
    shallow(<MapViewComponent {...props} />, { context })
    // cannot test further due to Measure HOC
  })
})
