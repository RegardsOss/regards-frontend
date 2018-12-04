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
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import { DatePickerField, NumericalComparator } from '@regardsoss/components'
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
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(TemporalCriterionContainer)
    assert.isDefined(NumericalComparator)
    assert.isDefined(DatePickerField)
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
      attributes: {
        searchField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '2017-09-27T13:15:42.726Z', '2018-09-27T13:15:42.726Z')),
      },
      state: {
        value: '2017-09-27T13:15:42.726Z',
        operator: CommonDomain.EnumNumericalComparator.GE,
      },
      publishState: (state, requestParameters) => {
        spiedPublishStateData.count += 1
        spiedPublishStateData.state = state
        spiedPublishStateData.requestParameters = requestParameters
      },
    }
    const enzymeWrapper = shallow(<TemporalCriterionContainer {...props} />, { context })
    const component = enzymeWrapper.find(TemporalCriterionComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    testSuiteHelpers.assertWrapperProperties(component, {
      searchAttribute: props.attributes.searchField,
      value: new Date(props.state.value),
      operator: props.state.operator,
      availableComparators: TemporalCriterionContainer.AVAILABLE_COMPARISON_OPERATORS,
      onDateChanged: enzymeWrapper.instance().onDateChanged,
      onOperatorSelected: enzymeWrapper.instance().onOperatorSelected,
    }, 'Component properties should be correctly set')

    // Test publish state on values update
    enzymeWrapper.instance().onDateChanged(new Date('2019-01-01T01:12:42.726Z'))
    assert.equal(spiedPublishStateData.count, 1, 'onDateChanged: publish should have been called')
    assert.deepEqual(spiedPublishStateData.state, {
      value: '2019-01-01T01:12:42.726Z',
      operator: CommonDomain.EnumNumericalComparator.GE,
    }, 'onDateChanged: new state should be correctly computed from props and new value')
    assert.isDefined(spiedPublishStateData.requestParameters, 'onDateChanged: Query should have been computed (tested later)')

    enzymeWrapper.instance().onOperatorSelected(CommonDomain.EnumNumericalComparator.LE)
    assert.equal(spiedPublishStateData.count, 2, 'onOperatorSelected: publish should have been called')
    assert.deepEqual(spiedPublishStateData.state, {
      value: '2017-09-27T13:15:42.726Z',
      operator: CommonDomain.EnumNumericalComparator.LE,
    }, 'onOperatorSelected: new state should be correctly computed from props and new value')
    assert.isDefined(spiedPublishStateData.requestParameters, 'onOperatorSelected: Query should have been computed (tested later)')
  })
  it('should convert correctly state into query', () => {
    const attribute = {
      ...criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601),
      jsonPath: 'my.fragment.date1',
    }
    // 1 - <=
    assert.deepEqual(TemporalCriterionContainer.convertToRequestParameters(
      { value: '2017-09-27T13:15:42.726Z', operator: CommonDomain.EnumNumericalComparator.LE }, attribute),
    { q: 'my.fragment.date1:[* TO 2017-09-27T13:15:42.726Z]' }, '1 - should generate right query')

    // 2 - >=
    assert.deepEqual(TemporalCriterionContainer.convertToRequestParameters(
      { value: '2019-01-01T01:12:42.726Z', operator: CommonDomain.EnumNumericalComparator.GE }, attribute),
    { q: 'my.fragment.date1:[2019-01-01T01:12:42.726Z TO *]' }, '2 - should generate right query')

    // 3 - No date
    assert.isNotOk(TemporalCriterionContainer.convertToRequestParameters({ value: null, operator: CommonDomain.EnumNumericalComparator.GE }, attribute).q,
      '3.1 - should generate no query for null date')
    assert.isNotOk(TemporalCriterionContainer.convertToRequestParameters({ operator: CommonDomain.EnumNumericalComparator.GE }, attribute).q,
      '3.2 - should generate no query for undefined date')

    // 4 - No operator
    assert.isNotOk(TemporalCriterionContainer.convertToRequestParameters({ value: '2017-09-27T13:15:42.726Z]', operator: null }, attribute).q,
      '3.1 - should generate no query for null operator')
    assert.isNotOk(TemporalCriterionContainer.convertToRequestParameters({ value: '2017-09-27T13:15:42.726Z]' }, attribute).q,
      '3.2 - should generate no query for undefined operator')
    // 5 - No json path in attribute
    const attribute2 = { ...attribute, jsonPath: null }
    assert.isNotOk(TemporalCriterionContainer.convertToRequestParameters(
      { value: '2019-01-01T01:12:42.726Z', operator: CommonDomain.EnumNumericalComparator.GE }, attribute2).q,
    '5 - should generate no query for missing jsonPath')
  })
})
