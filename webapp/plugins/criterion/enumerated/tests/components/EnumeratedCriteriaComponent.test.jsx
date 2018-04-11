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
import { AutoCompleteTextField } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import EnumeratedCriteriaComponent from '../../src/components/EnumeratedCriteriaComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test EnumeratedCriteriaComponent
 * @author Raphaël Mechali
 */
describe('[enumerated criteria plugin] Testing EnumeratedCriteriaComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EnumeratedCriteriaComponent)
  })
  it('should render correctly in nominal case', () => {
    const props = {
      attributeLabel: 'A label',
      text: 'idk',
      availablePropertyValues: [],
      isInError: false,
      isFetching: false,
      onUpdateTextFilter: () => { },
      onFilterSelected: () => { },
    }
    const enzymeWrapper = shallow(<EnumeratedCriteriaComponent {...props} />, { context })
    // 1 - check label is displayed
    assert.isTrue(enzymeWrapper.debug().includes('A label'), 'The label should be shown')
    // 2 - check autocomplete field is correctly configured
    const subComponentWrapper = enzymeWrapper.find(AutoCompleteTextField)
    assert.lengthOf(subComponentWrapper, 1, 'The autocomplete field should be shown')
    testSuiteHelpers.assertWrapperProperties(subComponentWrapper, {
      hintText: 'criterion.search.field.label', // field hint
      currentHintText: 'idk', // field text
      isFetching: false,
      isInError: false,
      onUpdateInput: props.onUpdateTextFilter,
      onFilterSelected: props.onFilterSelected,
    }, 'Properties should be correctly reported')
  })
  it('should render correctly fetching', () => {
    const props = {
      attributeLabel: 'A label',
      text: 'idk',
      availablePropertyValues: [],
      isInError: false,
      isFetching: true,
      onUpdateTextFilter: () => { },
      onFilterSelected: () => { },
    }
    const enzymeWrapper = shallow(<EnumeratedCriteriaComponent {...props} />, { context })
    // check autocomplete field state
    const subComponentWrapper = enzymeWrapper.find(AutoCompleteTextField)
    assert.lengthOf(subComponentWrapper, 1, 'The autocomplete field should be shown')
    assert.isTrue(subComponentWrapper.props().isFetching, 'The component should be marked fetching')
    assert.isFalse(subComponentWrapper.props().isInError, 'The component should not be marked in error')
  })
  it('should render correctly in error', () => {
    const props = {
      attributeLabel: 'A label',
      text: 'idk',
      availablePropertyValues: [],
      isInError: true,
      isFetching: false,
      onUpdateTextFilter: () => { },
      onFilterSelected: () => { },
    }
    const enzymeWrapper = shallow(<EnumeratedCriteriaComponent {...props} />, { context })
    // check autocomplete field state
    const subComponentWrapper = enzymeWrapper.find(AutoCompleteTextField)
    assert.lengthOf(subComponentWrapper, 1, 'The autocomplete field should be shown')
    assert.isFalse(subComponentWrapper.props().isFetching, 'The component should not be marked fetching')
    assert.isTrue(subComponentWrapper.props().isInError, 'The component should be marked in error')
  })
  it('should convert hints list when receiving new available values', () => {
    // function to check hints list
    const checkHintsList = (wrapper, initialValues) => {
      const convertedHints = wrapper.state().currentHints || []
      assert.equal(convertedHints.length, initialValues.length, 'There should be the same count of converted hints')
      for (let i = 0; i < convertedHints.length; i += 1) {
        assert.equal(convertedHints[i].id, initialValues[i], 'ID should be correctly reported')
        assert.equal(convertedHints[i].text, initialValues[i], 'Text should be correctly reported')
        // No test for menu item as MUI is, in version 0.20.0, raising wrong warning, which would result in
        // failing this test
      }
    }

    // 1 - check initial conversion
    const props = {
      attributeLabel: 'A label',
      text: 'idk',
      availablePropertyValues: ['a'],
      isInError: true,
      isFetching: false,
      onUpdateTextFilter: () => { },
      onFilterSelected: () => { },
    }
    const enzymeWrapper = shallow(<EnumeratedCriteriaComponent {...props} />, { context })
    checkHintsList(enzymeWrapper, props.availablePropertyValues)

    // 2 - check changing list
    const list2 = ['c', 'd', 'e']
    enzymeWrapper.setProps({
      ...props,
      availablePropertyValues: list2,
    })
    checkHintsList(enzymeWrapper, list2)

    // 3 - Also test a no data
    const list3 = []
    enzymeWrapper.setProps({
      ...props,
      availablePropertyValues: list3,
    })
    checkHintsList(enzymeWrapper, list3)
  })
})
