/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { SessionsMonitoringSessionRenderer } from '../../../../src/components/session/render/SessionsMonitoringSessionRenderer'
import styles from '../../../../src/styles'
import { dumpSessions } from '../../../dumps/sessions.dump'

const context = buildTestContext(styles)

/**
 * Test SessionsMonitoringSessionRenderer
 * @author Kévin Picart
 */
describe('[ADMIN DATA-PROVIDER MANAGEMENT] Testing SessionsMonitoringSessionRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SessionsMonitoringSessionRenderer)
  })
  it('should render correctly', () => {
    const props = {
      entity: dumpSessions[0],
    }
    const enzymeWrapper = shallow(<SessionsMonitoringSessionRenderer {...props} />, { context })
    // TODO test
  })
})
