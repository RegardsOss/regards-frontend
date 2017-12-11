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
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import RangeAttributesRender from '../../src/render/RangeAttributesRender'


/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing RangeAttributesRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should render a range value', () => {
    const props = {
      attributes: {
        'test.attribute': {
          lowerBound: 156,
          upperBound: 'test',
        },
      },
    }
    const wrapper = shallow(<RangeAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, '156 - test', 'There should be an integer value renderedee')
  })

  it('Should render an empty value', () => {
    const props = {
      attributes: {
        'test.attribute': 'plop',
      },
    }
    const wrapper = shallow(<RangeAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, '', 'There should be an empty value rendered')
  })

  it('Should render two ranged values', () => {
    const props = {
      attributes: {
        'test.attribute': {
          lowerBound: 156,
          upperBound: 'test',
        },
        'test.attribute2': {
          lowerBound: 222,
          upperBound: 'other',
        },
      },
    }

    const wrapper = shallow(<RangeAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, '156 - test222 - other', 'There should be two range value rendered')
  })
})
