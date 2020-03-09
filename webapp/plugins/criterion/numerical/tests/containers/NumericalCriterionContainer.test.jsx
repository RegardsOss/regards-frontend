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
  it('should render correctly with integer type criterion', () => {
    const props = {
      pluginInstanceId: 'any',
      attributes: {
        searchField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.LONG, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, -1, 36)),
      },
      state: NumericalCriterionContainer.DEFAULT_INTEGER_TYPE_STATE,
      publishState: () => {},
    }
    const enzymeWrapper = shallow(<NumericalCriterionContainer {...props} />, { context })
    let component = enzymeWrapper.find(NumericalCriterionComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(component, {
      searchAttribute: props.attributes.searchField,
      value: null,
      operator: CommonDomain.EnumNumericalComparator.EQ,
      availableComparators: NumericalCriterionContainer.AVAILABLE_INT_COMPARATORS,
      onTextInput: enzymeWrapper.instance().onTextInput,
      onOperatorSelected: enzymeWrapper.instance().onOperatorSelected,
    }, '1 - Component properties should be correctly set')

    // 2 - After state updates
    enzymeWrapper.setProps({
      ...props,
      state: {
        value: 25,
        operator: CommonDomain.EnumNumericalComparator.LE,
      },
    })
    component = enzymeWrapper.find(NumericalCriterionComponent)
    testSuiteHelpers.assertWrapperProperties(component, {
      searchAttribute: props.attributes.searchField,
      value: 25,
      operator: CommonDomain.EnumNumericalComparator.LE,
      availableComparators: NumericalCriterionContainer.AVAILABLE_INT_COMPARATORS,
      onTextInput: enzymeWrapper.instance().onTextInput,
      onOperatorSelected: enzymeWrapper.instance().onOperatorSelected,
    }, '2 - Component properties should be correctly set')
  })
  it('should render correctly with float type criterion', () => {
    const props = {
      pluginInstanceId: 'any',
      attributes: {
        searchField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DOUBLE, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, 0, 777.777)),
      },
      state: NumericalCriterionContainer.DEFAULT_FLOATING_TYPE_STATE,
      publishState: () => {},
    }
    const enzymeWrapper = shallow(<NumericalCriterionContainer {...props} />, { context })
    let component = enzymeWrapper.find(NumericalCriterionComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(component, {
      searchAttribute: props.attributes.searchField,
      value: null,
      operator: CommonDomain.EnumNumericalComparator.GE,
      availableComparators: NumericalCriterionContainer.AVAILABLE_FLOAT_COMPARATORS,
      onTextInput: enzymeWrapper.instance().onTextInput,
      onOperatorSelected: enzymeWrapper.instance().onOperatorSelected,
    }, '1 - Component properties should be correctly set')

    // 2 - After state updates
    enzymeWrapper.setProps({
      ...props,
      state: {
        value: 95.5,
        operator: CommonDomain.EnumNumericalComparator.LE,
      },
    })
    component = enzymeWrapper.find(NumericalCriterionComponent)
    testSuiteHelpers.assertWrapperProperties(component, {
      searchAttribute: props.attributes.searchField,
      value: 95.5,
      operator: CommonDomain.EnumNumericalComparator.LE,
      availableComparators: NumericalCriterionContainer.AVAILABLE_FLOAT_COMPARATORS,
      onTextInput: enzymeWrapper.instance().onTextInput,
      onOperatorSelected: enzymeWrapper.instance().onOperatorSelected,
    }, '2 - Component properties should be correctly set')
  })
  it('should publish state when value or operator changes', () => {
    const spiedPublishStateData = {
      state: null,
      requestParameters: null,
    }
    const props = {
      pluginInstanceId: 'any',
      attributes: {
        searchField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, -100, 100)),
      },
      state: NumericalCriterionContainer.DEFAULT_INTEGER_TYPE_STATE,
      publishState: (state, requestParameters) => {
        spiedPublishStateData.state = state
        spiedPublishStateData.requestParameters = requestParameters
      },
    }
    const enzymeWrapper = shallow(<NumericalCriterionContainer {...props} />, { context })
    enzymeWrapper.instance().onTextInput(null, '42')
    assert.deepEqual(spiedPublishStateData.state, {
      value: 42,
      operator: CommonDomain.EnumNumericalComparator.EQ,
    }, 'Value should have been updated')
    assert.deepEqual(spiedPublishStateData.requestParameters, { q: 'test:42' }, 'Query should match updated value')

    // mimic the map state to props behavior (unavailable in tests)
    enzymeWrapper.setProps({
      ...props,
      state: {
        value: 42,
        operator: CommonDomain.EnumNumericalComparator.EQ,
      },
    })

    enzymeWrapper.instance().onOperatorSelected(CommonDomain.EnumNumericalComparator.LE)
    assert.deepEqual(spiedPublishStateData.state, {
      value: 42,
      operator: CommonDomain.EnumNumericalComparator.LE,
    }, 'Operator should have been updated')
    assert.deepEqual(spiedPublishStateData.requestParameters, { q: 'test:[* TO 42]' }, 'Query should match updated operator')
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
