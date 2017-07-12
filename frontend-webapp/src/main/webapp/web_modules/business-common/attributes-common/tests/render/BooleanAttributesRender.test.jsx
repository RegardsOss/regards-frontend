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
import BooleanAttributesRender from '../../src/render/BooleanAttributesRender'

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing BooleanAttributesRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(BooleanAttributesRender)
  })
  it('Should render a boolean value', () => {
    const props = {
      attributes: {
        'test.attribute': true,
      },
    }
    const wrapper = shallow(<BooleanAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, 'true', 'There should be a boolean value renderedee')
  })

  it('Should render an empty value for a string', () => {
    const props = {
      attributes: {
        'test.attribute': 'plop',
      },
    }
    const wrapper = shallow(<BooleanAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, '', 'There should be an empty value rendered')
  })

  it('Should render two boolean values', () => {
    const props = {
      attributes: {
        'test.attribute': true,
        'test.attribute2': false,
      },
    }
    const wrapper = shallow(<BooleanAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, 'truefalse', 'There should be two boolean value rendered')
  })
})
