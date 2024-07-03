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
import FeatureManagerComponent from '../../src/components/FeatureManagerComponent'
import { FeatureManagerContainer } from '../../src/containers/FeatureManagerContainer'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test FeatureManagerContainer
 * @author Théo Lasserre
 */
describe('[ADMIN FEATURE MANAGEMENT] Testing FeatureManagerContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FeatureManagerContainer)
  })
  it('should render correctly', () => {
    const props = {
      params: {
        project: 'any',
        type: 'any',
      },
      fetchRequests: () => { },
      fetchRequestsCount: () => { },
      deleteRequests: () => { },
      retryRequests: () => { },
      notifyRequests: () => { },
      fetchRecipients: () => { },
      forceErrorRequests: () => { },
      dispatchUnselectAll: () => { },
    }
    const enzymeWrapper = shallow(<FeatureManagerContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(FeatureManagerComponent)
    const instance = enzymeWrapper.instance()
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      params: props.params,
      onBack: instance.onBack,
      onRefresh: instance.onRefresh,
      isFetching: instance.state.isFetching,
      onDeleteRequests: instance.onDeleteRequests,
      onRetryRequests: instance.onRetryRequests,
      onNotifyRequests: instance.onNotifyRequests,
    }, 'Component should define the expected properties')
  })
})
