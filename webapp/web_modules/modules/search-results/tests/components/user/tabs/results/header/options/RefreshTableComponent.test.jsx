/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { RefreshPageableTableOption } from '@regardsoss/components'
import { UIDomain } from '@regardsoss/domain'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import RefreshTableComponent from '../../../../../../../src/components/user/tabs/results/header/options/RefreshTableComponent'
import styles from '../../../../../../../src/styles'
import { dataContext } from '../../../../../../dumps/data.context.dump'
import { getSearchCatalogClient } from '../../../../../../../src/clients/SearchEntitiesClient'

const context = buildTestContext(styles)

/**
 * Test RefreshTableComponent
 * @author Léo Mieulet
 */
describe('[SEARCH RESULTS] Testing RefreshTableComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RefreshTableComponent)
  })
  it('should render correctly with refresh table', () => {
    const props = {
      requestParameters: {},
      searchActions: getSearchCatalogClient(UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS).searchDataobjectsActions,
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      resultsContext: dataContext,
    }
    const enzymeWrapper = shallow(<RefreshTableComponent {...props} />, { context })
    const refreshPageableTableComponent = enzymeWrapper.find(RefreshPageableTableOption)
    assert.lengthOf(refreshPageableTableComponent, 1)
    testSuiteHelpers.assertWrapperProperties(refreshPageableTableComponent, {
      shouldRefetchAll: true,
      pageableTableActions: props.searchActions,
      requestParams: props.requestParameters,
    }, 'should get correct params')
  })
})
