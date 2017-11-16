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
import { RangeAttributeRender } from '../../src/render/RangeAttributeRender'
import styles from '../../src/styles'

const context = buildTestContext(styles)


/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing RangeAttributeRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RangeAttributeRender)
  })

  it('Should render correctly a no data range', () => {
    // undefined
    let wrapper = shallow(<RangeAttributeRender />, { context })
    assert.include(wrapper.text(), 'attribute.render.no.value.label', 'Undefined range should display no data text')

    // null bounds
    const props = {
      value: {
        lowerBound: null,
        upperBound: null,
      },
    }
    wrapper = shallow(<RangeAttributeRender {...props} />, { context })
    assert.include(wrapper.text(), 'attribute.render.no.value.label', 'Null range should display no data text')
  })

  it('Should render correctly a lower bound range', () => {
    // undefined upper
    const props = {
      value: {
        lowerBound: 2,
      },
    }
    const wrapper = shallow(<RangeAttributeRender {...props} />, { context })
    assert.include(wrapper.text(), 'attribute.render.range.lower.only.label', 'Undefined upper bound should show a lower range text')
  })

  it('Should render correctly an upper bound range (when lower is undefined or not parsable', () => {
    // undefined upper
    const props = {
      value: {
        upperBound: 'Top',
      },
    }
    const wrapper = shallow(<RangeAttributeRender {...props} />, { context })
    assert.include(wrapper.text(), 'attribute.render.range.upper.only.label', 'Undefined lower bound should show a lower range text')
  })

  it('Should render correctly a complete range when both bounds can be parsed', () => {
    // undefined upper
    const props = {
      value: {
        lowerBound: 'A',
        upperBound: 36,
      },
    }
    const wrapper = shallow(<RangeAttributeRender {...props} />, { context })
    assert.include(wrapper.text(), 'attribute.render.range.full.label', 'Undefined lower bound should show a lower range text')
  })
})
