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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { OAISRequestManagerContainer } from '../../../src/containers/requests/OAISRequestManagerContainer'
import styles from '../../../src/styles'
import OAISRequestManagerComponent from '../../../src/components/requests/OAISRequestManagerComponent'

const context = buildTestContext(styles)
const router = require('react-router')

/**
 * Test OAISRequestManagerContainer
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing OAISRequestManagerContainer', () => {
  before(() => {
    // mock browser history for container
    router.browserHistory = {
      getCurrentLocation: () => ({ query: {}, pathname: '' }),
      router: () => {},
    }
    testSuiteHelpers.before()
  })
  after(() => {
    delete router.browserHistory
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(OAISRequestManagerContainer)
  })
  it('should render correctly', () => {
    const props = {
      params: {
        project: 'any',
      },
      meta: {
        number: 2,
        size: 20,
        totalElements: 50,
      },

      fetchProcessingChains: () => {},
      fetchPage: () => {},
      clearSelection: () => {},
      deleteRequests: () => {},
      retryRequests: () => {},
      updateStateFromRequestManager: () => {},

      featureManagerFilters: {
        state: '',
        from: '',
        to: '',
        tags: [],
        providerId: '',
        sessionOwner: '',
        session: '',
        categories: [],
        storages: [],
      },
      selectionMode: '',

    }
    const enzymeWrapper = shallow(<OAISRequestManagerContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(OAISRequestManagerComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      pageSize: OAISRequestManagerContainer.PAGE_SIZE,
      featureManagerFilters: props.featureManagerFilters,
      requestFilters: props.requestFilters,
      selectionMode: props.selectionMode,
      deleteRequests: props.deleteRequests,
      retryRequests: props.retryRequests,
    }, 'Component should define the expected properties and callbacks')
  })
})
