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
import { OrderDomain } from '@regardsoss/domain'
import OrderFileStatusRender, { UNKNOWN } from '../../../src/components/files/OrderFileStatusRender'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test OrderFileStatusRender
* @author Raphaël Mechali
*/
describe('[Order Common] Testing OrderFileStatusRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderFileStatusRender)
  })
  OrderDomain.ORDER_FILE_STATUS.forEach((status) => it(`should render correctly with status ${status}`, () => {
    const props = {
      value: status,
    }
    const enzymeWrapper = shallow(<OrderFileStatusRender {...props} />, { context })
    const asText = enzymeWrapper.debug()
    assert.isTrue(asText.includes(`files.list.cell.status.${status}.text`), 'The text key should contain status as it is not unknown')
    assert.isTrue(asText.includes(`files.list.cell.status.${status}.tooltip`), 'The title key should contain status as it is not unknown')
  }))

  it('should render correctly in unknwon state', () => {
    const props = {
      value: null,
    }
    const enzymeWrapper = shallow(<OrderFileStatusRender {...props} />, { context })
    const asText = enzymeWrapper.debug()
    assert.isTrue(asText.includes(`files.list.cell.status.${UNKNOWN}.text`), 'The text key should contain unknown status')
    assert.isTrue(asText.includes(`files.list.cell.status.${UNKNOWN}.tooltip`), 'The title key should contain unknown status')
  })
})
