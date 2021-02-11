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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import Notifications from 'mdi-material-ui/Bell'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { ShowableAtRender } from '@regardsoss/display-control'
import ActionIconWithNotifications from '../../src/board/ActionIconWithNotifications'

const context = buildTestContext()
describe('[COMPONENTS] Testing ActionIconWithNotifications', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ActionIconWithNotifications)
  })

  it('should render properly with notifications', () => {
    const props = {
      notificationsCount: 1,
      icon: <Notifications />,
    }

    const render = shallow(<ActionIconWithNotifications {...props} />, { context })
    assert.isTrue(render.find(ShowableAtRender).props().show, 'The badge should be shown when notificationsCount is greater than zero')
    assert.equal(render.find(Notifications).length, 1, 'There should be the icon')
  })

  it('should render properly and hide badge without notifications', () => {
    const props = {
      notificationsCount: 0,
      icon: <Notifications />,
    }

    const render = shallow(<ActionIconWithNotifications {...props} />, { context })
    assert.isFalse(render.find(ShowableAtRender).props().show, 'The badge should be hidden when notificationsCount is equal to zero')
    assert.equal(render.find(Notifications).length, 1, 'There should be the icon')
  })
})
