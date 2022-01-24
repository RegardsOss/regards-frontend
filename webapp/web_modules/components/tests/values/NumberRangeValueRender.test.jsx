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
import NumberRangeValueRender from '../../src/values/NumberRangeValueRender'
import styles from '../../src/values/styles'
import RangeValueRenderDelegate from '../../src/values/RangeValueRenderDelegate'

/**
 * test function to format number (replacing react-intl, not available in tests context)
 * @param {number} v value
 * @param {*} options format options
 * @return {string} formatted text
 */
function formatNumberForTest(v, options) {
  assert.isNotNull(v)
  assert.isNotNull(options)
  // options used here only for truncating number (test impl)
  const factor = 10 ** options.maximumFractionDigits
  return `${Math.round(v * factor) / factor}`
}
/**
 * Build usable test context
 */
const initialContext = buildTestContext(styles)
const context = {
  ...initialContext,
  intl: {
    ...initialContext.intl,
    formatNumber: formatNumberForTest,
  },
}

/**
 * Tests for NumberRangeValueRender
 * @author Raphaël Mechali
 */
describe('[COMPONENTS] Testing NumberRangeValueRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NumberRangeValueRender)
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
    value: { upperBound: 123.456789 },
    precision: 3,
    unit: '%',
    expectedProps: {
      noValue: false,
      lowerBound: null,
      upperBound: '123.457%',
    },
  }, {
    label: 'upper infinite range',
    value: { lowerBound: 123.456789 },
    unit: 'potatoes',
    expectedProps: {
      noValue: false,
      lowerBound: '123.456789potatoes',
      upperBound: null,
    },
  }, {
    label: 'finite range',
    value: {
      lowerBound: 1.2345,
      upperBound: 2.3456,
    },
    precision: 2,
    expectedProps: {
      noValue: false,
      lowerBound: '1.23',
      upperBound: '2.35',
    },
  }]
  testCases.forEach(({
    label, value, precision, unit, expectedProps,
  }) => it(`should render correctly in ${label} case`, () => {
    const enzymeWrapper = shallow(<NumberRangeValueRender
      value={value}
      precision={precision}
      unit={unit}
    />, { context })
    const delegateWrapper = enzymeWrapper.find(RangeValueRenderDelegate)
    assert.lengthOf(delegateWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(delegateWrapper, expectedProps)
  }))
})
