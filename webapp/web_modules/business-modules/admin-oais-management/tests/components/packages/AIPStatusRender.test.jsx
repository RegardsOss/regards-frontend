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
import { IngestDomain } from '@regardsoss/domain'
import { StringValueRender } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AIPStatusRender from '../../../src/components/packages/AIPStatusRender'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AIPStatusRender
 * @author Raphaël Mechali
 */
describe('[OAIS AIP MANAGEMENT] Testing AIPStatusRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AIPStatusRender)
  })
  IngestDomain.AIP_STATUS.forEach((status) => it(`should render correctly with status ${status}`, () => {
    const props = {
      value: status,
    }
    const enzymeWrapper = shallow(<AIPStatusRender {...props} />, { context })
    const delegateRender = enzymeWrapper.find(StringValueRender)
    assert.lengthOf(delegateRender, 1, 'There should be delegate string value render')
    assert.equal(delegateRender.props().value, `oais.list.filters.aipState.${status}`, 'It should render internationalized status')
  }))
})
