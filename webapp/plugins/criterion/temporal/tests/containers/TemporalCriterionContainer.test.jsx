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
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import { TemporalCriterionContainer } from '../../src/containers/TemporalCriterionContainer'
import TemporalCriterionComponent from '../../src/components/TemporalCriterionComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link TemporalCriterionContainer}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[Temporal criterion] Testing TemporalCriterionContainer', () => {
  // override timezone offset to make it constant for tests (+3h) - avoids tests issues on other timezones
  let savedGetTimezoneOffset
  before(() => {
    savedGetTimezoneOffset = Date.prototype.getTimezoneOffset
    // eslint-disable-next-line no-extend-native
    Date.prototype.getTimezoneOffset = () => 180 // in minutes
    testSuiteHelpers.before()
  })
  after(() => {
    // eslint-disable-next-line no-extend-native
    Date.prototype.getTimezoneOffset = savedGetTimezoneOffset
    testSuiteHelpers.after()
  })
  it('should exists', () => {
    assert.isDefined(TemporalCriterionContainer)
  })
  it('should render and publish state on operator and date selection', () => {
    const spiedPublishStateData = {
      count: 0,
      state: null,
      requestParameters: null,
    }
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      label: criterionTestSuiteHelpers.getLabelStub(),
      attributes: {
        searchField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '2017-09-27T13:15:42.726Z', '2018-09-27T13:15:42.726Z')),
      },
      publishState: (state, requestParameters) => {
        spiedPublishStateData.count += 1
        spiedPublishStateData.state = state
        spiedPublishStateData.requestParameters = requestParameters
      },
    }
    const enzymeWrapper = shallow(<TemporalCriterionContainer {...props} />, { context })
    // A - Check default state was selected
    let component = enzymeWrapper.find(TemporalCriterionComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(component, {
      pluginInstanceId: props.pluginInstanceId,
      error: TemporalCriterionContainer.DEFAULT_STATE.error,
      label: props.label,
      searchAttribute: props.attributes.searchField,
      value: null,
      operator: TemporalCriterionContainer.DEFAULT_STATE.operator,
      availableComparators: TemporalCriterionContainer.AVAILABLE_COMPARISON_OPERATORS,
      onDateChanged: enzymeWrapper.instance().onDateChanged,
      onOperatorSelected: enzymeWrapper.instance().onOperatorSelected,
    }, 'A - Component properties should be correctly set')

    // B - Run successive tests with operator and date change
    const testCases = [{
      label: 'valid date selection',
      changeValue: () => enzymeWrapper.instance().onDateChanged(new Date('2018-01-01T01:12:42.726Z')),
      expectedError: false,
      expectedTime: new Date('2018-01-01T01:12:42.726Z').getTime(),
      expectedOperator: TemporalCriterionContainer.DEFAULT_STATE.operator,
      // nota date is transferred to GMT 0
      expectedQuery: { q: `${props.attributes.searchField.jsonPath}:[* TO 2017-12-31T22:12:42.726Z]` },
    }, {
      label: 'valid operator selection',
      changeValue: () => enzymeWrapper.instance().onOperatorSelected(CommonDomain.EnumNumericalComparator.GE),
      expectedError: false,
      expectedTime: new Date('2018-01-01T01:12:42.726Z').getTime(),
      expectedOperator: CommonDomain.EnumNumericalComparator.GE,
      // nota date is transferred to GMT 0
      expectedQuery: { q: `${props.attributes.searchField.jsonPath}:[2017-12-31T22:12:42.726Z TO *]` },
    }, {
      label: 'invalid date selection',
      changeValue: () => enzymeWrapper.instance().onDateChanged(new Date('2025-01-01T12:40:42.726Z')),
      expectedError: true,
      expectedTime: new Date('2025-01-01T12:40:42.726Z').getTime(),
      expectedOperator: CommonDomain.EnumNumericalComparator.GE,
      expectedQuery: { }, // no query
    }, {
      label: 'back to valid state by changing operator',
      changeValue: () => enzymeWrapper.instance().onOperatorSelected(CommonDomain.EnumNumericalComparator.LE),
      expectedError: false,
      expectedTime: new Date('2025-01-01T12:40:42.726Z').getTime(),
      expectedOperator: CommonDomain.EnumNumericalComparator.LE,
      expectedQuery: { q: `${props.attributes.searchField.jsonPath}:[* TO 2025-01-01T09:40:42.726Z]` },
    }]
    let spiedCount = 0
    testCases.forEach(({
      label, changeValue,
      expectedError, expectedTime, expectedOperator,
      expectedQuery,
    }, caseIndex) => {
      spiedCount += 1
      changeValue()
      // check publish was called
      assert.equal(spiedPublishStateData.count, spiedCount, `#${caseIndex} ${label}: Publish should have been called`)
      // check new state is valid
      assert.deepEqual(spiedPublishStateData.state, {
        error: expectedError,
        time: expectedTime,
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
      component = enzymeWrapper.find(TemporalCriterionComponent)
      assert.lengthOf(component, 1, `#${caseIndex} ${label}: There should be the component`)
      testSuiteHelpers.assertWrapperProperties(component, {
        error: expectedError,
        value: new Date(expectedTime),
        operator: expectedOperator,
      }, `#${caseIndex} ${label}: Mutable properties should be correctly reported to the component`)
    })
  })
})
