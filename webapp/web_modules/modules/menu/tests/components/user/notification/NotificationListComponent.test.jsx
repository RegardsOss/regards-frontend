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
import Chip from 'material-ui/Chip'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ShowableAtRender, PositionedDialog, TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { AdminClient } from '@regardsoss/client'
import NotificationListComponent from '../../../../src/components/user/notification/NotificationListComponent'
import styles from '../../../../src/styles/styles'
import NotificationTableContainer from '../../../../src/containers/user/notification/NotificationTableContainer'
import NotificationHeaderComponent from '../../../../src/components/user/notification/NotificationHeaderComponent'
import { NOTIFICATION_FILTERS_I18N } from '../../../../src/domain/filters'

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
  it('should render correctly with notifications', () => {
    const props = {
      registerNotify: () => { },
      readNotification: () => { },
      deleteNotifications: () => { },

      notificationActions: notificationPollerActions,
      notificationSelectors: notificationPollerSelectors,
      nbNotificationUnreadAndError: 2,
      isInstance: false,
      isLoading: false,
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

    enzymeWrapper.setState({ openedModal: true })

    // check that dialog is opened
    const dialogWrapper = enzymeWrapper.find(PositionedDialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be the notification dialog')

    const tableVisibilityWrapper = enzymeWrapper.find(TableFilterSortingAndVisibilityContainer)
    assert.lengthOf(tableVisibilityWrapper, 1, 'There should be one TableFilterSortingAndVisibilityContainer')
    testSuiteHelpers.assertWrapperProperties(tableVisibilityWrapper, {
      pageActions: props.notificationActions,
      pageSelectors: props.notificationSelectors,
      isPagePostFetching: true,
      onReadNotification: props.readNotification,
      onDeleteNotifications: props.deleteNotifications,
      filtersI18n: NOTIFICATION_FILTERS_I18N,
    })

    const headerWrapper = enzymeWrapper.find(NotificationHeaderComponent)
    assert.lengthOf(headerWrapper, 1, 'There should be a NotificationHeaderComponent')
    testSuiteHelpers.assertWrapperProperties(headerWrapper, {
      onCloseNotificationDialog: enzymeWrapper.instance().handleClose,
      isPaneOpened: true,
    })

    const tableWrapper = enzymeWrapper.find(NotificationTableContainer)
    assert.lengthOf(tableWrapper, 1, 'There should be a NotificationTableContainer')
    testSuiteHelpers.assertWrapperProperties(tableWrapper, {
      notificationActions: props.notificationActions,
      notificationSelectors: props.notificationSelectors,
      isLoading: props.isLoading,
    })
  })
})
