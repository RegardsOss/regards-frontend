/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ShowableAtRender } from '@regardsoss/display-control'
import NotificationListComponent from '../../../src/components/user/NotificationListComponent'
import { NotificationListContainer } from '../../../src/containers/user/NotificationListContainer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

const getNotifications = (unread, read) => {
  const makeNotif = (status, id) => ({
    date: '2018-01-03T14:05:13.419Z',
    id,
    message: 'message',
    projectUserRecipients: [],
    roleRecipients: [
      {
        id: 4,
        name: 'PROJECT_ADMIN',
        authorizedAddresses: [],
        isDefault: false,
        isNative: true,
      },
    ],
    sender: 'microservice',
    status,
    type: 'INFO',
    title: 'Title',
  })
  const notifications = {}
  let id = 0
  const array = [...Array(unread).fill('UNREAD'), ...Array(read).fill('READ')]

  array.forEach((status) => {
    notifications[id] = makeNotif(status, id)
    id += 1
  })
  return notifications
}

/**
 * Test NotificationListContainer
 * @author Maxime Bouveron
 */
describe('[Menu] Testing NotificationListContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NotificationListContainer)
  })

  it('should render correctly, showing the sub component only when the user is authenticated', () => {
    const props = {
      notifications: {},
      isAuthenticated: false,
      fetchNotifications: () => { },
      sendReadNotification: () => { },
    }
    const enzymeWrapper = shallow(<NotificationListContainer {...props} />, { context })
    let showableWrapper = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(
      showableWrapper,
      1,
      'The showable component should be used to switch visible component state',
    )
    assert.isFalse(
      showableWrapper.props().show,
      'The showable component should be hiding component',
    )
    let componentWrapper = enzymeWrapper.find(NotificationListComponent)
    assert.lengthOf(componentWrapper, 1, 'The component should be rendered')

    enzymeWrapper.setProps({ isAuthenticated: true })
    showableWrapper = enzymeWrapper.find(ShowableAtRender)
    assert.isTrue(
      showableWrapper.props().show,
      'The showable component should be displaying component',
    )

    componentWrapper = enzymeWrapper.find(NotificationListComponent)
    assert.deepEqual(
      componentWrapper.props().unreadNotifications,
      [],
      'Container should provide unread notifications array',
    )
    assert.deepEqual(
      componentWrapper.props().readNotifications,
      [],
      'Container should provide read notifications array',
    )
    assert.equal(
      componentWrapper.props().readAllNotifications,
      enzymeWrapper.instance().readAllNotifications,
      'Container should provide read all notificatons method',
    )
    assert.equal(
      componentWrapper.props().readNotification,
      enzymeWrapper.instance().readNotification,
      'Container should provide read notification method',
    )
    assert.equal(
      componentWrapper.props().registerNotify,
      enzymeWrapper.instance().registerNotify,
      'Container should provide register notify method',
    )
  })

  it('should filter notifications', () => {
    const props = {
      notifications: {},
      isAuthenticated: true,
      fetchNotifications: () => { },
      sendReadNotification: () => { },
    }
    const enzymeWrapper = shallow(<NotificationListContainer {...props} />, { context })

    const testFilter = (unread, read) => {
      enzymeWrapper.setProps({
        notifications: getNotifications(unread, read),
      })

      assert.lengthOf(
        enzymeWrapper.instance().unreadNotifications,
        unread,
        `Container should find ${unread} unread notifications`,
      )
      assert.lengthOf(
        enzymeWrapper.instance().readNotifications,
        read,
        `Container should find ${read} read notifications`,
      )
    }

    testFilter(2, 2)
    testFilter(0, 4)
    testFilter(4, 0)
    testFilter(0, 0)
  })

  it('should find new notifications', () => {
    const props = {
      notifications: {},
      isAuthenticated: true,
      fetchNotifications: () => { },
      sendReadNotification: () => { },
    }
    const enzymeWrapper = shallow(<NotificationListContainer {...props} />, {
      context,
    })

    // register a notify method which simply increment a variable
    enzymeWrapper.instance().registerNotify((notification) => {
      enzymeWrapper.instance().newNotifCount = enzymeWrapper.instance().newNotifCount
        ? (enzymeWrapper.instance().newNotifCount += 1)
        : 1
    })

    assert.isUndefined(
      enzymeWrapper.instance().newNotifCount,
      "Container shouln't find any new notification",
    )

    enzymeWrapper.setProps({
      notifications: getNotifications(1, 0),
    })

    // add 4 because the first one will be equal to the one already in props
    enzymeWrapper.instance().componentWillReceiveProps({ notifications: getNotifications(4, 1) })

    assert.equal(
      enzymeWrapper.instance().newNotifCount,
      3,
      'Container should find 3 new notifications',
    )
  })
})
