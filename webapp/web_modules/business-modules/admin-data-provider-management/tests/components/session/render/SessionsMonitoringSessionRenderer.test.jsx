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
import { MenuItem } from 'material-ui'
import { DropDownButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SessionsMonitoringSessionRenderer } from '../../../../src/components/session/render/SessionsMonitoringSessionRenderer'
import styles from '../../../../src/styles'

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
      onShowAcknowledge: () => {},
      onShowDeleteConfirm: () => {},
    }
    const enzymeWrapper = shallow(<SessionsMonitoringSessionRenderer {...props} />, { context })
    const dropDownButton = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDownButton, 1, 'There should be 1 DropDownButton')
    const menuItem = enzymeWrapper.find(MenuItem)
    assert.lengthOf(menuItem, 2, 'There should be 2 MenuItem')
  })
  it('should render correctly DELETED', () => {
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
      onShowAcknowledge: () => {},
      onShowDeleteConfirm: () => {},
    }
    const enzymeWrapper = shallow(<SessionsMonitoringSessionRenderer {...props} />, { context })
    const dropDownButton = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDownButton, 1, 'There should be 1 DropDownButton')
    const menuItem = enzymeWrapper.find(MenuItem)
    assert.lengthOf(menuItem, 1, 'There should be 1 MenuItem')
  })
  it('should render correctly OK', () => {
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
      onShowAcknowledge: () => {},
      onShowDeleteConfirm: () => {},
    }
    const enzymeWrapper = shallow(<SessionsMonitoringSessionRenderer {...props} />, { context })
    const dropDownButton = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDownButton, 1, 'There should be 1 DropDownButton')
    const menuItem = enzymeWrapper.find(MenuItem)
    assert.lengthOf(menuItem, 1, 'There should be 1 MenuItem')
  })
})
