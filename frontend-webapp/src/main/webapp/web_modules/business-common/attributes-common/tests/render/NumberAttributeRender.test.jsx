/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { NumberAttributeRender } from '../../src/render/NumberAttributeRender'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing NumberAttributeRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NumberAttributeRender)
  })

  it('Should render no data', () => {
    const wrapper = shallow(<NumberAttributeRender />, { context })
    assert.include(wrapper.text(), 'attribute.render.no.value.label', 'shoud show no data text')
  })

  it('Should render string data directly (avoids useless parsing)', () => {
    const props = { value: '156' }
    const wrapper = shallow(<NumberAttributeRender {...props} />, { context })
    assert.include(wrapper.text(), '156', 'There should be an integer value rendered')
  })

  it('Should render number data', () => {
    const props = { value: 156 }
    const wrapper = shallow(<NumberAttributeRender {...props} />, { context })
    assert.include(wrapper.text(), '156', 'There should be an integer value rendered')
  })
})
