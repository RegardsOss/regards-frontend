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
import { AccessDomain } from '@regardsoss/domain'
import { DateValueRender } from '@regardsoss/components'
import { SessionsMonitoringLastModificationRenderer } from '../../../../src/components/session/render/SessionsMonitoringLastModificationRenderer'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SessionsMonitoringLastModificationRenderer
 * @author Kévin Picart
 */
describe('[ADMIN DATA PROVIDER MANAGEMENT] Testing SessionsMonitoringLastModificationRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SessionsMonitoringLastModificationRenderer)
  })
  it('should render correctly', () => {
    const props = {
      entity: {
        content: {
          id: 9,
          name: 'Name',
          source: 'Source 3',
          creationDate: '2019-07-30T08:38:27.177Z',
          lastUpdateDate: '2019-07-30T08:38:27.184Z',
          isLatest: true,
          state: AccessDomain.SESSION_STATUS_ENUM.ERROR,
          lifeCycle: {},
        },
        links: [
          {
            rel: 'update',
            href: 'http://localhost:3000/api/v1/rs-admin/sessions/9',
          },
          {
            rel: 'delete',
            href: 'http://localhost:3000/api/v1/rs-admin/sessions/9',
          },
        ],
      },
      onClickListIndexed: () => {},
    }
    const enzymeWrapper = shallow(<SessionsMonitoringLastModificationRenderer {...props} />, { context })
    const dateValueRender = enzymeWrapper.find(DateValueRender)
    assert.lengthOf(dateValueRender, 1, 'There should be 1 DateValueRender')
  })
})
