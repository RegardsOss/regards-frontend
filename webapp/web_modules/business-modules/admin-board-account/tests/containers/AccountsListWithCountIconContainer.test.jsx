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
import { ActionIconWithNotifications } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AccountsListWithCountIconContainer } from '../../src/containers/AccountsListWithCountIconContainer'

const context = buildTestContext()

/**
 * Test AccountsListWithCountIconContainer
 * @author Raphaël Mechali
 */
describe('[ADMIN BOARD ACCOUNT] Testing AccountsListWithCountIconContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccountsListWithCountIconContainer)
  })
  it('should render correctly', () => {
    const props = {
      notificationsCount: 2,
    }
    const enzymeWrapper = shallow(<AccountsListWithCountIconContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(ActionIconWithNotifications)
    assert.lengthOf(componentWrapper, 1, 'There should be the icon displayer component')
    assert.equal(componentWrapper.props().notificationsCount, props.notificationsCount, 'Notifications count should be correctly reported')
  })
})
