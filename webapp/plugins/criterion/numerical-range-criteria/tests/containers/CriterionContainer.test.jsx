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
import { CatalogDomain, DamDomain, CommonDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import { CriterionContainer } from '../../src/containers/CriterionContainer'
import CriterionComponent from '../../src/components/CriterionComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link SampleCriteria}
 *
 * @author Lasserre Théo
 */
describe('[NUMERICAL RANGE CRITERIA] Testing CriterionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(CriterionContainer)
  })
  it('should render and publish state on operator and value selection', () => {
    const spiedPublishStateData = {
      count: 0,
      state: null,
      requestParameters: null,
    }
    const props = {
      pluginInstanceId: 'any',
      searchContext: {
        engineType: CatalogDomain.LEGACY_SEARCH_ENGINE,
        searchParameters: {},
      },
      label: criterionTestSuiteHelpers.getLabelStub(),
      attributes: {
        lowerBound: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '10', '100')),
        upperBound: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '50', '500')),
      },
      publishState: (state, requestParameters) => {
        spiedPublishStateData.count += 1
        spiedPublishStateData.state = state
        spiedPublishStateData.requestParameters = requestParameters
      },
    }
    const enzymeWrapper = shallow(<CriterionContainer {...props} />, { context })
    // A - Check default state was selected
    let component = enzymeWrapper.find(CriterionComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(component, {
      label: props.label,
      lowerBound: props.attributes.lowerBound,
      upperBound: props.attributes.upperBound,
      error: CriterionContainer.DEFAULT_STATE.error,
      value: CriterionContainer.DEFAULT_STATE.value,
      operator: CriterionContainer.DEFAULT_STATE.operator,
      availableComparators: CriterionContainer.AVAILABLE_COMPARATORS,
      onTextChange: enzymeWrapper.instance().onTextChange,
      onOperatorSelected: enzymeWrapper.instance().onOperatorSelected,
    }, 'Component properties should be correctly set')

    // B - Run successive tests with operator and value change
    const testCases = [{
      label: 'valid value selection',
      changeValue: () => enzymeWrapper.instance().onTextChange(null, '50'),
      expectedError: false,
      expectedValue: '50',
      expectedOperator: CriterionContainer.DEFAULT_STATE.operator,
      // nota date is transferred to GMT 0
      expectedQuery: { q: `${props.attributes.lowerBound.jsonPath}:[* TO 50] AND ${props.attributes.upperBound.jsonPath}:[50 TO *]` },
    }, {
      label: 'valid operator selection',
      changeValue: () => enzymeWrapper.instance().onOperatorSelected(CommonDomain.EnumNumericalComparator.SG),
      expectedError: false,
      expectedValue: '50',
      expectedOperator: CommonDomain.EnumNumericalComparator.SG,
      // nota date is transferred to GMT 0
      expectedQuery: { q: `${props.attributes.upperBound.jsonPath}:[50 TO *]` },
    }, {
      label: 'invalid value selection',
      changeValue: () => enzymeWrapper.instance().onTextChange(null, '600'),
      expectedError: true,
      expectedValue: '600',
      expectedOperator: CommonDomain.EnumNumericalComparator.SG,
      expectedQuery: { }, // no query
    }, {
      label: 'back to valid state by changing operator',
      changeValue: () => enzymeWrapper.instance().onOperatorSelected(CommonDomain.EnumNumericalComparator.SL),
      expectedError: false,
      expectedValue: '600',
      expectedOperator: CommonDomain.EnumNumericalComparator.SL,
      expectedQuery: { q: `${props.attributes.lowerBound.jsonPath}:[* TO 600]` },
    }]
    let spiedCount = 0
    testCases.forEach(({
      label, changeValue,
      expectedError, expectedValue, expectedOperator,
      expectedQuery,
    }, caseIndex) => {
      spiedCount += 1
      changeValue()
      // check publish was called
      assert.equal(spiedPublishStateData.count, spiedCount, `#${caseIndex} ${label}: Publish should have been called`)
      // check new state is valid
      assert.deepEqual(spiedPublishStateData.state, {
        error: expectedError,
        value: expectedValue,
        operator: expectedOperator,
      }, `#${caseIndex} ${label}: New state should be valid`)
      // check new query is valid
      assert.deepEqual(spiedPublishStateData.requestParameters, expectedQuery,
        `#${caseIndex} ${label}: Query should be correctly computed`)
      // apply published state
      enzymeWrapper.setProps({
        ...props,
        state: spiedPublishStateData.state,
      })
      // check new properties are transfered to component
      component = enzymeWrapper.find(CriterionComponent)
      assert.lengthOf(component, 1, `#${caseIndex} ${label}: There should be the component`)
      testSuiteHelpers.assertWrapperProperties(component, {
        error: expectedError,
        value: expectedValue,
        operator: expectedOperator,
      }, `#${caseIndex} ${label}: Mutable properties should be correctly reported to the component`)
    })
  })
})
