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
import { StringArrayValueRender } from '@regardsoss/components'
import StorageArrayRender from '../../../src/components/packages/StorageArrayRender'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test StorageArrayRender
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing StorageArrayRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StorageArrayRender)
  })

  it('should render correctly', () => {
    const props = {
      value: [
        '1',
        '2',
      ],
    }
    const enzymeWrapper = shallow(<StorageArrayRender {...props} />, { context })
    const stringArrayValueRenderWrapper = enzymeWrapper.find(StringArrayValueRender)
    assert.lengthOf(stringArrayValueRenderWrapper, 1, 'There should be a StringArrayValueRender')
    assert.isOk(stringArrayValueRenderWrapper.props().value, 'StringArrayValueRender value should be found')
  })
})
