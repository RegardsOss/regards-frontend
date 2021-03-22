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
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import { NumericalComparatorSelector } from '@regardsoss/components'
import CriterionComponent from '../../src/components/CriterionComponent'
import CriterionContainer from '../../src/containers/CriterionContainer'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test CriterionComponent
 * @author Lasserre Théo
 */
describe('[numerical-range-criteria] Testing CriterionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CriterionComponent)
  })
  it('should render correctly with all locales', () => {
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),
      lowerBound: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '10', '100')),
      upperBound: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '50', '500')),
      error: false,
      value: '50',
      operator: CriterionContainer.DEFAULT_STATE.operator,
      availableComparators: CriterionContainer.AVAILABLE_COMPARATORS,
      onTextChange: () => {},
      onOperatorSelected: () => {},
    }
    UIDomain.LOCALES.forEach((locale) => {
      const enzymeWrapper = shallow(<CriterionComponent {...props} />, {
        context: buildTestContext(styles, locale),
      })
      assert.include(enzymeWrapper.debug(), props.label[locale])
    })
  })
  const testCases = [{
    label: 'in error',
    specificProps: {
      error: true,
    },
    expectedError: true,
  }, {
    label: 'without error',
    specificProps: { },
    expectedError: false,
  }]

  testCases.forEach(({
    label, specificProps, expectedError, expectedDisabled,
  }) => it(`should render correctly ${label}`, () => {
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),
      lowerBound: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '10', '100')),
      upperBound: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '50', '500')),
      error: false,
      value: '50',
      operator: CriterionContainer.DEFAULT_STATE.operator,
      availableComparators: CriterionContainer.AVAILABLE_COMPARATORS,
      onTextChange: () => {},
      onOperatorSelected: () => {},
      ...specificProps,
    }
    const enzymeWrapper = shallow(<CriterionComponent {...props} />, { context })

    const comparator = enzymeWrapper.find(NumericalComparatorSelector)
    assert.lengthOf(comparator, 1, 'There should be the comparator selector')
    testSuiteHelpers.assertWrapperProperties(comparator, {
      operator: props.operator,
      operators: props.availableComparators,
      onSelect: props.onOperatorSelected,
    }, 'Comparator properties should be correctly reported. It should be enabled')

    const textField = enzymeWrapper.find(TextField)
    assert.lengthOf(textField, 1, 'There should be the text field')
    testSuiteHelpers.assertWrapperProperties(textField, {
      value: props.value,
      onChange: props.onTextChange,
    }, 'Text field properties should be correctly reported.')
    if (expectedError) {
      assert.isOk(textField.props().errorText, 'An error text should be displayed')
    } else {
      assert.isNotOk(textField.props().errorText, 'Error texxt should be hidden')
    }
  }))
})
