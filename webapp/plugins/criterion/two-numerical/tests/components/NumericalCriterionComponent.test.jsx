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
import TextField from 'material-ui/TextField'
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import { NumericalComparatorSelector } from '@regardsoss/components'
import { BOUND_TYPE } from '@regardsoss/plugins-api'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import NumericalCriterionComponent from '../../src/components/NumericalCriterionComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test NumericalCriterionComponent
 * @author Raphaël Mechali
 */
describe('[Two numerical criteria] Testing NumericalCriterionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NumericalCriterionComponent)
  })
  it('should render self and subcomponents enabled with bounds data', () => {
    const props = {
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, -1, 36)),
      fieldBoundType: BOUND_TYPE.ANY_BOUND,
      error: false,
      value: '25',
      comparator: CommonDomain.EnumNumericalComparator.LE,
      availableComparators: CommonDomain.EnumNumericalComparators,
      onChange: () => {},
    }
    const enzymeWrapper = shallow(<NumericalCriterionComponent {...props} />, { context })
    const comparator = enzymeWrapper.find(NumericalComparatorSelector)
    assert.lengthOf(comparator, 1, 'There should be the comparator')
    testSuiteHelpers.assertWrapperProperties(comparator, {
      operator: props.comparator,
      operators: props.availableComparators,
      onSelect: enzymeWrapper.instance().onComparatorSelected,
      disabled: false,
    }, 'Comparator selector properties set should be correctly set')

    const textField = enzymeWrapper.find(TextField)
    assert.lengthOf(textField, 1, 'There should be the comparator')
    testSuiteHelpers.assertWrapperProperties(textField, {
      value: props.value,
      onChange: enzymeWrapper.instance().onTextChange,
      disabled: false,
    }, 'Value field properties should be correctly set')
    assert.isNotOk(textField.props().errorText, 'No error should be displayed')
  })
  it('should render self and subcomponents disabled without bounds data', () => {
    const props = {
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DOUBLE, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false)),
      fieldBoundType: BOUND_TYPE.ANY_BOUND,
      error: false,
      value: '-56.12',
      comparator: CommonDomain.EnumNumericalComparator.GE,
      availableComparators: [CommonDomain.EnumNumericalComparator.GE],
      onChange: () => {},
    }
    const enzymeWrapper = shallow(<NumericalCriterionComponent {...props} />, { context })
    const comparator = enzymeWrapper.find(NumericalComparatorSelector)
    assert.lengthOf(comparator, 1, 'There should be the comparator')
    testSuiteHelpers.assertWrapperProperties(comparator, {
      operator: props.comparator,
      operators: props.availableComparators,
      onSelect: enzymeWrapper.instance().onComparatorSelected,
      disabled: true,
    }, 'Comparator selector properties set should be correctly set')

    const textField = enzymeWrapper.find(TextField)
    assert.lengthOf(textField, 1, 'There should be the comparator')
    testSuiteHelpers.assertWrapperProperties(textField, {
      value: props.value,
      onChange: enzymeWrapper.instance().onTextChange,
      disabled: true,
    }, 'Value field properties should be correctly set')
    assert.isNotOk(textField.props().errorText, 'No error should be displayed')
  })
  it('should render error status correctly', () => {
    const props = {
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, -1, 36)),
      fieldBoundType: BOUND_TYPE.ANY_BOUND,
      error: true,
      value: '25',
      comparator: CommonDomain.EnumNumericalComparator.LE,
      availableComparators: CommonDomain.EnumNumericalComparators,
      onChange: () => {},
    }
    const enzymeWrapper = shallow(<NumericalCriterionComponent {...props} />, { context })

    const textField = enzymeWrapper.find(TextField)
    assert.lengthOf(textField, 1, 'There should be the comparator')
    assert.isOk(textField.props().errorText, 'Some error text should be displayed')
  })
})
