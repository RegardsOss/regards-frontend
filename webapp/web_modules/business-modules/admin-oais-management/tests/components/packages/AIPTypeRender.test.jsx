/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DamDomain } from '@regardsoss/domain'
import { StringValueRender } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AIPTypeRender from '../../../src/components/packages/AIPTypeRender'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AIPTypeRender
 * @author Raphaël Mechali
 */
describe('[OAIS AIP MANAGEMENT] Testing AIPTypeRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AIPTypeRender)
  })
  DamDomain.ENTITY_TYPES.forEach((type) => it(`should render correctly with type ${type}`, () => {
    const props = {
      value: type,
    }
    const enzymeWrapper = shallow(<AIPTypeRender {...props} />, { context })
    const delegateRender = enzymeWrapper.find(StringValueRender)
    assert.lengthOf(delegateRender, 1, 'There should be delegate string value render')
    assert.equal(delegateRender.props().value, `oais.package.type.${type}`, 'It should render internationalized status')
  }))
})
