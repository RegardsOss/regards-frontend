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
import { OAISFeatureManagerContainer } from '../../src/containers/OAISFeatureManagerContainer'
import styles from '../../src/styles'
import OAISFeatureManagerComponent from '../../src/components/OAISFeatureManagerComponent'

const context = buildTestContext(styles)

/**
 * Test OAISFeatureManagerContainer
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing OAISFeatureManagerContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OAISFeatureManagerContainer)
  })
  it('should render correctly', () => {
    const props = {
      params: {
        project: 'any',
      },
      fetchProcessingChains: () => {},
      fetchPage: () => {},
      deleteRequests: () => {},
      retryRequests: () => {},
      abortRequests: () => {},
      selectVersionOption: () => {},
      fetchStorages: () => {},
      modifyAips: () => {},
    }
    const enzymeWrapper = shallow(<OAISFeatureManagerContainer {...props} />, { context })
    const instance = enzymeWrapper.instance()
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, OAISFeatureManagerComponent, {
      params: props.params,
      isLoading: false,
      storages: props.storages,
      onRefresh: instance.onRefresh,
      onDeleteRequests: instance.onDeleteRequests,
      onRetryRequests: instance.onRetryRequests,
      onAbortRequests: instance.onAbortRequests,
      onSelectVersionOption: instance.onSelectVersionOption,
      onModifyAip: instance.onModifyAip,
      modeSelectionAllowed: false,
      onBack: instance.onBack,
    }, 'Component should define the expected properties and callbacks')
  })
})
