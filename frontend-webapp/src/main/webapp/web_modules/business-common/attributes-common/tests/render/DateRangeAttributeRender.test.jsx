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
import { FormattedDate, FormattedTime } from 'react-intl'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import DateRangeAttributeRender from '../../src/render/DateRangeAttributeRender'
import styles from '../../src/styles'

const context = buildTestContext(styles)


/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing DateRangeAttributeRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should render an array of date', () => {
    const props = {
      attributes: {
        'test.attribute': {
          lowerBound: '2017-01-07T12:00:00',
          upperBound: '2017-01-07T15:00:00',
        },
      },
    }
    const wrapper = shallow(<DateRangeAttributeRender {...props} />, { context })

    const dates = wrapper.find(FormattedDate)
    const times = wrapper.find(FormattedTime)
    assert.lengthOf(dates, 2, 'There should be 3 formatted date elements rendered')
    assert.lengthOf(times, 2, 'There should be 3 formatted times elements rendered')
  })

  it('Should render an empty value', () => {
    const props = {
      attributes: {
        'test.attribute': 'error',
      },
    }
    const wrapper = shallow(<DateRangeAttributeRender {...props} />, { context })

    const value = wrapper.text()
    assert.equal(value, '', 'There should be an empty value rendered')
  })

  it('Should render multiples attributes dates arrays', () => {
    const props = {
      attributes: {
        'test.attribute': {
          lowerBound: '2017-01-07T12:00:00',
          upperBound: '2017-01-07T15:00:00',
        },
        'test.attribute2': {
          lowerBound: '2017-01-07T12:00:00',
          upperBound: '2017-01-07T15:00:00',
        },
      },
    }
    const wrapper = shallow(
      <DateRangeAttributeRender {...props} />, { context })

    const dates = wrapper.find(FormattedDate)
    const times = wrapper.find(FormattedTime)
    assert.lengthOf(dates, 4, 'There should be 3 formatted date elements rendered')
    assert.lengthOf(times, 4, 'There should be 3 formatted times elements rendered')
  })
})
