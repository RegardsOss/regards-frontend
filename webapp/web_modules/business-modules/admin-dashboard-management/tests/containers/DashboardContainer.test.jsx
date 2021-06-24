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
 * REGARDS is distributed inputRelated the hope that it will be useful,
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
import DashboardComponent from '../../src/components/DashboardComponent'
import { DashboardContainer } from '../../src/containers/DashboardContainer'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test DashboardContainer
 * @author Théo Lasserre
 */
describe('[ADMIN DASHBOARD MANAGEMENT] Testing DashboardContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DashboardContainer)
  })
  it('should render correctly', () => {
    const props = {
      params: {
        project: 'any',
      },
      sessionsMeta: {
        number: 20,
      },
      sourcesMeta: {
        number: 20,
      },
      sources: {},
      sessions: {},
      fetchSessions: () => { },
      fetchSources: () => { },
      relaunchProducts: () => { },
      relaunchAIP: () => { },
      retryRequests: () => { },
      deleteSession: () => { },
      fetchSelectedSession: () => { },
      flushSelectedSession: () => { },
      relaunchStorages: () => { },
    }
    const enzymeWrapper = shallow(<DashboardContainer {...props} />, { context })

    const dashboardComponentWrapper = enzymeWrapper.find(DashboardComponent)
    assert.lengthOf(dashboardComponentWrapper, 1, 'There should be a DashboardComponent')
    testSuiteHelpers.assertWrapperProperties(dashboardComponentWrapper, {
      project: props.params.project,
      relaunchProducts: props.relaunchProducts,
      relaunchAIP: props.relaunchAIP,
      retryRequests: props.retryRequests,
      fetchSelectedSource: enzymeWrapper.instance().fetchSelectedSource,
      fetchSelectedSession: enzymeWrapper.instance().fetchSelectedSession,
      deleteSession: enzymeWrapper.instance().onDeleteSession,
      selectedSession: enzymeWrapper.instance().state.selectedSession,
      selectedSource: enzymeWrapper.instance().state.selectedSource,
      onRefreshSelectedSession: enzymeWrapper.instance().onRefreshSelectedSession,
      getBackURL: enzymeWrapper.instance().getBackURL,
      onRefresh: enzymeWrapper.instance().onRefresh,
      relaunchStorages: props.relaunchStorages,
      sources: props.sources,
      sessions: props.sessions,
      flushSelectedSource: enzymeWrapper.instance().flushSelectedSource,
    }, 'Component should define the expected properties')
  })
})
