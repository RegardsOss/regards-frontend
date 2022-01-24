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
import noop from 'lodash/noop'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { DamDomain } from '@regardsoss/domain'
import { DatePickerField, NumericalComparatorSelector } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import TemporalCriterionComponent from '../../src/components/TemporalCriterionComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test TemporalCriterionComponent
 * @author Raphaël Mechali
 */
describe('[Two temporal criteria] Testing TemporalCriterionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TemporalCriterionComponent)
  })

  const testCases = [{
    label: 'in error',
    props: { error: true },
    expectedComparatorProps: {},
    expectedDatepickerProps: { errorText: TemporalCriterionComponent.ERROR_TEXT_PLACEHOLDER },
  }, {
    label: 'as lower range value selector, with bound data',
    props: { }, // default test case
    expectedComparatorProps: { },
    expectedDatepickerProps: { },
  }, {
    label: 'as lower range value selector, without bound data',
    props: {
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false)),
    },
    expectedComparatorProps: { disabled: true },
    expectedDatepickerProps: { disabled: true },
  }, {
    label: 'as upper range value selector, with bound data',
    props: {
      lowerBound: false,
      isStopDate: true,
    },
    expectedComparatorProps: {
      operator: TemporalCriterionComponent.UPPER_BOUND_COMPARATORS[0],
      operators: TemporalCriterionComponent.UPPER_BOUND_COMPARATORS,
    },
    expectedDatepickerProps: {
      defaultTime: TemporalCriterionComponent.DEFAULT_STOP_TIME,
    },
  }, {
    label: 'as upper range value selector, without bound data',
    props: {
      lowerBound: false,
      isStopDate: true,
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false)),
    },
    expectedComparatorProps: {
      operator: TemporalCriterionComponent.UPPER_BOUND_COMPARATORS[0],
      operators: TemporalCriterionComponent.UPPER_BOUND_COMPARATORS,
      disabled: true,
    },
    expectedDatepickerProps: {
      defaultTime: TemporalCriterionComponent.DEFAULT_STOP_TIME,
      disabled: true,
    },
  }]
  testCases.forEach(({
    label, props: testCaseProps, expectedComparatorProps, expectedDatepickerProps,
  }) => it(`should render correctly ${label}`, () => {
    const props = {
      id: 'any',
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '2017-09-27T13:15:42.726Z', '2018-09-29T13:15:42.726Z')),
      error: false,
      value: new Date('2017-12-25T00:00:00.000Z'),
      lowerBound: true,
      isStopDate: false,
      hintDate: '2016-12-25T00:00:00.000Z',
      onDateChanged: () => {},
      ...testCaseProps, // overriden by current test case
    }
    const enzymeWrapper = shallow(<TemporalCriterionComponent {...props} />, { context })

    const comparator = enzymeWrapper.find(NumericalComparatorSelector)
    assert.lengthOf(comparator, 1, 'There should be the comparator selector')
    testSuiteHelpers.assertWrapperProperties(comparator, {
      operator: TemporalCriterionComponent.LOWER_BOUND_COMPARATORS[0],
      operators: TemporalCriterionComponent.LOWER_BOUND_COMPARATORS,
      onSelect: noop,
      disabled: false,
      ...expectedComparatorProps, // overriden by current test case
    }, 'Comparator properties should be correctly reported. It should be enabled')

    const datepicker = enzymeWrapper.find(DatePickerField)
    assert.lengthOf(datepicker, 1, 'There should be the date selector')
    testSuiteHelpers.assertWrapperProperties(datepicker, {
      id: props.id,
      value: props.value,
      onChange: props.onDateChanged,
      displayTime: true,
      errorText: null,
      disabled: false,
      defaultTime: TemporalCriterionComponent.DEFAULT_START_TIME,
      ...expectedDatepickerProps,
    }, 'Date picker properties should be correctly reported. It should be enabled')
  }))
})
