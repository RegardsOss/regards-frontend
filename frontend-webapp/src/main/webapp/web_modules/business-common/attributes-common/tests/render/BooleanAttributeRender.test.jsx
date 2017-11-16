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
import { BooleanAttributeRender } from '../../src/render/BooleanAttributeRender'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing BooleanAttributeRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(BooleanAttributeRender)
  })

  it('Should render a boolean values', () => {
    // render true
    const wrapper = shallow(<BooleanAttributeRender value />, { context })
    assert.include(wrapper.text(), String(true), 'True value should be rendered')
    // render false
    wrapper.setProps({ value: false })
    assert.include(wrapper.text(), String(false), 'False value should be rendered')
  })

  it('Should render an empty value', () => {
    const wrapper = shallow(<BooleanAttributeRender />, { context })
    assert.include(wrapper.text(), 'attribute.render.no.value.label', 'No data should be internationalized')
  })
})
