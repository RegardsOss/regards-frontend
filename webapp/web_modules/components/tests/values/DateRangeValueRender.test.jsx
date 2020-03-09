/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DateRangeValueRender from '../../src/values/DateRangeValueRender'
import styles from '../../src/values/styles'
import RangeValueRenderDelegate from '../../src/values/RangeValueRenderDelegate'

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
      upperBound: 'value.render.date.value',
    },
  }, {
    label: 'upper infinite range',
    value: { lowerBound: '2017-01-07T12:00:00' },
    expectedProps: {
      noValue: false,
      lowerBound: 'value.render.date.value',
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
      lowerBound: 'value.render.date.value',
      upperBound: 'value.render.date.value',
    },
  }]
  testCases.forEach(({ label, value, expectedProps }) => it(`should render correctly in ${label} case`, () => {
    const enzymeWrapper = shallow(<DateRangeValueRender value={value} />, { context })
    const delegateWrapper = enzymeWrapper.find(RangeValueRenderDelegate)
    assert.lengthOf(delegateWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(delegateWrapper, expectedProps)
  }))
})
