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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { AdminDomain } from '@regardsoss/domain'
import { StringValueRender } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ProjectUserStatusRenderCell from '../../../../src/components/list/render/ProjectUserStatusRenderCell'
import styles from '../../../../src/styles'
import messages from '../../../../src/i18n'

const context = buildTestContext(styles)

/**
 * Test ProjectUserStatusRenderCell
 * @author Raphaël Mechali
 */
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing ProjectUserStatusRenderCell', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectUserStatusRenderCell)
  })

  AdminDomain.PROJECT_USER_STATUS.forEach((status) => it(`should render correctly for status ${status}`, () => {
    const props = {
      value: status,
    }
    const enzymeWrapper = shallow(<ProjectUserStatusRenderCell {...props} />, { context })
    const renderWrapper = enzymeWrapper.find(StringValueRender)
    assert.lengthOf(renderWrapper, 1, 'There should be the render')
    const expectedMessage = `projectUser.list.table.status.label.${status}`
    assert.equal(renderWrapper.props().value, expectedMessage, 'Status should be internationalized')
    // No check it is defined in messages
    assert.isOk(messages.en[expectedMessage], 'Status should be defined for en locale')
    assert.isOk(messages.fr[expectedMessage], 'Status should be defined for fr locale')
  }))
})
