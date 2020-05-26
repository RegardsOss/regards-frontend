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
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain } from '@regardsoss/domain'
import EnumeratedCriterionComponent from '../../src/components/EnumeratedCriterionComponent'
import { EnumeratedCriterionContainer } from '../../src/containers/EnumeratedCriterionContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link EnumeratedCriterionContainer}
 * @author Raphaël Mechali
 */
describe('[Enumerated criterion] Testing EnumeratedCriterionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(EnumeratedCriterionContainer)
  })
  it('should render correctly without initial value', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      attributes: {
        searchField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
      },
      searchContext: criterionTestSuiteHelpers.getSearchContextStub(),
      label: criterionTestSuiteHelpers.getLabelStub(),
      state: EnumeratedCriterionContainer.DEFAULT_STATE,
      isFetching: false,
      availablePropertyValues: ['a', 'b', 'c'],
      publishState: () => {},
      dispatchGetPropertyValues: () => { },
    }
    const enzymeWrapper = shallow(<EnumeratedCriterionContainer {...props} />, { context })
    // verify sub component is correctly instantiated
    const componentWrapper = enzymeWrapper.find(EnumeratedCriterionComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      label: props.label,
      searchAttribute: props.attributes.searchField,
      error: false,
      text: '',
      availablePropertyValues: props.availablePropertyValues,
      isFetching: props.isFetching,
      onUpdateTextFilter: enzymeWrapper.instance().onUpdateTextFilter, // callbacks
      onFilterSelected: enzymeWrapper.instance().onFilterSelected, // callbacks
    }, 'Component properties should be correctly reported')
  })
  it('should render correctly with initial value', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      attributes: {
        searchField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
      },
      searchContext: criterionTestSuiteHelpers.getSearchContextStub(),
      label: criterionTestSuiteHelpers.getLabelStub(),
      state: {
        searchText: 'testValue',
        error: true,
      },
      isFetching: false,
      availablePropertyValues: ['a', 'b', 'c'],
      publishState: () => {},
      dispatchGetPropertyValues: () => { },
    }
    const enzymeWrapper = shallow(<EnumeratedCriterionContainer {...props} />, { context })
    // verify sub component is correctly instantiated
    const componentWrapper = enzymeWrapper.find(EnumeratedCriterionComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      label: props.label,
      searchAttribute: props.attributes.searchField,
      error: true,
      text: 'testValue',
      availablePropertyValues: props.availablePropertyValues,
      isFetching: props.isFetching,
      onUpdateTextFilter: enzymeWrapper.instance().onUpdateTextFilter, // callbacks
      onFilterSelected: enzymeWrapper.instance().onFilterSelected, // callbacks
    }, 'Component properties should be correctly reported')
  })
  it('should update list when mounting and state when user changed the text', () => {
    const spiedDispatchData = {
      name: null,
      filterText: null,
      count: 0,
    }
    const spiedPublishData = {
      nextState: null,
      requestParameters: null,
      count: 0,
    }
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      attributes: {
        searchField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
      },
      searchContext: criterionTestSuiteHelpers.getSearchContextStub(),
      label: criterionTestSuiteHelpers.getLabelStub(),
      state: {
        error: false,
        searchText: 'b',
      },
      isFetching: false,
      availablePropertyValues: ['a', 'b', 'c'],
      publishState: (nextState, requestParameters) => {
        spiedPublishData.nextState = nextState
        spiedPublishData.requestParameters = requestParameters
        spiedPublishData.count += 1
      },
      dispatchGetPropertyValues: (name, filterText, searchParameters) => {
        spiedDispatchData.name = name
        spiedDispatchData.filterText = filterText
        spiedDispatchData.searchParameters = searchParameters
        spiedDispatchData.count += 1
      },
    }
    const enzymeWrapper = shallow(<EnumeratedCriterionContainer {...props} />, { context })
    // 0 - Check dispatch was initially called (due to timer, it is not possible to test it later here)
    assert.equal(spiedDispatchData.count, 1, '0 - Dispatch should have been performed')
    assert.equal(spiedDispatchData.name, props.attributes.searchField.jsonPath, '0 - Dispatched attribute path should be valid')
    assert.equal(spiedDispatchData.filterText, props.state.searchText, '0 - Dispatched filter text should be valid')
    assert.deepEqual(spiedDispatchData.searchParameters, props.searchContext.searchParameters, '0 - Dispatched parameters form context should be reported')

    // 1 - Test with unexisting option
    enzymeWrapper.instance().onUpdateTextFilter('test text')
    assert.equal(spiedPublishData.count, 1, '1 - Data publishing should have been performed')
    assert.deepEqual(spiedPublishData.nextState, {
      searchText: 'test text',
      error: true,
    }, '1 - Dispatched plugin state should be correctly computed (with an error as text is not an available option)')
    assert.deepEqual(spiedPublishData.requestParameters, {},
      '1 - No query parameter should be built in error state')

    // 2 - Test with existing option
    enzymeWrapper.instance().onUpdateTextFilter('c')
    assert.equal(spiedPublishData.count, 2, '2 - Data publishing should have been performed')
    assert.deepEqual(spiedPublishData.nextState, {
      searchText: 'c',
      error: false,
    }, '2 - Dispatched plugin state should be correctly computed (without error as text is an available option)')
    assert.deepEqual(spiedPublishData.requestParameters, { q: `${props.attributes.searchField.jsonPath}:"c"` },
      '2 - Query parameter should be correctly built outside error state')
  })
  it('should update correctly state on user item selection', () => {
    const spiedDispatchData = {
      name: null,
      filterText: null,
      count: 0,
    }
    const spiedPublishData = {
      nextState: null,
      requestParameters: null,
      count: 0,
    }
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      attributes: {
        searchField: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
      },
      searchContext: criterionTestSuiteHelpers.getSearchContextStub(),
      label: criterionTestSuiteHelpers.getLabelStub(),
      state: EnumeratedCriterionContainer.DEFAULT_STATE,
      isFetching: false,
      availablePropertyValues: ['t1', 't2'],
      publishState: (nextState, requestParameters) => {
        spiedPublishData.nextState = nextState
        spiedPublishData.requestParameters = requestParameters
        spiedPublishData.count += 1
      },
      dispatchGetPropertyValues: (name, filterText, searchParameters) => {
        spiedDispatchData.name = name
        spiedDispatchData.filterText = filterText
        spiedDispatchData.searchParameters = searchParameters
        spiedDispatchData.count += 1
      },
    }
    const enzymeWrapper = shallow(<EnumeratedCriterionContainer {...props} />, { context })
    // 0 - Check dispatch was initially called (due to timer, it is not possible to test it later here)
    assert.equal(spiedDispatchData.count, 1, '0 - Dispatch should have been performed')
    assert.equal(spiedDispatchData.name, props.attributes.searchField.jsonPath, '0 - Dispatched attribute path should be valid')
    assert.equal(spiedDispatchData.filterText, props.state.searchText, '0 - Dispatched filter text should be valid')
    assert.deepEqual(spiedDispatchData.searchParameters, props.searchContext.searchParameters, '0 - Dispatched parameters form context should be reported')

    // 1 - Test with unexisting option
    enzymeWrapper.instance().onFilterSelected('test1')
    assert.equal(spiedPublishData.count, 1, '1 - Data publishing should have been performed')
    assert.deepEqual(spiedPublishData.nextState, {
      searchText: 'test1',
      error: true,
    }, '1 - Dispatched plugin state should be correctly computed (with an error as text is not an available option)')
    assert.deepEqual(spiedPublishData.requestParameters, {},
      '1 - No query parameter should be built in error state')

    // 2 - Test with existing option
    enzymeWrapper.instance().onUpdateTextFilter('t1')
    assert.equal(spiedPublishData.count, 2, '2 - Data publishing should have been performed')
    assert.deepEqual(spiedPublishData.nextState, {
      searchText: 't1',
      error: false,
    }, '2 - Dispatched plugin state should be correctly computed (without error as text is an available option)')
    assert.deepEqual(spiedPublishData.requestParameters, { q: `${props.attributes.searchField.jsonPath}:"t1"` },
      '2 - Query parameter should be correctly built outside error state')
  })
})
