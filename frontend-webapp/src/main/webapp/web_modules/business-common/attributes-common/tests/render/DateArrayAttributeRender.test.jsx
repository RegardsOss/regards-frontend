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
import DateArrayAttributeRender from '../../src/render/DateArrayAttributeRender'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Tests for AttributeConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing DateArrayAttributeRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DateArrayAttributeRender)
  })

  it('Should render an array of date', () => {
    const props = {
      attributes: {
        'test.attribute': [
          '2017-01-07T12:00:00',
          '2017-01-08T12:00:00',
          '2017-01-09T12:00:00',
        ],
      },
    }
    const wrapper = shallow(<DateArrayAttributeRender {...props} />, { context })

    const dates = wrapper.find(FormattedDate)
    const times = wrapper.find(FormattedTime)
    assert.lengthOf(dates, 3, 'There should be 3 formatted date elements rendered')
    assert.lengthOf(times, 3, 'There should be 3 formatted times elements rendered')
  })

  it('Should render an empty value', () => {
    const props = {
      attributes: {
        'test.attribute': 'error',
      },
    }
    const wrapper = shallow(<DateArrayAttributeRender {...props} />, { context })

    const value = wrapper.text()
    assert.equal(value, '', 'There should be an empty value rendered')
  })

  it('Should render multiples attributes dates arrays', () => {
    const props = {
      attributes: {
        'test.attribute': [
          '2017-01-07T12:00:00',
          '2017-01-08T12:00:00',
          '2017-01-09T12:00:00',
        ],
        'test.attribute2': [
          '2017-01-07T12:00:00',
          '2017-01-08T12:00:00',
        ],
      },
    }
    const wrapper = shallow(<DateArrayAttributeRender {...props} />, { context })

    const dates = wrapper.find(FormattedDate)
    const times = wrapper.find(FormattedTime)
    assert.lengthOf(dates, 5, 'There should be 3 formatted date elements rendered')
    assert.lengthOf(times, 5, 'There should be 3 formatted times elements rendered')
  })
})
