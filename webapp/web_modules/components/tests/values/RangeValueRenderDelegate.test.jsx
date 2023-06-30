/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import RangeValueRenderDelegate from '../../src/values/RangeValueRenderDelegate'
import styles from '../../src/values/styles'

const context = buildTestContext(styles)

/**
 * Tests for ValueConfigurationComponent
 * @author Sébastien binda
 */
describe('[COMPONENTS] Testing RangeValueRenderDelegate', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RangeValueRenderDelegate)
  })

  it('Should render correctly a no data range', () => {
    const props = {
      noValue: true,
      lowerBound: null,
      upperBound: null,
    }
    const wrapper = shallow(<RangeValueRenderDelegate {...props} />, { context })
    assert.include(wrapper.text(), 'value.render.no.value.label')
  })

  it('Should render correctly an infinite range', () => {
    // undefined upper
    const props = {
      noValue: false,
      lowerBound: null,
      upperBound: null,
    }
    const wrapper = shallow(<RangeValueRenderDelegate {...props} />, { context })
    assert.include(wrapper.text(), 'value.render.range.infinite.label')
  })

  it('Should render correctly an upper infinite range', () => {
    // undefined upper
    const props = {
      noValue: false,
      lowerBound: '2',
    }
    const wrapper = shallow(<RangeValueRenderDelegate {...props} />, { context })
    assert.include(wrapper.text(), 'value.render.range.lower.only.label')
  })

  it('Should render correctly a lower infinite range', () => {
    // undefined upper
    const props = {
      noValue: false,
      upperBound: 'Top',
    }
    const wrapper = shallow(<RangeValueRenderDelegate {...props} />, { context })
    assert.include(wrapper.text(), 'value.render.range.upper.only.label')
  })

  it('Should render correctly a finite range', () => {
    // undefined upper
    const props = {
      noValue: false,
      lowerBound: '8%',
      upperBound: '36°',
    }
    const wrapper = shallow(<RangeValueRenderDelegate {...props} />, { context })
    assert.include(wrapper.text(), 'value.render.range.full.label')
  })
})
