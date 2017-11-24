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
import DateArrayValueRender from '../../src/values/DateArrayValueRender'
import styles from '../../src/values/styles'

const context = buildTestContext(styles)

/**
 * Tests for ValueConfigurationComponent
 * @author Sébastien binda
 */
describe('[COMPONENTS] Testing DateArrayValueRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DateArrayValueRender)
  })

  it('Should render no data from undefined or empty arrays', () => {
    // empty array
    const props = { value: [] }
    let wrapper = shallow(<DateArrayValueRender {...props} />, { context })
    assert.include(wrapper.text(), 'value.render.no.value.label', 'Empty array should be rendered as no data')
    // undefined
    wrapper = shallow(<DateArrayValueRender />, { context })
    assert.include(wrapper.text(), 'value.render.no.value.label', 'Undefined/null should be rendered as no data')
  })

  it('Should render an array of date', () => {
    const props = {
      value: [
        '2017-01-07T12:00:00',
        '2017-01-08T12:00:00',
        '2017-01-09T12:00:00',
      ],
    }
    const wrapper = shallow(<DateArrayValueRender {...props} />, { context })
    // when three dates are correctly rendered, there must be two separators and 0 no data text
    const asText = wrapper.text()
    assert.notInclude(asText, 'value.render.no.value.label', 'There should be 0 no data text')

    const datesText = asText.split('value.render.array.values.separator')
    assert.lengthOf(datesText, 3, 'There should be 3 dates')
    datesText.forEach((t, index) => {
      assert.include(t, 'value.render.date.value', `Date at ${index} should be internationalized`)
    })
  })

  it('Should render an array with empty and invalid values', () => {
    const props = {
      value: [
        '2017-01-07T12:00:00', // OK
        'DDD', // No data
        '2017-01-09T12:00:00', // OK
        '65TF', // No data
        null, // No data
      ],
    }
    const wrapper = shallow(<DateArrayValueRender {...props} />, { context })

    // when three dates are correctly rendered, there must be two separators and 0 no data text
    const asText = wrapper.text()
    const datesText = asText.split('value.render.array.values.separator')
    assert.lengthOf(datesText, 5, 'There should be 5 dates')
    datesText.forEach((t, index) => {
      if ([0, 2].includes(index)) { // OK date
        assert.include(t, 'value.render.date.value', `Date at ${index} should be internationalized`)
      } else { // No data
        assert.include(t, 'value.render.no.value.label', `Date at ${index} should be no data`)
      }
    })
  })
})
