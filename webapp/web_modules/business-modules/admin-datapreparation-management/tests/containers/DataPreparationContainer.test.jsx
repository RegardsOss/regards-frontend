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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { requestActions, requestSelectors } from '../../src/clients/WorkerRequestClient'
import DataPreparationComponent from '../../src/components/DataPreparationComponent'
import { DataPreparationContainer } from '../../src/containers/DataPreparationContainer'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test DataPreparationContainer
 * @author Théo Lasserre
 */
describe('[ADMIN DATAPREPARATION MANAGEMENT] Testing DataPreparationContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DataPreparationContainer)
  })
  it('should render correctly', () => {
    const props = {
      // from mapStateToProps
      numberOfRequests: 40,
      // from mapDispatchToProps
      fetchRequests: () => {},
      onDeleteRequest: () => {},
      onRetryRequest: () => {},
    }
    const enzymeWrapper = shallow(<DataPreparationContainer {...props} />, { context })
    const subComponent = enzymeWrapper.find(TableFilterSortingAndVisibilityContainer)
    assert.lengthOf(subComponent, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(subComponent, {
      pageActions: requestActions,
      pageSelectors: requestSelectors,
      defaultFiltersState: DataPreparationComponent.DEFAULT_FILTERS_STATE,
      onDeleteRequest: enzymeWrapper.instance().onDeleteRequest,
      onRetryRequest: enzymeWrapper.instance().onRetryRequest,
    }, 'Component should define the expected properties and callbacks')
  })
})
