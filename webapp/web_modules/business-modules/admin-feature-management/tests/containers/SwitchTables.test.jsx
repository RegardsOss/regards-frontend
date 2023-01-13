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
import { FemDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SwitchComponent from '../../src/components/SwitchComponent'
import { SwitchTables } from '../../src/containers/SwitchTables'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SwitchTables
 * @author Théo Lasserre
 */
describe('[ Module name] Testing SwitchTables', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SwitchTables)
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
      referencesMeta: {
        totalElements: 0,
      },
      isReferencesFetching: false,
      creationMeta: {
        totalElements: 0,
      },
      isCreationFetching: false,
      updateMeta: {
        totalElements: 0,
      },
      isUpdateFetching: false,
      deleteMeta: {
        totalElements: 0,
      },
      isDeleteFetching: false,
      notificationMeta: {
        totalElements: 0,
      },
      isNotificationFetching: false,
      extractionInfo: {
        totalElements: 0,
      },
      creationInfo: {
        totalElements: 0,
      },
      updateInfo: {
        totalElements: 0,
      },
      deleteInfo: {
        totalElements: 0,
      },
      notificationInfo: {
        totalElements: 0,
      },
      //from mapDispatchToProps
      fetchReferences: () => { },
      fetchCreationRequests: () => { },
      fetchDeleteRequests: () => { },
      fetchNotificationRequests: () => { },
      fetchUpdateRequests: () => { },
    }
    const enzymeWrapper = shallow(<SwitchTables {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(SwitchComponent)
    assert.lengthOf(componentWrapper, 5, 'There should be 5 SwitchComponent')
  })
})
