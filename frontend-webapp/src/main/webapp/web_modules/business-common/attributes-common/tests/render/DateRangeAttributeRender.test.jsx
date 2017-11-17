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
import { DateRangeAttributeRender } from '../../src/render/DateRangeAttributeRender'
import styles from '../../src/styles'

const context = buildTestContext(styles)


/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing DateRangeAttributeRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DateRangeAttributeRender)
  })

  it('Should render correctly a no data range', () => {
    // undefined
    let wrapper = shallow(<DateRangeAttributeRender />, { context })
    assert.include(wrapper.text(), 'attribute.render.no.value.label', 'Undefined range should display no data text')

    // null bounds
    const props = {
      value: {
        lowerBound: null,
        upperBound: null,
      },
    }
    wrapper = shallow(<DateRangeAttributeRender {...props} />, { context })
    assert.include(wrapper.text(), 'attribute.render.no.value.label', 'Null range should display no data text')

    const props2 = {
      value: {
        lowerBound: 'DDD',
        upperBound: 'CCC',
      },
    }
    wrapper = shallow(<DateRangeAttributeRender {...props2} />, { context })
    assert.include(wrapper.text(), 'attribute.render.no.value.label', 'Non parsable range should display no data text')
  })

  it('Should render correctly a lower bound range (when upper is undefined or not parsable', () => {
    // undefined upper
    const props = {
      value: {
        lowerBound: '2017-01-07T12:00:00',
      },
    }
    let wrapper = shallow(<DateRangeAttributeRender {...props} />, { context })
    assert.include(wrapper.text(), 'attribute.render.range.lower.only.label', 'Undefined upper bound should show a lower range text')

    // non parsable  upper
    const props2 = {
      value: {
        lowerBound: '2017-01-07T12:00:00',
        upperBound: 'CCC',
      },
    }
    wrapper = shallow(<DateRangeAttributeRender {...props2} />, { context })
    assert.include(wrapper.text(), 'attribute.render.range.lower.only.label', 'Non parsable upper bound should show a lower range text')
  })

  it('Should render correctly an upper bound range (when lower is undefined or not parsable', () => {
    // undefined upper
    const props = {
      value: {
        upperBound: '2017-01-07T12:00:00',
      },
    }
    let wrapper = shallow(<DateRangeAttributeRender {...props} />, { context })
    assert.include(wrapper.text(), 'attribute.render.range.upper.only.label', 'Undefined lower bound should show a lower range text')

    // non parsable  upper
    const props2 = {
      value: {
        lowerBound: 'CCC',
        upperBound: '2017-01-07T12:00:00',
      },
    }
    wrapper = shallow(<DateRangeAttributeRender {...props2} />, { context })
    assert.include(wrapper.text(), 'attribute.render.range.upper.only.label', 'Non parsable lower bound should show a lower range text')
  })

  it('Should render correctly a complete range when both bounds can be parsed', () => {
    // undefined upper
    const props = {
      value: {
        lowerBound: '2017-01-07T06:00:00',
        upperBound: '2017-01-07T12:00:00',
      },
    }
    const wrapper = shallow(<DateRangeAttributeRender {...props} />, { context })
    assert.include(wrapper.text(), 'attribute.render.range.full.label', 'Undefined lower bound should show a lower range text')
  })
})
