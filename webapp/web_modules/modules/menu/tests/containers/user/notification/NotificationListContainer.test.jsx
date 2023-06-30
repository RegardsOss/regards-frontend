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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ShowableAtRender } from '@regardsoss/display-control'
import NotificationListComponent from '../../../../src/components/user/notification/NotificationListComponent'
import { NotificationListContainer } from '../../../../src/containers/user/notification/NotificationListContainer'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

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
      fetchLastNotification: () => { },
      sendReadNotification: () => { },
      markAllNotificationRead: () => { },
      fetchNotification: () => { },
      fetchLastReadNotification: () => { },
      deleteReadNotifications: () => { },

      project: 'project1',

      // from mapStateToProps
      lastNotification: {},
      lastReadNotification: {},
      nbNotification: 14,
      nbReadNotification: 42,
      notificationMetadata: {
        number: 3,
        size: 3,
        totalElements: 3,
        totalPages: 3,
      },
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
})
