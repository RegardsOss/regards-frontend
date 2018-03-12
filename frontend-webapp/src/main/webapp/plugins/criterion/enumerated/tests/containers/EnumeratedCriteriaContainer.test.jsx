/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import EnumeratedCriteriaComponent from '../../src/components/EnumeratedCriteriaComponent'
import { EnumeratedCriteriaContainer } from '../../src/containers/EnumeratedCriteriaContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link EnumeratedCriteriaContainer}
 * @author Raphaël Mechali
 */
describe('[enumerated criteria plugin] Testing EnumeratedCriteriaContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(EnumeratedCriteriaContainer)
  })
  it('should render correctly without initial value', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      registerClear: () => { },
      attributes: {
        searchField: {
          label: 'label',
          name: 'Label',
          jsonPath: 'label',
          type: 'STRING',
        },
      },
      isFetching: false,
      availablePropertyValues: ['a', 'b', 'c'],
      dispatchGetPropertyValues: () => { },
    }
    const enzymeWrapper = shallow(<EnumeratedCriteriaContainer {...props} />, { context })
    // verify sub component is correctly instantiated
    const componentWrapper = enzymeWrapper.find(EnumeratedCriteriaComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      attributeLabel: 'label', // from attribute
      text: '', // no initial value
      availablePropertyValues: ['a', 'b', 'c'], // from available values
      isInError: false, // initial state
      isFetching: false, // from props
      onUpdateTextFilter: enzymeWrapper.instance().onUpdateTextFilter, // callbacks
      onFilterSelected: enzymeWrapper.instance().onFilterSelected, // callbacks
    }, 'Component properties should be correctly reported')
  })
  it('should render correctly with initial value', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      registerClear: () => { },
      attributes: {
        searchField: {
          label: 'label',
          name: 'Label',
          jsonPath: 'label',
          type: 'STRING',
        },
      },
      isFetching: false,
      availablePropertyValues: ['testValue'],
      dispatchGetPropertyValues: () => { },
      initialValues: {
        label: 'testValue',
      },
    }
    const enzymeWrapper = shallow(<EnumeratedCriteriaContainer {...props} />, { context })
    // verify sub component is correctly instantiated
    const componentWrapper = enzymeWrapper.find(EnumeratedCriteriaComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    assert.equal(componentWrapper.props().text, 'testValue', 'initial value should be correctly reported')
  })
  it('should update list when user changed the text, taking in account initialQuery and attribute name', () => {
    const spiedDispatchData = {
      name: null,
      filterText: null,
      q: null,
      count: 0,
    }
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      registerClear: () => { },
      attributes: {
        searchField: {
          label: 'label',
          name: 'Label',
          jsonPath: 'label',
          type: 'STRING',
        },
      },
      isFetching: false,
      availablePropertyValues: [],
      initialQuery: 'this is a test query',
      dispatchGetPropertyValues: (name, filterText, q) => {
        spiedDispatchData.name = name
        spiedDispatchData.filterText = filterText
        spiedDispatchData.q = q
        spiedDispatchData.count += 1
      },
    }
    const enzymeWrapper = shallow(<EnumeratedCriteriaContainer {...props} />, { context })
    // run event, and check spied data
    enzymeWrapper.instance().onUpdateTextFilter('test text')
    assert.equal(spiedDispatchData.count, 1, 'Dispatch should have been performed')
    assert.equal(spiedDispatchData.name, 'label', 'Dispatched attribute should be valid')
    assert.equal(spiedDispatchData.filterText, 'test text', 'Dispatched filter text should be valid')
    assert.equal(spiedDispatchData.q, 'this is a test query', 'Dispatched initial query should be valid')
  })
  it('should update correctly its state on user item selection', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      registerClear: () => { },
      attributes: {
        searchField: {
          label: 'label',
          name: 'Label',
          jsonPath: 'label',
          type: 'STRING',
        },
      },
      isFetching: false,
      availablePropertyValues: [],
      dispatchGetPropertyValues: () => { },
    }
    const enzymeWrapper = shallow(<EnumeratedCriteriaContainer {...props} />, { context })
    // 1 - test an item outside the list (should show error)
    enzymeWrapper.instance().onFilterSelected('test1', false)
    // wait for state update
    enzymeWrapper.update()
    // check state
    assert.deepEqual(enzymeWrapper.state(), {
      searchField: 'test1', // text should be updated
      isInError: true, // the component should be marked in error
    })
    // 2 - test an item inside the list (should not show error)
    enzymeWrapper.instance().onFilterSelected('test2', true)
    // wait for state update
    enzymeWrapper.update()
    // check state
    assert.deepEqual(enzymeWrapper.state(), {
      searchField: 'test2', // text should be updated
      isInError: false, // the component should not  be marked in error
    })
  })
})
