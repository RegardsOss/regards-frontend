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
      selectedSession: {
        content: {
          id: 0,
          source: 'Test_Source1',
          name: 'Test_Session1',
          creationDate: '01/01/21',
          lastUpdateDate: '01/01/21',
          steps: [
            {
              id: 0,
              stepId: 'scan',
              source: 'Test_Source1',
              session: 'Test_Session1',
              type: 'ACQUISITION',
              inputRelated: 3,
              outputRelated: 3,
              state: {
                errors: 3,
                waiting: 2,
                running: 1,
              },
              properties: {},
              lastUpdateDate: '01/01/21',
            },
            {
              id: 1,
              stepId: 'oais',
              source: 'Test_Source1',
              session: 'Test_Session1',
              type: 'REFERENCING',
              inputRelated: 3,
              outputRelated: 3,
              state: {
                errors: 3,
                waiting: 2,
                running: 1,
              },
              properties: {},
              lastUpdateDate: '01/01/21',
            },
            {
              id: 2,
              stepId: 'storage',
              source: 'Test_Source1',
              session: 'Test_Session1',
              type: 'STORAGE',
              inputRelated: 3,
              outputRelated: 3,
              state: {
                errors: 3,
                waiting: 2,
                running: 1,
              },
              properties: {},
              lastUpdateDate: '01/01/21',
            },
            {
              id: 3,
              stepId: 'metacatalog',
              source: 'Test_Source1',
              session: 'Test_Session1',
              type: 'DISSEMINATION',
              inputRelated: 3,
              outputRelated: 3,
              state: {
                errors: 3,
                waiting: 2,
                running: 1,
              },
              properties: {},
              lastUpdateDate: '01/01/21',
            },
          ],
          managerState: {
            running: true,
            errors: true,
            waiting: true,
          },
        },
        links: [],
      },
      fetchSessions: () => { },
      fetchSources: () => { },
      relaunchProducts: () => { },
      relaunchStorages: () => { },
      relaunchAIP: () => { },
      retryFEMRequests: () => { },
      retryWorkerRequests: () => { },
      fetchSelectedSession: () => { },
      flushSelectedSession: () => { },
      displayMessage: () => { },
    }
    const enzymeWrapper = shallow(<DashboardContainer {...props} />, { context })

    const dashboardComponentWrapper = enzymeWrapper.find(DashboardComponent)
    assert.lengthOf(dashboardComponentWrapper, 1, 'There should be a DashboardComponent')
    testSuiteHelpers.assertWrapperProperties(dashboardComponentWrapper, {
      project: props.params.project,
      relaunchProducts: enzymeWrapper.instance().onRelaunchProducts,
      relaunchAIP: enzymeWrapper.instance().onRelaunchAIP,
      retryWorkerRequests: enzymeWrapper.instance().onRetryWorkerRequests,
      relaunchStorages: enzymeWrapper.instance().onRelaunchStorages,
      getBackURL: enzymeWrapper.instance().getBackURL,
      onRefresh: enzymeWrapper.instance().onRefresh,
      fetchSelectedSession: props.fetchSelectedSession,
      retryFEMRequests: enzymeWrapper.instance().onRetryFEMRequests,
      flushSelectedSession: props.flushSelectedSession,
    }, 'Component should define the expected properties')
  })
})
