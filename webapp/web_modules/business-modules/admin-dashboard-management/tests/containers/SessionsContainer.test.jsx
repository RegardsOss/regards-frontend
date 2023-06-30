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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SessionsComponent from '../../src/components/SessionsComponent'
import { SessionsContainer } from '../../src/containers/SessionsContainer'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SessionsContainer
 * @author Théo Lasserre
 */
describe('[ADMIN DASHBOARD MANAGEMENT] Testing SessionsContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SessionsContainer)
  })
  it('should render correctly', () => {
    const props = {
      project: 'testProject',
      onSelected: () => { },
      // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
      filters: {},
      selectedSessionId: 'session',
      selectedSourceId: 'source',
      fetchSelectedSession: () => { },
      sessions: {},
      throwError: () => { },
    }
    const enzymeWrapper = shallow(<SessionsContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(SessionsComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      project: props.project,
      onSelected: props.onSelected,
      sessions: props.sessions,
      filters: props.filters,
      selectedSourceId: props.selectedSourceId,
      selectedSessionId: props.selectedSessionId,
    }, 'Component should define the expected properties')
  })
})
