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
      pageMeta: {
        totalElements: 40,
      },
      // from mapDispatchToProps
      fetchRequests: () => {},
      onDeleteRequest: () => {},
      onRetryRequest: () => {},
    }
    const enzymeWrapper = shallow(<DataPreparationContainer {...props} />, { context })
    const subComponent = enzymeWrapper.find(DataPreparationComponent)
    assert.lengthOf(subComponent, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(subComponent, {
      onDeleteRequest: enzymeWrapper.instance().onDeleteRequest,
      onRetryRequest: enzymeWrapper.instance().onRetryRequest,
      onBack: enzymeWrapper.instance().onBack,
      onRefresh: enzymeWrapper.instance().onRefresh,
      isLoading: enzymeWrapper.instance().state.isFetching,
      numberOfRequests: props.pageMeta.totalElements,
    }, 'Component should define the expected properties and callbacks')
  })
})
