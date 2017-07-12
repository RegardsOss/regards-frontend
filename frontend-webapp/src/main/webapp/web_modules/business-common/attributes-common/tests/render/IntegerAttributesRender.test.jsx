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
import IntegerAttributesRender from '../../src/render/IntegerAttributesRender'

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing IntegerAttributesRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should render an integer value', () => {
    const props = {
      attributes: {
        'test.attribute': 156,
      },
    }
    const wrapper = shallow(<IntegerAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, '156', 'There should be an integer value rendered')
  })

  it('Should render an empty value', () => {
    const props = {
      attributes: {
        'test.attribute': 'plop',
      },
    }
    const wrapper = shallow(<IntegerAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, '', 'There should be an empty value rendered')
  })

  it('Should render two integer values', () => {
    const props = {
      attributes: {
        'test.attribute': 156,
        'test.attribute2': 568,
      },
    }

    const wrapper = shallow(<IntegerAttributesRender {...props} />)

    const value = wrapper.text()
    assert.equal(value, '156568', 'There should be two integer value rendered')
  })
})
