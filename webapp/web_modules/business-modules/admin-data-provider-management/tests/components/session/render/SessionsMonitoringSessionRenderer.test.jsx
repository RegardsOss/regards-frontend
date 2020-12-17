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
import MenuItem from 'material-ui/MenuItem'
import { AccessDomain } from '@regardsoss/domain'
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
  function createEntity(name, state = AccessDomain.SESSION_STATUS_ENUM.OK) {
    return {
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
    }
  }
  const testCases = [{
    testLabel: 'without option (no dependency)',
    entity: createEntity('session1', AccessDomain.SESSION_STATUS_ENUM.DELETED),
    hasAck: false,
    hasDelete: false,
    dependencies: [],
  }, {
    testLabel: 'with delete option',
    entity: createEntity('session2', AccessDomain.SESSION_STATUS_ENUM.OK),
    hasAck: false,
    hasDelete: true,
    dependencies: [...SessionsMonitoringSessionRenderer.DELETE_DEPENDENCIES],
  }, {
    testLabel: 'with ack option',
    entity: createEntity('session1', AccessDomain.SESSION_STATUS_ENUM.ERROR),
    hasAck: true,
    hasDelete: false,
    dependencies: [...SessionsMonitoringSessionRenderer.ACK_DEPENDENCIES],
  }, {
    testLabel: 'with all options',
    entity: createEntity('session1', AccessDomain.SESSION_STATUS_ENUM.ERROR),
    hasAck: true,
    hasDelete: true,
    dependencies: [...SessionsMonitoringSessionRenderer.ACK_DEPENDENCIES, ...SessionsMonitoringSessionRenderer.DELETE_DEPENDENCIES],
  }]
  testCases.forEach(({
    testLabel, entity,
    hasAck, hasDelete,
    dependencies,
  }) => it(`should render correctly ${testLabel}`, () => {
    const props = {
      entity,
      availableDependencies: dependencies,
      onShowAcknowledge: () => {},
      onShowDeleteConfirm: () => {},
    }
    const enzymeWrapper = shallow(<SessionsMonitoringSessionRenderer {...props} />, { context })
    // 1 - Check options
    const dropDownMenu = enzymeWrapper.find(DropDownButton)
    if (hasAck || hasDelete) {
      // 1.a - Check menu then options in menu
      assert.lengthOf(dropDownMenu, 1, 'Menu should be shown')
      const menuItems = dropDownMenu.find(MenuItem)
      const instance = enzymeWrapper.instance()
      if (hasAck) {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onShowAcknowledgeDialog), 1, 'There should be ACK option')
      } else {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onShowAcknowledgeDialog), 0, 'There should not be ACK option')
      }
      if (hasDelete) {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onDeleteSession), 1, 'There should be delete option')
      } else {
        assert.lengthOf(menuItems.findWhere((n) => n.props().onClick === instance.onDeleteSession), 0, 'There should not be delete option')
      }
    } else {
      // 1.b - Check menu is not displayed
      assert.lengthOf(dropDownMenu, 0, 'Menu should not be shown')
    }
    // 2 - Check session name is rendered
    const asText = enzymeWrapper.debug()
    assert.include(asText, entity.content.name)
  }))
})
