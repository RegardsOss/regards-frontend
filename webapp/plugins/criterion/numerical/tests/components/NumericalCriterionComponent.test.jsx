/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { NumericalComparator } from '@regardsoss/components'
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
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, -1, 36)),
      value: 25,
      operator: CommonDomain.EnumNumericalComparator.LE,
      availableComparators: CommonDomain.EnumNumericalComparators,
      onTextInput: () => {},
      onOperatorSelected: () => {},
    }
    const enzymeWrapper = shallow(<NumericalCriterionComponent {...props} />, { context })
    const comparator = enzymeWrapper.find(NumericalComparator)
    assert.lengthOf(comparator, 1, 'There should be the comparator')
    testSuiteHelpers.assertWrapperProperties(comparator, {
      value: props.operator,
      onChange: props.onOperatorSelected,
      comparators: props.availableComparators,
      disabled: false,
    }, 'Comparator selector properties set should be correctly set')

    const textField = enzymeWrapper.find(TextField)
    assert.lengthOf(textField, 1, 'There should be the comparator')
    testSuiteHelpers.assertWrapperProperties(textField, {
      value: NumericalCriterionComponent.toText(props.value),
      onChange: props.onTextInput,
      disabled: false,
    }, 'Value field properties should be correctly set')
  })
  it('should render self and subcomponents disabled without bounds data', () => {
    const props = {
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false)),
      value: -56.12,
      operator: CommonDomain.EnumNumericalComparator.GE,
      availableComparators: [CommonDomain.EnumNumericalComparator.GE],
      onTextInput: () => {},
      onOperatorSelected: () => {},
    }
    const enzymeWrapper = shallow(<NumericalCriterionComponent {...props} />, { context })
    const comparator = enzymeWrapper.find(NumericalComparator)
    assert.lengthOf(comparator, 1, 'There should be the comparator')
    testSuiteHelpers.assertWrapperProperties(comparator, {
      value: props.operator,
      onChange: props.onOperatorSelected,
      comparators: props.availableComparators,
      disabled: true,
    }, 'Comparator selector properties set should be correctly set')

    const textField = enzymeWrapper.find(TextField)
    assert.lengthOf(textField, 1, 'There should be the comparator')
    testSuiteHelpers.assertWrapperProperties(textField, {
      value: NumericalCriterionComponent.toText(props.value),
      onChange: props.onTextInput,
      disabled: true,
    }, 'Value field properties should be correctly set')
  })
})
