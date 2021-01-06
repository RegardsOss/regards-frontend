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
import { AccessDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SessionsMonitoringStateRenderer } from '../../../../src/components/session/render/SessionsMonitoringStateRenderer'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SessionsMonitoringStateRenderer
 * @author Kévin Picart
 */
describe('[ADMIN DATA PROVIDER MANAGEMENT] Testing SessionsMonitoringStateRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SessionsMonitoringStateRenderer)
  })
  AccessDomain.SESSION_STATUS.forEach((state) => it(`should render correctly in state ${state}`, () => {
    const props = {
      entity: {
        content: {
          id: 9,
          name: 'Name',
          source: 'Source 3',
          creationDate: '2019-07-30T08:38:27.177Z',
          lastUpdateDate: '2019-07-30T08:38:27.184Z',
          isLatest: true,
          state,
          lifeCycle: {},
        },
        links: [],
      },
    }
    const enzymeWrapper = shallow(<SessionsMonitoringStateRenderer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(SessionsMonitoringStateRenderer.STATUS_ICON_CONSTRUCTOR[state]), 1, 'There should be status icon')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().title === `acquisition-sessions.state.${state}`), 1,
      'State should be rendered as internationalized tooltip')
  }))
})
