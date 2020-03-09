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
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import { DatePickerField, NumericalComparator } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import TemporalCriterionComponent from '../../src/components/TemporalCriterionComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test TemporalCriterionComponent
 * @author Raphaël Mechali
 */
describe('[Temporal criterion] Testing TemporalCriterionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TemporalCriterionComponent)
  })
  it('should render enabled with attributes bounds', () => {
    const props = {
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '2017-09-27T13:15:42.726Z', '2018-09-29T13:15:42.726Z')),
      value: new Date('2017-09-28T18:18:18.726Z'),
      operator: CommonDomain.EnumNumericalComparator.GE,
      availableComparators: [CommonDomain.EnumNumericalComparator.LE, CommonDomain.EnumNumericalComparator.GE],
      onDateChanged: () => {},
      onOperatorSelected: () => {},
    }
    const enzymeWrapper = shallow(<TemporalCriterionComponent {...props} />, { context })
    // A - the attribute label should be visible
    assert.include(enzymeWrapper.debug(), props.searchAttribute.label, 'Attribute label should be rendered')

    const comparator = enzymeWrapper.find(NumericalComparator)
    assert.lengthOf(comparator, 1, 'There should be the comparator selector')
    testSuiteHelpers.assertWrapperProperties(comparator, {
      onChange: props.onOperatorSelected,
      value: props.operator,
      comparators: props.availableComparators,
      disabled: false,
    }, 'Comparator properties should be correctly reported. It should be enabled')

    const datepicker = enzymeWrapper.find(DatePickerField)
    assert.lengthOf(datepicker, 1, 'There should be the date selector')
    testSuiteHelpers.assertWrapperProperties(datepicker, {
      value: props.value,
      onChange: props.onDateChanged,
      displayTime: true,
      disabled: false,
    }, 'Date picker properties should be correctly reported. It should be enabled')
  })
  it('should render disabled with attributes bounds', () => {
    const props = {
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601),
      value: null,
      operator: CommonDomain.EnumNumericalComparator.LE,
      availableComparators: [CommonDomain.EnumNumericalComparator.LE, CommonDomain.EnumNumericalComparator.GE],
      onDateChanged: () => {},
      onOperatorSelected: () => {},
    }
    const enzymeWrapper = shallow(<TemporalCriterionComponent {...props} />, { context })
    // A - the attribute label should be visible
    assert.include(enzymeWrapper.debug(), props.searchAttribute.label, 'Attribute label should be rendered')

    const comparator = enzymeWrapper.find(NumericalComparator)
    assert.lengthOf(comparator, 1, 'There should be the comparator selector')
    testSuiteHelpers.assertWrapperProperties(comparator, {
      onChange: props.onOperatorSelected,
      value: props.operator,
      comparators: props.availableComparators,
      disabled: true,
    }, 'Comparator properties should be correctly reported. It should be disabled')

    const datepicker = enzymeWrapper.find(DatePickerField)
    assert.lengthOf(datepicker, 1, 'There should be the date selector')
    testSuiteHelpers.assertWrapperProperties(datepicker, {
      value: props.value,
      onChange: props.onDateChanged,
      displayTime: true,
      disabled: true,
    }, 'Date picker properties should be correctly reported. It should be disabled')
  })
})
