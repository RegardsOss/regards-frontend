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
import TextField from 'material-ui/TextField'
import { CommonDomain, DamDomain, UIDomain } from '@regardsoss/domain'
import { NumericalComparatorSelector } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import NumericalCriterionComponent from '../../src/components/NumericalCriterionComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test NumericalCriterionComponent
 * @author Raphaël Mechali
 */
describe('[Numerical criterion] Testing NumericalCriterionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NumericalCriterionComponent)
  })
  it('should render self and subcomponents enabled with bounds data', () => {
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, -1, 36)),
      error: false,
      value: '25',
      operator: CommonDomain.EnumNumericalComparator.LE,
      availableComparators: CommonDomain.EnumNumericalComparators,
      onTextChange: () => {},
      onOperatorSelected: () => {},
    }
    // test label rendering with each locale
    UIDomain.LOCALES.forEach((locale) => {
      const enzymeWrapper = shallow(<NumericalCriterionComponent {...props} />, {
        context: buildTestContext(styles, locale),
      })
      assert.include(enzymeWrapper.debug(), props.label[locale], 'Label should be rendered with current locale')
      const comparator = enzymeWrapper.find(NumericalComparatorSelector)
      assert.lengthOf(comparator, 1, 'There should be the comparator')
      testSuiteHelpers.assertWrapperProperties(comparator, {
        operator: props.operator,
        onSelect: props.onOperatorSelected,
        operators: props.availableComparators,
        disabled: false,
      }, 'Comparator selector properties set should be correctly set')

      const textField = enzymeWrapper.find(TextField)
      assert.lengthOf(textField, 1, 'There should be the comparator')
      testSuiteHelpers.assertWrapperProperties(textField, {
        errorText: null,
        value: props.value,
        onChange: props.onTextChange,
        disabled: false,
      }, 'Value field properties should be correctly set')
    })
  })
  it('should render xorrectly in error', () => {
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, -1, 36)),
      error: true,
      value: '105',
      operator: CommonDomain.EnumNumericalComparator.LE,
      availableComparators: CommonDomain.EnumNumericalComparators,
      onTextChange: () => {},
      onOperatorSelected: () => {},
    }
    const enzymeWrapper = shallow(<NumericalCriterionComponent {...props} />, { context })
    const textField = enzymeWrapper.find(TextField)
    assert.lengthOf(textField, 1, 'There should be the comparator')
    assert.isOk(textField.props().errorText, 'Error should be displayed')
  })
  it('should render self and subcomponents disabled without bounds data', () => {
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false)),
      error: false,
      value: '-56.12',
      operator: CommonDomain.EnumNumericalComparator.GE,
      availableComparators: [CommonDomain.EnumNumericalComparator.GE],
      onTextChange: () => {},
      onOperatorSelected: () => {},
    }
    const enzymeWrapper = shallow(<NumericalCriterionComponent {...props} />, { context })
    const comparator = enzymeWrapper.find(NumericalComparatorSelector)
    assert.lengthOf(comparator, 1, 'There should be the comparator')
    testSuiteHelpers.assertWrapperProperties(comparator, {
      operator: props.operator,
      onSelect: props.onOperatorSelected,
      operators: props.availableComparators,
      disabled: true,
    }, 'Comparator selector properties set should be correctly set')

    const textField = enzymeWrapper.find(TextField)
    assert.lengthOf(textField, 1, 'There should be the comparator')
    testSuiteHelpers.assertWrapperProperties(textField, {
      errorText: null,
      value: props.value,
      onChange: props.onTextChange,
      disabled: true,
    }, 'Value field properties should be correctly set')
  })
})
