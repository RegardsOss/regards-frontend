/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { CardHeader } from 'material-ui/Card'
import { MIME_TYPES } from '@regardsoss/mime-types'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import NotificationDetailComponent from '../../../../src/components/user/notification/NotificationDetailComponent'
import FormattedNotificationDate from '../../../../src/components/user/notification/FormattedNotificationDate'
import styles from '../../../../src/styles'
import { aNotif } from '../../../dumps/notification.dump'

const context = buildTestContext(styles)

/**
 * Test NotificationDetailComponent
 * @author Raphaël Mechali
 */
describe('[Menu] Testing NotificationDetailComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NotificationDetailComponent)
  })
  it('should render correctly with HTML MIME type', () => {
    const props = {
      notification: {
        ...aNotif,
        mimeType: MIME_TYPES.HTML_MIME_TYPE,
      },
    }
    const enzymeWrapper = shallow(<NotificationDetailComponent {...props} />, { context })
    // expected: find a div with dangerouslySetInnerHTML field
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().dangerouslySetInnerHTML), 1)
    // date
    const dateWrapper = enzymeWrapper.find(FormattedNotificationDate)
    assert.lengthOf(dateWrapper, 1, 'There should be notification date')
    // title
    const cardHeaderWrapper = enzymeWrapper.find(CardHeader)
    assert.lengthOf(cardHeaderWrapper, 1, 'There should be the card wrapper')
    assert.equal(cardHeaderWrapper.props().title, props.notification.title, 'Notification title should be reported')
  })
  it('should render correctly with text and other MIME types', () => {
    const testCases = values(MIME_TYPES).filter((type) => type !== MIME_TYPES.HTML_MIME_TYPE)
    testCases.forEach((type) => {
      const props = {
        notification: {
          ...aNotif,
          mimeType: type,
        },
      }
      const enzymeWrapper = shallow(<NotificationDetailComponent {...props} />, { context })
      // expected: find a <pre> div
      assert.lengthOf(enzymeWrapper.find('pre'), 1, `MIME type ${type} should be rendered using <pre> div`)
      // date
      const dateWrapper = enzymeWrapper.find(FormattedNotificationDate)
      assert.lengthOf(dateWrapper, 1, `There should be notification date (${type})`)
      // title
      const cardHeaderWrapper = enzymeWrapper.find(CardHeader)
      assert.lengthOf(cardHeaderWrapper, 1, 'There should be the card wrapper')
      assert.equal(cardHeaderWrapper.props().title, props.notification.title, 'Notification title should be reported')
    })
  })
})
