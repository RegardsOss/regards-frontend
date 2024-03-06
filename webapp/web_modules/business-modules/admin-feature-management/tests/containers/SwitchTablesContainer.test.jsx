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
import { FemDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SwitchComponent from '../../src/components/SwitchComponent'
import { SwitchTablesContainer } from '../../src/containers/SwitchTablesContainer'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SwitchTablesContainer
 * @author Théo Lasserre
 */
describe('[OAIS FEATURE MANAGEMENT] Testing SwitchTablesContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SwitchTablesContainer)
  })
  it('should render correctly', () => {
    const props = {
      // from router
      params: {
        project: 'any',
      },
      onSwitchToPane: () => { },
      featureManagerFilters: {
        source: '',
        session: '',
        providerId: '',
        from: '',
        to: '',
        state: '',
      },
      paneType: FemDomain.REQUEST_TYPES_ENUM.REFERENCES,
      // from mapStateToProps
      referencesCountMeta: {
        totalElements: 0,
      },
      isReferencesCountFetching: false,
      creationCountMeta: {
        totalElements: 0,
      },
      isCreationCountFetching: false,
      updateCountMeta: {
        totalElements: 0,
      },
      isUpdateCountFetching: false,
      deleteCountMeta: {
        totalElements: 0,
      },
      isDeleteCountFetching: false,
      notificationCountMeta: {
        totalElements: 0,
      },
      isNotificationCountFetching: false,
      extractionCountInfo: {
        totalElements: 0,
      },
      creationCountInfo: {
        totalElements: 0,
      },
      updateCountInfo: {
        totalElements: 0,
      },
      deleteCountInfo: {
        totalElements: 0,
      },
      notificationCountInfo: {
        totalElements: 0,
      },
      //from mapDispatchToProps
      fetchReferencesCount: () => { },
      fetchCreationRequestsCount: () => { },
      fetchDeleteRequestsCount: () => { },
      fetchNotificationRequestsCount: () => { },
      fetchUpdateRequestsCount: () => { },
    }
    const enzymeWrapper = shallow(<SwitchTablesContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(SwitchComponent)
    assert.lengthOf(componentWrapper, 5, 'There should be 5 SwitchComponent')
  })
})
