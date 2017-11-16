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
import { StringAttributeRender } from '../../src/render/StringAttributeRender'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing StringAttributeRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StringAttributeRender)
  })

  it('Should render a no data value', () => {
    // undefined
    let wrapper = shallow(<StringAttributeRender />, { context })
    assert.include(wrapper.text(), 'attribute.render.no.value.label', 'Undefined value => no data text')
    // null
    const props = { value: null }
    wrapper = shallow(<StringAttributeRender {...props} />, { context })
    assert.include(wrapper.text(), 'attribute.render.no.value.label', 'Null value => no data text')
    // empty
    const props2 = { value: '' }
    wrapper = shallow(<StringAttributeRender {...props2} />, { context })
    assert.include(wrapper.text(), 'attribute.render.no.value.label', 'Null value => no data text')
  })

  it('Should render a string value', () => {
    const props = { value: 'Any value' }
    const wrapper = shallow(<StringAttributeRender {...props} />, { context })
    assert.include(wrapper.text(), props.value)
  })
})
