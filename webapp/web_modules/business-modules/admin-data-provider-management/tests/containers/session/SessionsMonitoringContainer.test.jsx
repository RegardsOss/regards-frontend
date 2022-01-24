/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * wrapperInstance file is part of REGARDS.
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
import { AccessDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SessionsMonitoringComponent } from '../../../src/components/session/SessionsMonitoringComponent'
import { SessionsMonitoringContainer } from '../../../src/containers/session/SessionsMonitoringContainer'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SessionsMonitoringContainer
 * @author Kévin Picart
 */
describe('[ADMIN DATA-PROVIDER MANAGEMENT] Testing SessionsMonitoringContainer', () => {
  before(() => {
    testSuiteHelpers.before()
  })
  after(() => {
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(SessionsMonitoringContainer)
  })
  it('should render correctly', () => {
    const props = {
      params: {
        project: 'test1',
      },
      availableDependencies: [],
      deleteSession: () => { },
      relaunchProducts: () => { },
      relaunchAIP: () => { },
      relaunchSIP: () => { },
      fetchSessions: () => { },
      onRefresh: () => { },
      acknowledgeSessionState: () => { },
    }
    const enzymeWrapper = shallow(<SessionsMonitoringContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(SessionsMonitoringComponent)
    const wrapperInstance = enzymeWrapper.instance()
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      onBack: wrapperInstance.onBack,
      onAcknowledge: wrapperInstance.acknowledgeSessionState,
      onSort: wrapperInstance.onSort,
      columnsSorting: [{ columnKey: 'column.lastUpdateDate', order: 'DESCENDING_ORDER' }],
      columnsVisibility: {},
      requestParameters: { sort: [], state: [AccessDomain.SESSION_STATUS_ENUM.ERROR] },
      initialFilters: {
        source: '',
        session: '',
        lastSessionOnly: false,
        errorsOnly: true,
        from: null,
        to: null,
      },
      filtersEdited: false,
      canEmptyFilters: false,
      onApplyFilters: wrapperInstance.onApplyFilters,
      onClearFilters: wrapperInstance.onClearFilters,
      onChangeSource: wrapperInstance.onChangeSource,
      onChangeSession: wrapperInstance.onChangeSession,
      onToggleErrorsOnly: wrapperInstance.onToggleErrorsOnly,
      onToggleLastSession: wrapperInstance.onToggleLastSession,
      onChangeFrom: wrapperInstance.onChangeFrom,
      onChangeTo: wrapperInstance.onChangeTo,
      onChangeColumnsVisibility: wrapperInstance.onChangeColumnsVisibility,
      onDeleteProducts: wrapperInstance.onDeleteProducts,
      onClickListIndexed: wrapperInstance.onClickListIndexed,
      onClickListAIP: wrapperInstance.onClickListAIP,
      onClickListSIP: wrapperInstance.onClickListSIP,
      onClickRelaunchAIP: wrapperInstance.onClickRelaunchAIP,
      onClickRelaunchSIP: wrapperInstance.onClickRelaunchSIP,
      onRelaunchProducts: wrapperInstance.onRelaunchProducts,
    }, 'Component should define the expected properties')
  })
})
