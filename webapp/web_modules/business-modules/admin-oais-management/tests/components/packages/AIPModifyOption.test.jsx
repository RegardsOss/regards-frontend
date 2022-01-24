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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AIPModifyOption from '../../../src/components/packages/AIPModifyOption'
import styles from '../../../src/styles'
import { AIP } from '../../dumps/AIP.dump'

const context = buildTestContext(styles)

/**
 * Test AIPModifyOption
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing AIPModifyOption', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AIPModifyOption)
  })
  it('should render and invoke callback correctly', () => {
    const spiedCallbackData = {
      count: 0,
      parameterValue: AIP,
    }
    const props = {
      entity: AIP,
      onModify: () => { spiedCallbackData.count += 1 },
    }
    const enzymeWrapper = shallow(<AIPModifyOption {...props} />, { context })

    enzymeWrapper.instance().onClick()
    assert.equal(spiedCallbackData.count, 1, 'Callback should have been invoked once')
    assert.equal(spiedCallbackData.parameterValue, props.entity, 'Callback parameter should be valid')
  })
})
