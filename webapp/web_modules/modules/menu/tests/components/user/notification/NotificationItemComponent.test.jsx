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
import NotificationItemComponent from '../../../../src/components/user/notification/NotificationItemComponent'
import styles from '../../../../src/styles'
import NotificationIcon from '../../../../src/components/user/notification/NotificationIcon'
import FormattedNotificationDate from '../../../../src/components/user/notification/FormattedNotificationDate'
import { generateNotification } from '../../../dumps/notification.dump'

const context = buildTestContext(styles)

/**
 * Test NotificationItemComponent
 * @author Raphaël Mechali
 */
describe('[Menu] Testing NotificationItemComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NotificationItemComponent)
  })

  const testCases = [{
    entity: { content: generateNotification('READ', 1) },
    currentActiveEntity: generateNotification('READ', 1),
    title: 'selected and read',
  }, {
    entity: { content: generateNotification('UNREAD', 1) },
    currentActiveEntity: generateNotification('UNREAD', 1),
    title: 'selected and unread',
  }, {
    entity: { content: generateNotification('UNREAD', 1) },
    currentActiveEntity: generateNotification('UNREAD', 2),
    title: 'unselected and unread',
  }, {
    entity: { content: generateNotification('READ', 1) },
    currentActiveEntity: generateNotification('READ', 2),
    title: 'unselected and read',
  }]
  testCases.forEach(({ entity, currentActiveEntity, title }) => it(`Should render correctly when ${title}`, () => {
    const props = {
      entity,
      currentActiveEntity,
      handleOpenNotif: () => {},
    }
    const enzymeWrapper = shallow(<NotificationItemComponent {...props} />, { context })
    const icon = enzymeWrapper.find(NotificationIcon)
    assert.lengthOf(icon, 1, 'There should be the notification icon')
    assert.equal(icon.props().notification, props.entity.content, 'Icon notification should be correctly set')

    const dateWrapper = enzymeWrapper.find(FormattedNotificationDate)
    assert.lengthOf(dateWrapper, 1, 'There should be the notification icon')
    assert.equal(dateWrapper.props().notification, props.entity.content, 'Date wrapper notification should be correctly set')

    assert.include(enzymeWrapper.debug(), props.entity.content.title, 'Notification title should be shown')
  }))
})
