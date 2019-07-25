/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DateValueRender } from '@regardsoss/components'
import AIPListUpdateDateColumnRenderer from '../../../../src/components/aip/render/AIPListUpdateDateColumnRenderer'
import styles from '../../../../src/styles'
import { storedAIP } from '../../../dumps/AIPWithStorages.dump'

const context = buildTestContext(styles)

/**
 * Test AIPListUpdateDateColumnRenderer
 * @author Raphaël Mechali
 */
describe('[ADMIN STORAGE AIP MANAGEMENT] Testing AIPListUpdateDateColumnRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AIPListUpdateDateColumnRenderer)
  })
  it('should render correctly', () => {
    const props = {
      entity: storedAIP,
    }
    const enzymeWrapper = shallow(<AIPListUpdateDateColumnRenderer {...props} />, { context })
    const delegateRenderWrapper = enzymeWrapper.find(DateValueRender)
    assert.lengthOf(delegateRenderWrapper, 1, 'There should be delegate render')
    assert.deepEqual(delegateRenderWrapper.props().value, '2018-12-21T10:55:45.046Z', 'storage labels should be correctly provided (and sorted) to delegate render')
  })
})
