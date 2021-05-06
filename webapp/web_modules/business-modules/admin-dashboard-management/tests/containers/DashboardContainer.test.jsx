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
import { DashboardContainer } from '../../src/containers/DashboardContainer'
import styles from '../../src/styles'
import { CELL_TYPE_ENUM } from '../../src/domain/cellTypes'
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
        stepId: '0',
        source: 'Test_Source1',
        session: 'Test_Session1',
        type: 'ACQUISITION',
        in: 3,
        out: 3,
        state: {
          errors: 3,
          waiting: 2,
          running: 1,
        },
        properties: {},
        lastUpdate: '01/01/21',
      },
      {
        stepId: '0',
        source: 'Test_Source1',
        session: 'Test_Session1',
        type: 'REFERENCEMENT',
        in: 3,
        out: 3,
        state: {
          errors: 3,
          waiting: 2,
          running: 1,
        },
        properties: {},
        lastUpdate: '01/01/21',
      },
      {
        stepId: '0',
        source: 'Test_Source1',
        session: 'Test_Session1',
        type: 'STORAGE',
        in: 3,
        out: 3,
        state: {
          errors: 3,
          waiting: 2,
          running: 1,
        },
        properties: {},
        lastUpdate: '01/01/21',
      },
      {
        stepId: '0',
        source: 'Test_Source1',
        session: 'Test_Session1',
        type: 'DISSEMINATION',
        in: 3,
        out: 3,
        state: {
          errors: 3,
          waiting: 2,
          running: 1,
        },
        properties: {},
        lastUpdate: '01/01/21',
      },
    ],
    managerState: {
      running: true,
      error: true,
      waiting: true,
    },
  },
  links: [],
}

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
  it('should render correctly without a selected session', () => {
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
      fetchSessions: () => { },
      fetchSources: () => { },
      relaunchProducts: () => { },
      relaunchAIP: () => { },
      retryRequests: () => { },
      deleteSession: () => { },
    }
    const enzymeWrapper = shallow(<DashboardContainer {...props} />, { context })

    const cardWrapper = enzymeWrapper.find(Card)
    assert.lengthOf(cardWrapper, 1, 'There should be a Card')

    const cardActionWrapper = enzymeWrapper.find(CardActionsComponent)
    assert.lengthOf(cardActionWrapper, 1, 'There should be a CardActionsComponent')

    const sourceComponentWrapper = enzymeWrapper.find(SourcesComponent)
    assert.lengthOf(sourceComponentWrapper, 1, 'There should be a SourcesComponent')
    testSuiteHelpers.assertWrapperProperties(sourceComponentWrapper, {
      project: props.params.project,
      onSelected: enzymeWrapper.instance().onSelected,
      selectedSource: enzymeWrapper.instance().state.selectedSource,
      onApplyFilters: enzymeWrapper.instance().onApplyFilters,
      sourceFilters: enzymeWrapper.instance().state[CELL_TYPE_ENUM.SOURCE],
    }, 'Component should define the expected properties')

    const sessionComponentWrapper = enzymeWrapper.find(SessionsComponent)
    assert.lengthOf(sessionComponentWrapper, 1, 'There should be a SessionsComponent')
    testSuiteHelpers.assertWrapperProperties(sessionComponentWrapper, {
      project: props.params.project,
      onSelected: enzymeWrapper.instance().onSelected,
      selectedSession: enzymeWrapper.instance().state.selectedSession,
      onApplyFilters: enzymeWrapper.instance().onApplyFilters,
      sessionFilters: enzymeWrapper.instance().state[CELL_TYPE_ENUM.SESSION],
    }, 'Component should define the expected properties')

    const selectedSessionWrapper = enzymeWrapper.find(SelectedSessionComponent)
    assert.lengthOf(selectedSessionWrapper, 0, 'There should not be a SelectedSessionComponent')
  })

  it('should render correctly with a selected session', () => {
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
      fetchSessions: () => { },
      fetchSources: () => { },
      relaunchProducts: () => { },
      relaunchAIP: () => { },
      retryRequests: () => { },
      deleteSession: () => { },
    }
    const enzymeWrapper = shallow(<DashboardContainer {...props} />, { context })
    enzymeWrapper.instance().onSelected(selectedSession, CELL_TYPE_ENUM.SESSION)

    const selectedSessionWrapper = enzymeWrapper.find(SelectedSessionComponent)
    assert.lengthOf(selectedSessionWrapper, 1, 'There should be a SelectedSessionComponent')
  })
})
