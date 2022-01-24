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
import { CardActionsComponent } from '@regardsoss/components'
import {
  Card,
} from 'material-ui/Card'
import SourcesContainer from '../../src/containers/SourcesContainer'
import SessionsContainer from '../../src/containers/SessionsContainer'
import DashboardComponent from '../../src/components/DashboardComponent'
import styles from '../../src/styles'
import SelectedSessionContainer from '../../src/containers/SelectedSessionContainer'

const context = buildTestContext(styles)

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
  it('should render correctly', () => {
    const props = {
      project: 'any',
      relaunchProducts: () => { },
      relaunchAIP: () => { },
      relaunchStorages: () => { },
      retryWorkerRequests: () => { },
      deleteSession: () => { },
      fetchSelectedSession: () => { },
      getBackURL: () => { },
      onRefresh: () => { },
      retryFEMRequests: () => { },
      flushSelectedSession: () => { },
    }
    const enzymeWrapper = shallow(<DashboardComponent {...props} />, { context })
    const cardWrapper = enzymeWrapper.find(Card)
    assert.lengthOf(cardWrapper, 1, 'There should be a Card')

    const cardActionWrapper = enzymeWrapper.find(CardActionsComponent)
    assert.lengthOf(cardActionWrapper, 1, 'There should be a CardActionsComponent')

    const sourceComponentWrapper = enzymeWrapper.find(SourcesContainer)
    assert.lengthOf(sourceComponentWrapper, 1, 'There should be a SourcesContainer')
    testSuiteHelpers.assertWrapperProperties(sourceComponentWrapper, {
      project: props.project,
      onSelected: enzymeWrapper.instance().onSelected,
      selectedSource: enzymeWrapper.instance().state.selectedSource,
      selectedSession: enzymeWrapper.instance().state.selectedSession,
      onApplyFilters: enzymeWrapper.instance().onApplyFilters,
      filters: enzymeWrapper.instance().state.sourceFilters,
    }, 'Component should define the expected properties')

    const sessionComponentWrapper = enzymeWrapper.find(SessionsContainer)
    assert.lengthOf(sessionComponentWrapper, 1, 'There should be a SessionsContainer')
    testSuiteHelpers.assertWrapperProperties(sessionComponentWrapper, {
      project: props.project,
      onSelected: enzymeWrapper.instance().onSelected,
      selectedSession: enzymeWrapper.instance().state.selectedSession,
      onApplyFilters: enzymeWrapper.instance().onApplyFilters,
      selectedSource: enzymeWrapper.instance().state.selectedSource,
      filters: enzymeWrapper.instance().state.sessionFilters,
    }, 'Component should define the expected properties')

    const selectedSessionWrapper = enzymeWrapper.find(SelectedSessionContainer)
    assert.lengthOf(selectedSessionWrapper, 1, 'There should be a SelectedSessionContainer')
    testSuiteHelpers.assertWrapperProperties(selectedSessionWrapper, {
      project: props.project,
      onSelected: enzymeWrapper.instance().onSelected,
      relaunchProducts: props.relaunchProducts,
      relaunchAIP: props.relaunchAIP,
      retryWorkerRequests: props.retryWorkerRequests,
      relaunchStorages: props.relaunchStorages,
      deleteSession: props.deleteSession,
      retryFEMRequests: props.retryFEMRequests,
    }, 'Component should define the expected properties')
  })
})
