/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CommonDomain, DamDomain, UIDomain } from '@regardsoss/domain'
import { DatePickerField, NumericalComparatorSelector } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import { TemporalCriterionContainer } from '../../src/containers/TemporalCriterionContainer'
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
  it('should render correctly with all locales', () => {
    const props = {
      pluginInstanceId: 'any',
      error: false,
      label: criterionTestSuiteHelpers.getLabelStub(),
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '2017-09-27T13:15:42.726Z', '2018-09-29T13:15:42.726Z')),
      value: new Date('2017-12-25T00:00:00.000Z'),
      operator: CommonDomain.EnumNumericalComparator.GE,
      availableComparators: TemporalCriterionContainer.AVAILABLE_COMPARISON_OPERATORS,
      onDateChanged: () => {},
      onOperatorSelected: () => {},
    }
    UIDomain.LOCALES.forEach((locale) => {
      const enzymeWrapper = shallow(<TemporalCriterionComponent {...props} />, {
        context: buildTestContext(styles, locale),
      })
      assert.include(enzymeWrapper.debug(), props.label[locale])
    })
  })
  const testCases = [{
    label: 'in error (with attribute bounds)',
    specificProps: {
      error: true,
    },
    expectedError: true,
    expectedDisabled: false,
  }, {
    label: 'without error (with attribute bounds)',
    specificProps: { },
    expectedError: false,
    expectedDisabled: false,
  }, {
    label: 'without error (without attribute bounds)',
    specificProps: {
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false)),
    },
    expectedError: false,
    expectedDisabled: true,
  }]

  testCases.forEach(({
    label, specificProps, expectedError, expectedDisabled,
  }) => it(`should render correctly ${label}`, () => {
    const props = {
      pluginInstanceId: 'any',
      label: criterionTestSuiteHelpers.getLabelStub(),
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '2017-09-27T13:15:42.726Z', '2018-09-29T13:15:42.726Z')),
      error: false,
      value: new Date('2018-01-01T00:00:00.000Z'),
      operator: CommonDomain.EnumNumericalComparator.LE,
      availableComparators: TemporalCriterionContainer.AVAILABLE_COMPARISON_OPERATORS,
      onDateChanged: () => {},
      onOperatorSelected: () => {},
      ...specificProps,
    }
    const enzymeWrapper = shallow(<TemporalCriterionComponent {...props} />, { context })

    const comparator = enzymeWrapper.find(NumericalComparatorSelector)
    assert.lengthOf(comparator, 1, 'There should be the comparator selector')
    testSuiteHelpers.assertWrapperProperties(comparator, {
      operator: props.operator,
      operators: props.availableComparators,
      onSelect: props.onOperatorSelected,
      disabled: expectedDisabled,
    }, 'Comparator properties should be correctly reported. It should be enabled')

    const datepicker = enzymeWrapper.find(DatePickerField)
    assert.lengthOf(datepicker, 1, 'There should be the date selector')
    testSuiteHelpers.assertWrapperProperties(datepicker, {
      value: props.value,
      onChange: props.onDateChanged,
      displayTime: true,
      disabled: expectedDisabled,
    }, 'Date picker properties should be correctly reported. It should be enabled')
    if (expectedError) {
      assert.isOk(datepicker.props().errorText, 'An error text should be displayed')
    } else {
      assert.isNotOk(datepicker.props().errorText, 'Error texxt should be hidden')
    }
  }))
})
