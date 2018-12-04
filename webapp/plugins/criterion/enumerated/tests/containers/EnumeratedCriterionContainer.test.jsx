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
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain } from '@regardsoss/domain'
import EnumeratedCriterionComponent from '../../src/components/EnumeratedCriterionComponent'
import { EnumeratedCriterionContainer } from '../../src/containers/EnumeratedCriterionContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/** Mock attribute for tests */
const mockAttribute = {
  label: 'label',
  name: 'Label',
  jsonPath: 'label',
  type: DamDomain.MODEL_ATTR_TYPES.STRING,
  boundsInformation: criterionTestSuiteHelpers.getBoundsInformationStub(),
}

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
        searchField: mockAttribute,
      },
      isFetching: false,
      availablePropertyValues: ['a', 'b', 'c'],
      state: EnumeratedCriterionContainer.DEFAULT_STATE,
      publishState: () => {},
      dispatchGetPropertyValues: () => { },
    }
    const enzymeWrapper = shallow(<EnumeratedCriterionContainer {...props} />, { context })
    // verify sub component is correctly instantiated
    const componentWrapper = enzymeWrapper.find(EnumeratedCriterionComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      searchAttribute: props.attributes.searchField,
      text: '', // no initial value
      availablePropertyValues: ['a', 'b', 'c'], // from available values
      inError: false, // initial state
      isFetching: false, // from props
      onUpdateTextFilter: enzymeWrapper.instance().onUpdateTextFilter, // callbacks
      onFilterSelected: enzymeWrapper.instance().onFilterSelected, // callbacks
    }, 'Component properties should be correctly reported')
  })
  it('should render correctly with initial value', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      attributes: {
        searchField: mockAttribute,
      },
      isFetching: false,
      availablePropertyValues: ['testValue'],
      state: {
        searchText: 'testValue',
        inError: false,
      },
      publishState: () => {},
      dispatchGetPropertyValues: () => { },
    }
    const enzymeWrapper = shallow(<EnumeratedCriterionContainer {...props} />, { context })
    // verify sub component is correctly instantiated
    const componentWrapper = enzymeWrapper.find(EnumeratedCriterionComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    assert.equal(componentWrapper.props().text, 'testValue', 'initial value should be correctly reported')
  })
  it('should update list and state when user changed the text', () => {
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
        searchField: mockAttribute,
      },
      isFetching: false,
      availablePropertyValues: [],
      state: EnumeratedCriterionContainer.DEFAULT_STATE,
      publishState: (nextState, requestParameters) => {
        spiedPublishData.nextState = nextState
        spiedPublishData.requestParameters = requestParameters
        spiedPublishData.count += 1
      },
      dispatchGetPropertyValues: (name, filterText) => {
        spiedDispatchData.name = name
        spiedDispatchData.filterText = filterText
        spiedDispatchData.count += 1
      },
    }
    const enzymeWrapper = shallow(<EnumeratedCriterionContainer {...props} />, { context })
    // run event, and check spied data
    enzymeWrapper.instance().onUpdateTextFilter('test text')
    assert.equal(spiedPublishData.count, 1, 'Data publishing should have been performed')
    assert.deepEqual(spiedPublishData.nextState, {
      searchText: 'test text',
      inError: false,
    }, 'Dispatched plugin state should be valid')
    assert.deepEqual(spiedPublishData.requestParameters, { q: 'label:"test text"' }, 'Dispatched plugin requestParameters should be valid')

    assert.equal(spiedDispatchData.count, 1, 'Dispatch should have been performed')
    assert.equal(spiedDispatchData.name, 'label', 'Dispatched attribute should be valid')
    assert.equal(spiedDispatchData.filterText, 'test text', 'Dispatched filter text should be valid')
  })
  it('should update correctly state on user item selection', () => {
    const spiedPublishData = {
      nextState: null,
      requestParameters: null,
      count: 0,
    }
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      attributes: {
        searchField: mockAttribute,
      },
      isFetching: false,
      availablePropertyValues: [],
      state: EnumeratedCriterionContainer.DEFAULT_STATE,
      dispatchGetPropertyValues: () => { },
      publishState: (nextState, requestParameters) => {
        spiedPublishData.nextState = nextState
        spiedPublishData.requestParameters = requestParameters
        spiedPublishData.count += 1
      },
    }
    const enzymeWrapper = shallow(<EnumeratedCriterionContainer {...props} />, { context })
    // 1 - test an item outside the list (should show error)
    enzymeWrapper.instance().onFilterSelected('test1', false)
    assert.equal(spiedPublishData.count, 1, '1 - Data publishing should have been performed')
    assert.deepEqual(spiedPublishData.nextState, {
      searchText: 'test1',
      inError: true,
    }, '1 - Dispatched plugin state should match data')
    assert.deepEqual(spiedPublishData.requestParameters, { q: 'label:"test1"' }, '1 - Dispatched plugin requestParameters should match data')

    // 2 - test an item inside the list (should not show error)
    enzymeWrapper.instance().onFilterSelected('test2', true)
    assert.equal(spiedPublishData.count, 2, '2 - Data publishing should have been performed')
    assert.deepEqual(spiedPublishData.nextState, {
      searchText: 'test2',
      inError: false,
    }, '2 - Dispatched plugin state should match data')
    assert.deepEqual(spiedPublishData.requestParameters, { q: 'label:"test2"' }, '2 - Dispatched plugin requestParameters should match data')
  })
})
