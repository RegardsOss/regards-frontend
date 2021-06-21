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
import { CardActionsComponent } from '@regardsoss/components'
import {
  Card,
} from 'material-ui/Card'
import SourcesComponent from '../../src/components/SourcesComponent'
import SessionsComponent from '../../src/components/SessionsComponent'
import DashboardComponent from '../../src/components/DashboardComponent'
import styles from '../../src/styles'
import SelectedSessionComponent from '../../src/components/SelectedSessionComponent'

const context = buildTestContext(styles)

const selectedSession = {
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
        id: 0,
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
        id: 0,
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
        id: 0,
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
}

/**
 * Test DashboardComponent
 * @author Théo Lasserre
 */
describe('[ADMIN DASHBOARD MANAGEMENT] Testing DashboardComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DashboardComponent)
  })
  it('should render correctly without a selected session', () => {
    const props = {
      project: 'any',
      relaunchProducts: () => { },
      relaunchAIP: () => { },
      retryRequests: () => { },
      deleteSession: () => { },
      selectedSession: null,
      selectedSource: null,
      fetchSelectedSession: () => { },
      fetchSelectedSource: () => { },
      getBackURL: () => { },
      onRefresh: () => { },
      onFlushSelectedSession: () => { },
    }
    const enzymeWrapper = shallow(<DashboardComponent {...props} />, { context })
    const cardWrapper = enzymeWrapper.find(Card)
    assert.lengthOf(cardWrapper, 1, 'There should be a Card')

    const cardActionWrapper = enzymeWrapper.find(CardActionsComponent)
    assert.lengthOf(cardActionWrapper, 1, 'There should be a CardActionsComponent')

    const sourceComponentWrapper = enzymeWrapper.find(SourcesComponent)
    assert.lengthOf(sourceComponentWrapper, 1, 'There should be a SourcesComponent')
    testSuiteHelpers.assertWrapperProperties(sourceComponentWrapper, {
      project: props.project,
      onSelected: enzymeWrapper.instance().onSelected,
      selectedSource: props.selectedSource,
      selectedSession: props.selectedSession,
      onApplyFilters: enzymeWrapper.instance().onApplyFilters,
    }, 'Component should define the expected properties')

    const sessionComponentWrapper = enzymeWrapper.find(SessionsComponent)
    assert.lengthOf(sessionComponentWrapper, 1, 'There should be a SessionsComponent')
    testSuiteHelpers.assertWrapperProperties(sessionComponentWrapper, {
      project: props.project,
      onSelected: enzymeWrapper.instance().onSelected,
      selectedSession: props.selectedSession,
      onApplyFilters: enzymeWrapper.instance().onApplyFilters,
    }, 'Component should define the expected properties')

    const selectedSessionWrapper = enzymeWrapper.find(SelectedSessionComponent)
    assert.lengthOf(selectedSessionWrapper, 0, 'There should not be a SelectedSessionComponent')
  })
  it('should render correctly with a selected session', () => {
    const props = {
      project: 'any',
      relaunchProducts: () => { },
      relaunchAIP: () => { },
      retryRequests: () => { },
      deleteSession: () => { },
      selectedSession,
      selectedSource: null,
      fetchSelectedSession: () => { },
      fetchSelectedSource: () => { },
      getBackURL: () => { },
      onRefresh: () => { },
      onFlushSelectedSession: () => { },
    }
    const enzymeWrapper = shallow(<DashboardComponent {...props} />, { context })

    const selectedSessionWrapper = enzymeWrapper.find(SelectedSessionComponent)
    assert.lengthOf(selectedSessionWrapper, 1, 'There should be a SelectedSessionComponent')
    testSuiteHelpers.assertWrapperProperties(selectedSessionWrapper, {
      project: props.project,
      selectedSession: props.selectedSession,
      onSelected: enzymeWrapper.instance().onSelected,
      relaunchProducts: props.relaunchProducts,
      relaunchAIP: props.relaunchAIP,
      retryRequests: props.retryRequests,
      deleteSession: enzymeWrapper.instance().onDeleteSession,
      sourceFilters: enzymeWrapper.instance().state.sourceFilters,
      sessionFilters: enzymeWrapper.instance().state.sessionFilters,
    }, 'Component should define the expected properties')
  })
})
