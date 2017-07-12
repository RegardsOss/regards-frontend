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
import StringAttributesRender from '../../src/render/StringAttributesRender'

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing StringAttributesRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should render a string value', () => {
    const props = {
      attributes: {
        'test.attribute': 'render test string',
      },
    }
    const wrapper = shallow(<StringAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, 'render test string', 'There should be a string value rendered')
  })

  it('Should render a string value for boolean value', () => {
    const props = {
      attributes: {
        'test.attribute': true,
      },
    }
    const wrapper = shallow(<StringAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, 'true', 'There should be a string value rendered')
  })
})
