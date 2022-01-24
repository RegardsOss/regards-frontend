/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import forEach from 'lodash/forEach'
import DateRangeValueRender from '../../src/values/DateRangeValueRender'
import styles from '../../src/values/styles'
import RangeValueRenderDelegate from '../../src/values/RangeValueRenderDelegate'
import DateValueRender from '../../src/values/DateValueRender'

const context = buildTestContext(styles)

/**
 * Tests for ValueConfigurationComponent
 * @author Sébastien binda
 */
describe('[COMPONENTS] Testing DateRangeValueRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DateRangeValueRender)
  })

  const testCases = [{
    label: 'no data range',
    value: null,
    expectedProps: {
      noValue: true,
      lowerBound: null,
      upperBound: null,
    },
  }, {
    label: 'infinite range',
    value: {},
    expectedProps: {
      noValue: false,
      lowerBound: null,
      upperBound: null,
    },
  }, {
    label: 'lower infinite range',
    value: { upperBound: '2017-01-07T12:00:00' },
    expectedProps: {
      noValue: false,
      lowerBound: null,
      upperBound: 'date.value.render.type.dateWithSeconds',
    },
  }, {
    label: 'upper infinite range',
    value: { lowerBound: '2017-01-07T12:00:00' },
    expectedProps: {
      noValue: false,
      lowerBound: 'date.value.render.type.dateWithSeconds',
      upperBound: null,
    },
  }, {
    label: 'finite range',
    value: {
      lowerBound: '2017-01-07T06:00:00',
      upperBound: '2017-01-07T12:00:00',
    },
    expectedProps: {
      noValue: false,
      lowerBound: 'date.value.render.type.dateWithSeconds',
      upperBound: 'date.value.render.type.dateWithSeconds',
    },
  }]
  testCases.forEach(({ label, value, expectedProps }) => it(`should render correctly in ${label} case (default render)`, () => {
    const enzymeWrapper = shallow(<DateRangeValueRender value={value} />, { context })
    const delegateWrapper = enzymeWrapper.find(RangeValueRenderDelegate)
    assert.lengthOf(delegateWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(delegateWrapper, expectedProps)
  }))
  forEach(DateValueRender.DEFAULT_FORMATTERS, (formatter, key) => it(`Should render correctly with format ${key}`, () => {
    const props = {
      value: {
        lowerBound: '2017-01-07T06:00:00',
        upperBound: '2017-01-07T12:00:00',
      },
      formatter,
    }
    const enzymeWrapper = shallow(<DateRangeValueRender {...props} />, { context })
    const delegateWrapper = enzymeWrapper.find(RangeValueRenderDelegate)
    assert.lengthOf(delegateWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(delegateWrapper, {
      noValue: false,
      lowerBound: `date.value.render.type.${key}`,
      upperBound: `date.value.render.type.${key}`,
    })
  }))
})
