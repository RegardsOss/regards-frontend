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
import Avatar from 'material-ui/Avatar'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import NotificationIcon from '../../../../src/components/user/notification/NotificationIcon'
import styles from '../../../../src/styles'
import { aNotif } from '../../../dumps/notification.dump'

const context = buildTestContext(styles)

/**
 * Test NotificationIcon
 * @author Raphaël Mechali
 */
describe('[Menu] Testing NotificationIcon', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NotificationIcon)
  })
  const testCases = [
    'INFO',
    'ERROR',
    'FATAL',
    'WARNING',
    'UNKNWON LEVEL',
    null]
  testCases.forEach((type) => it(`Should render correctly with type ${type || 'NULL'}`, () => {
    const props = {
      notification: { ...aNotif, type },
      style: {
        idk: 'OK',
      },
    }
    const enzymeWrapper = shallow(<NotificationIcon {...props} />, { context })
    const avatarWrapper = enzymeWrapper.find(Avatar)
    assert.lengthOf(avatarWrapper, 1, 'There should be the avatar wrapper')
    assert.equal(avatarWrapper.props().style, props.style, 'Style should be reported')
  }))
})
