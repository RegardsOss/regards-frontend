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
import IconButton from 'material-ui/IconButton'
import Chip from 'material-ui/Chip'
import Dialog from 'material-ui/Dialog/Dialog'
import { List } from 'material-ui/List'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ShowableAtRender, PositionedDialog, PageableInfiniteTableContainer } from '@regardsoss/components'
import { AdminClient } from '@regardsoss/client'
import NotificationListComponent from '../../../../src/components/user/notification/NotificationListComponent'
import styles from '../../../../src/styles/styles'
import { generateNotification } from '../../../dumps/notification.dump'

const context = buildTestContext(styles)
const namespacePoller = 'menu/notification'
const notificationPollerActions = new AdminClient.NotificationActions(namespacePoller)
const notificationPollerSelectors = AdminClient.getNotificationSelectors(['modules.menu', 'notificationPoller'])

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
      registerNotify: () => { },
      readNotification: () => { },
      readAllNotifications: () => { },

      notificationActions: notificationPollerActions,
      notificationSelectors: notificationPollerSelectors,
      nbNotification: 0,
      lastNotification: generateNotification('UNREAD', 2),
      nbReadNotification: 0,
      lastReadNotification: null,
      isInstance: false,
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
      registerNotify: () => { },
      readNotification: () => { },
      readAllNotifications: () => { },

      notificationActions: notificationPollerActions,
      notificationSelectors: notificationPollerSelectors,
      nbNotification: 3,
      lastNotification: null,
      nbReadNotification: 5,
      lastReadNotification: generateNotification('UNREAD', 2),
      isInstance: false,
    }
    const enzymeWrapper = shallow(<NotificationListComponent {...props} />, { context })

    // check that notification count is shown
    const showableWrapper = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(
      showableWrapper,
      1,
      'There should be a showing / hide controller for the notification count component',
    )

    enzymeWrapper.setState({ openedNotification: props.lastReadNotification })

    // check that dialog is opened
    const dialogWrapper = enzymeWrapper.find(PositionedDialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be the notification dialog')

    // check that unread list is hidden
    const listWrapper = enzymeWrapper.find(List)
    assert.lengthOf(listWrapper, 2, 'There should be only one notification list')

    // check that read list shows 2 notifications
    const infiniteTableWrapper = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(infiniteTableWrapper, 1, 'There should be one infinite table')
  })

  it('should render correctly with notifications', () => {
    const props = {
      registerNotify: () => { },
      readNotification: () => { },
      readAllNotifications: () => { },

      notificationActions: notificationPollerActions,
      notificationSelectors: notificationPollerSelectors,
      nbNotification: 2,
      lastNotification: null,
      nbReadNotification: 5,
      lastReadNotification: generateNotification('UNREAD', 2),
      isInstance: false,
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

    enzymeWrapper.setState({ openedNotification: props.lastReadNotification })

    // check that dialog is opened
    const dialogWrapper = enzymeWrapper.find(PositionedDialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be the notification dialog')

    // check that unread list is hidden
    const listWrapper = enzymeWrapper.find(List)
    assert.lengthOf(listWrapper, 2, 'There should be both notification lists')

    // check that read list shows 2 notifications
    const infiniteTableWrapper = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(infiniteTableWrapper, 1, 'There should be one infinite table')
  })
})
