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
import { DateAttributeRender } from '../../src/render/DateAttributeRender'
import styles from '../../src/styles'
import { DateArrayAttributeRender } from '../../src/render/DateArrayAttributeRender'

const context = buildTestContext(styles)

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing DateAttributeRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DateArrayAttributeRender)
  })

  it('Should render a no data / unparsable correctly', () => {
    // undefined
    let wrapper = shallow(<DateAttributeRender />, { context })
    assert.include(wrapper.text(), 'attribute.render.no.value.label', 'Undefined date should display no data text')
    // not parsable
    wrapper = shallow(<DateAttributeRender value="DDD" />, { context })
    assert.include(wrapper.text(), 'attribute.render.no.value.label', 'Undefined date should display no data text')
  })

  it('Should internationalize a valid date', () => {
    const props = {
      value: '2017-01-07T12:00:00',
    }
    const wrapper = shallow(<DateAttributeRender {...props} />, { context })
    assert.include(wrapper.text(), 'attribute.render.date.value', 'There should be an empty value rendered')
  })
})
