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
import values from 'lodash/values'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import StatusRender, { ORDER_USER_STATUS } from '../../../../src/components/orders/cells/StatusRender'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test StatusRender
* @author Raphaël Mechali
*/
describe('[Order Common] Testing StatusRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StatusRender)
  })
  values(ORDER_USER_STATUS).forEach((status) => it(`should render correctly with status ${status}`, () => {
    const props = {
      value: status,
    }
    shallow(<StatusRender {...props} />, { context })
  }))
})
