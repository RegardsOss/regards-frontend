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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableSelectionModes } from '@regardsoss/components'
import { OAISRequestManagerContainer } from '../../../src/containers/requests/OAISRequestManagerContainer'
import styles from '../../../src/styles'
import OAISRequestManagerComponent from '../../../src/components/requests/OAISRequestManagerComponent'

const context = buildTestContext(styles)

/**
 * Test OAISRequestManagerContainer
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing OAISRequestManagerContainer', () => {
  before(() => {
    testSuiteHelpers.before()
  })
  after(() => {
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(OAISRequestManagerContainer)
  })
  it('should render correctly with unresolved mode selection dependency', () => {
    const props = {
      params: {
        project: 'any',
      },
      meta: {
        number: 2,
        size: 20,
        totalElements: 50,
      },
      pageLoading: false,
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
        last: false,
      },
      tableSelection: [],
      selectionMode: TableSelectionModes.excludeSelected,
      availableDependencies: [],
      fetchProcessingChains: () => { },
      fetchPage: () => { },
      clearSelection: () => { },
      deleteRequests: () => { },
      retryRequests: () => { },
      selectVersionOption: () => { },
      abortRequests: () => { },
      updateStateFromRequestManager: () => { },
    }

    const enzymeWrapper = shallow(<OAISRequestManagerContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(OAISRequestManagerComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      updateStateFromRequestManager: props.updateStateFromRequestManager,
      pageSize: STATIC_CONF.TABLE.PAGE_SIZE,
      pageMeta: props.meta,
      featureManagerFilters: props.featureManagerFilters,
      requestFilters: props.requestFilters,
      modeSelectionAllowed: false, // from state, should be false as dependencies are not provided
      fetchPage: props.fetchPage,
      clearSelection: props.clearSelection,
      tableSelection: props.tableSelection,
      selectionMode: props.selectionMode,
      selectVersionOption: props.selectVersionOption,
      retryRequests: props.retryRequests,
      deleteRequests: props.deleteRequests,
      abortRequests: props.abortRequests,
    }, 'Component should define the expected properties and callbacks')
  })
  it('should render correctly with resolved mode selection dependency', () => {
    const props = {
      params: {
        project: 'any',
      },
      meta: {
        number: 2,
        size: 20,
        totalElements: 50,
      },
      pageLoading: false,
      featureManagerFilters: {},
      tableSelection: [],
      selectionMode: TableSelectionModes.includeSelected,
      availableDependencies: OAISRequestManagerContainer.SELECT_VERSION_DEPENDENCIES, // minimal dependencies to allow corresponding action
      fetchProcessingChains: () => { },
      fetchPage: () => { },
      clearSelection: () => { },
      deleteRequests: () => { },
      retryRequests: () => { },
      selectVersionOption: () => { },
      abortRequests: () => { },
      updateStateFromRequestManager: () => { },
    }

    const enzymeWrapper = shallow(<OAISRequestManagerContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(OAISRequestManagerComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    assert.isTrue(componentWrapper.props().modeSelectionAllowed)
  })
})
