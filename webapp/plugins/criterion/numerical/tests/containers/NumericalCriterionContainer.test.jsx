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
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import { NumberRange } from '@regardsoss/plugins-api'
import { NumericalCriterionContainer } from '../../src/containers/NumericalCriterionContainer'
import styles from '../../src/styles/styles'
import NumericalCriterionComponent from '../../src/components/NumericalCriterionComponent'

const context = buildTestContext(styles)

/**
 * Test case for {@link NumericalCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[Numerical criterion] Testing the NumericalCriterionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(NumericalCriterionContainer)
    assert.isDefined(TextField)
  })
  it('should select correctly initial state for interger attributes', () => {
    const integerTypes = [DamDomain.MODEL_ATTR_TYPES.LONG, DamDomain.MODEL_ATTR_TYPES.INTEGER]
    integerTypes.forEach((type) => {
      const props = {
        attributes: {
          searchField: criterionTestSuiteHelpers.getAttributeStub(type, null,
            criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, -1, 36)),
        },
        label: criterionTestSuiteHelpers.getLabelStub(),
        publishState: () => {},
      }
      const enzymeWrapper = shallow(<NumericalCriterionContainer {...props} />, { context })
      const component = enzymeWrapper.find(NumericalCriterionComponent)
      assert.lengthOf(component, 1, 'There should be the component')
      testSuiteHelpers.assertWrapperProperties(component, {
        label: props.label,
        searchAttribute: props.attributes.searchField,
        error: false,
        value: '',
        operator: CommonDomain.EnumNumericalComparator.EQ,
        availableComparators: NumericalCriterionContainer.AVAILABLE_INT_COMPARATORS,
        onTextChange: enzymeWrapper.instance().onTextChange,
        onOperatorSelected: enzymeWrapper.instance().onOperatorSelected,
      }, 'Component properties should be correctly set')
    })
  })
  it('should select correctly initial state for floating attributes', () => {
    const floatingTypes = [DamDomain.MODEL_ATTR_TYPES.DOUBLE]
    floatingTypes.forEach((type) => {
      const props = {
        attributes: {
          searchField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DOUBLE, null,
            criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, 0, 777.777)),
        },
        label: criterionTestSuiteHelpers.getLabelStub(),
        publishState: () => {},
      }
      const enzymeWrapper = shallow(<NumericalCriterionContainer {...props} />, { context })
      const component = enzymeWrapper.find(NumericalCriterionComponent)
      assert.lengthOf(component, 1, 'There should be the component')
      testSuiteHelpers.assertWrapperProperties(component, {
        label: props.label,
        searchAttribute: props.attributes.searchField,
        error: false,
        value: '',
        operator: CommonDomain.EnumNumericalComparator.GE,
        availableComparators: NumericalCriterionContainer.AVAILABLE_FLOAT_COMPARATORS,
        onTextChange: enzymeWrapper.instance().onTextChange,
        onOperatorSelected: enzymeWrapper.instance().onOperatorSelected,
      }, 'Component properties should be correctly set')
    })
  })
  it('should publish state when value or operator changes, updating request parameters', () => {
    const spiedPublishStateData = {
      state: null,
      requestParameters: null,
    }
    const props = {
      attributes: {
        searchField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, -100, 100)),
      },
      label: criterionTestSuiteHelpers.getLabelStub(),
      state: {
        error: false,
        value: '12',
        operator: CommonDomain.EnumNumericalComparator.EQ,
      },
      publishState: (state, requestParameters) => {
        spiedPublishStateData.state = state
        spiedPublishStateData.requestParameters = requestParameters
      },
    }
    const enzymeWrapper = shallow(<NumericalCriterionContainer {...props} />, { context })
    const textInputTestCases = [{
      label: 'valid number selection',
      text: '42',
      expectedError: false,
      expectedQuery: { q: `${props.attributes.searchField.jsonPath}:42` },
    }, {
      label: 'non parsable number selection',
      text: 'abcde',
      expectedError: true,
      expectedQuery: { },
    }, {
      label: 'out of bound number selection',
      text: '-101',
      expectedError: true,
      expectedQuery: { },
    }]
    textInputTestCases.forEach(({
      label, text, expectedError, expectedQuery,
    }) => {
      enzymeWrapper.instance().onTextChange(null, text)
      assert.deepEqual(spiedPublishStateData.state, {
        error: expectedError,
        value: text,
        operator: CommonDomain.EnumNumericalComparator.EQ, // unchanged
      }, `[${label}] Value should have been updated`)
      assert.deepEqual(spiedPublishStateData.requestParameters, expectedQuery, `[${label}] Query should match updated value`)
    })

    const operatorTestCases = CommonDomain.EnumNumericalComparators.map((c) => ({
      label: `selecting comparator "${c}"`,
      comparator: c,
      expectedError: false,
      expectedQuery: {
        q: NumberRange.getNumberQueryParameter(props.attributes.searchField.jsonPath,
          NumberRange.convertToRange(12, c)).toQueryString(),
      },
    }))
    operatorTestCases.forEach(({
      label, comparator, expectedError, expectedQuery,
    }) => {
      enzymeWrapper.instance().onOperatorSelected(comparator)
      assert.deepEqual(spiedPublishStateData.state, {
        error: expectedError,
        value: '12',
        operator: comparator,
      }, `[${label}] Operator should have been updated`)
      assert.deepEqual(spiedPublishStateData.requestParameters, expectedQuery, `[${label}] Query should match updated operator`)
    })
  })
  it('should export correctly state to open search URL', () => {
    // 2 - test URL computing on instance
    const testAttribute = {
      ...criterionTestSuiteHelpers.getAttributeStub(),
      jsonPath: 'xptdr.myAttribute',
    }
    // 2.1 - = on negative number
    assert.deepEqual(NumericalCriterionContainer.convertToRequestParameters({ value: -0.41, operator: CommonDomain.EnumNumericalComparator.EQ }, testAttribute),
      { q: 'xptdr.myAttribute:\\-0.41' }, 'Attribute EQ -0.41 should be correctly exported')
    // 2.2 - = on positive number
    assert.deepEqual(NumericalCriterionContainer.convertToRequestParameters({ value: 56, operator: CommonDomain.EnumNumericalComparator.EQ }, testAttribute),
      { q: 'xptdr.myAttribute:56' }, 'Attribute EQ 56 should be correctly exported')
    // 2.3 - >= on positive number
    assert.deepEqual(NumericalCriterionContainer.convertToRequestParameters({ value: 0.3333, operator: CommonDomain.EnumNumericalComparator.GE }, testAttribute),
      { q: 'xptdr.myAttribute:[0.3333 TO *]' }, 'Attribute GE 0.3333 should be correctly exported')
    // 2.4 - <= on negative number
    assert.deepEqual(NumericalCriterionContainer.convertToRequestParameters({ value: -25, operator: CommonDomain.EnumNumericalComparator.LE }, testAttribute),
      { q: 'xptdr.myAttribute:[* TO \\-25]' }, '\\Attribute LE -25 should be correctly exported')
    // 2.5 - not exportable (no value)
    assert.isNotOk(NumericalCriterionContainer.convertToRequestParameters({ value: null, operator: CommonDomain.EnumNumericalComparator.EQ }, testAttribute).q,
      'No query should be exported without value')
    // 2.5 - not exportable (no attribute path)
    const notExportableAttribute = {
      ...criterionTestSuiteHelpers.getAttributeStub(),
      jsonPath: null,
    }
    assert.isNotOk(NumericalCriterionContainer.convertToRequestParameters({ value: -0.41, operator: CommonDomain.EnumNumericalComparator.EQ }, notExportableAttribute).q,
      'No query should be exported without attribute')
  })
})
