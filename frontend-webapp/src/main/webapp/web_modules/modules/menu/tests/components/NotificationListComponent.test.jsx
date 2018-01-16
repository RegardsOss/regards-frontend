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
import IconButton from 'material-ui/IconButton'
import Chip from 'material-ui/Chip'
import Dialog from 'material-ui/Dialog/Dialog'
import { ListItem, List } from 'material-ui/List'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ShowableAtRender } from '@regardsoss/components'
import NotificationListComponent from '../../src/components/NotificationListComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

const generateNotifications = (status, number, id = 0) => {
  let idToUse = id
  const notifications = []
  for (let i = 0; i < number; i += 1) {
    notifications.push({
      date: '2018-01-03T14:05:13.419Z',
      idToUse,
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
    idToUse += 1
  }
  return notifications
}

/**
 * Test NotificationListComponent
 * @author Maxime Bouveron
 */
describe('[Menu] Testing NotificationListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NotificationListComponent)
  })

  it('should render correctly without notifications', () => {
    const props = {
      readNotifications: [],
      unreadNotifications: [],
      newNotifications: [],
      readNotification: () => {},
      readAllNotifications: () => {},
    }
    const enzymeWrapper = shallow(<NotificationListComponent {...props} />, { context })

    // check that notification count is hidden
    const showableWrapper = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(
      showableWrapper,
      1,
      'There should be a showing / hide controller for the notification count component',
    )
    assert.isFalse(showableWrapper.props().show, 'It should be hiding the count when zero')
    const iconButtonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(iconButtonWrapper, 1, 'There should be an Icon Button for the notifications')
    assert.isTrue(
      iconButtonWrapper.props().disabled,
      "The Icon Button should be disabled when there isn't any notification",
    )

    // check that dialog is not opened
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 0, "There should'nt be the notification dialog")
  })

  it('should render correctly without unread notifications', () => {
    const props = {
      readNotifications: generateNotifications('READ', 2),
      unreadNotifications: [],
      newNotifications: [],
      readNotification: () => {},
      readAllNotifications: () => {},
    }
    const enzymeWrapper = shallow(<NotificationListComponent {...props} />, { context })

    // check that notification count is shown
    const showableWrapper = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(
      showableWrapper,
      1,
      'There should be a showing / hide controller for the notification count component',
    )
    assert.isFalse(
      showableWrapper.props().show,
      'It should be hidding the count when there is 0 new notifications',
    )

    enzymeWrapper.setState({ openedNotification: props.readNotifications[0] })

    // check that dialog is opened
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be the notification dialog')

    // check that unread list is hidden
    const listWrapper = enzymeWrapper.find(List)
    assert.lengthOf(listWrapper, 1, 'There should be only one notification list')

    // check that read list shows 2 notifications
    const listItemWrapper = enzymeWrapper.find(ListItem)
    assert.lengthOf(listItemWrapper, 2, 'There should be two notifications in notifications list')
  })

  it('should render correctly with notifications', () => {
    const props = {
      readNotifications: generateNotifications('READ', 2),
      unreadNotifications: generateNotifications('UNREAD', 2, 2),
      newNotifications: [],
      readNotification: () => {},
      readAllNotifications: () => {},
    }
    const enzymeWrapper = shallow(<NotificationListComponent {...props} />, { context })

    // check that notification count is shown
    const showableWrapper = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(
      showableWrapper,
      1,
      'There should be a showing / hide controller for the notification count component',
    )
    assert.isTrue(
      showableWrapper.props().show,
      'It should be showing the count when there is new notifications',
    )

    // check the chip label contains objectsCount count
    const chipWrapper = enzymeWrapper.find(Chip)
    assert.lengthOf(chipWrapper, 1, 'There should be a chip to show objectsCount')
    assert.include(chipWrapper.debug(), 2, 'The chip text should read 2')

    enzymeWrapper.setState({ openedNotification: props.unreadNotifications[0] })

    // check that dialog is opened
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be the notification dialog')

    // check that unread list is hidden
    const listWrapper = enzymeWrapper.find(List)
    assert.lengthOf(listWrapper, 2, 'There should be both notification lists')

    // check that read list shows 2 notifications
    const listItemWrapper = enzymeWrapper.find(ListItem)
    assert.lengthOf(listItemWrapper, 4, 'There should be four notifications in notifications list')
  })
})
