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
import OkIcon from 'material-ui/svg-icons/action/done'
import DeletedIcon from 'material-ui/svg-icons/action/delete-forever'
import ErrorIcon from 'material-ui/svg-icons/alert/error'
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
  it('should render correctly OK state', () => {
    const props = {
      entity: {
        content: {
          id: 9,
          name: 'Name',
          source: 'Source 3',
          creationDate: '2019-07-30T08:38:27.177Z',
          lastUpdateDate: '2019-07-30T08:38:27.184Z',
          isLatest: true,
          state: 'OK',
          lifeCycle: {},
        },
        links: [],
      },
    }
    const enzymeWrapper = shallow(<SessionsMonitoringStateRenderer {...props} />, { context })
    const okIcon = enzymeWrapper.find(OkIcon)
    assert.lengthOf(okIcon, 1, 'There should be 1 OkIcon')
  })
  it('should render correctly ERROR state', () => {
    const props = {
      entity: {
        content: {
          id: 9,
          name: 'Name',
          source: 'Source 3',
          creationDate: '2019-07-30T08:38:27.177Z',
          lastUpdateDate: '2019-07-30T08:38:27.184Z',
          isLatest: true,
          state: 'ERROR',
          lifeCycle: {},
        },
        links: [],
      },
    }
    const enzymeWrapper = shallow(<SessionsMonitoringStateRenderer {...props} />, { context })
    const errorIcon = enzymeWrapper.find(ErrorIcon)
    assert.lengthOf(errorIcon, 1, 'There should be 1 ErrorIcon')
  })
  it('should render correctly DELETED state', () => {
    const props = {
      entity: {
        content: {
          id: 9,
          name: 'Name',
          source: 'Source 3',
          creationDate: '2019-07-30T08:38:27.177Z',
          lastUpdateDate: '2019-07-30T08:38:27.184Z',
          isLatest: true,
          state: 'DELETED',
          lifeCycle: {},
        },
        links: [],
      },
    }
    const enzymeWrapper = shallow(<SessionsMonitoringStateRenderer {...props} />, { context })
    const deletedIcon = enzymeWrapper.find(DeletedIcon)
    assert.lengthOf(deletedIcon, 1, 'There should be 1 DeletedIcon')
  })
})
