/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { AutoCompleteTextField } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import EnumeratedCriterionComponent from '../../src/components/EnumeratedCriterionComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)
/**
 * Test EnumeratedCriterionComponent
 * @author Raphaël Mechali
 */
describe('[Enumerated criterion] Testing EnumeratedCriterionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EnumeratedCriterionComponent)
  })
  it('should render correctly label for locale (english)', () => {
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
      error: false,
      text: 'idk',
      availablePropertyValues: ['a', 'b', 'c'],
      isFetching: false,
      onUpdateTextFilter: () => { },
      onFilterSelected: () => { },
    }
    const enzymeWrapper = shallow(<EnumeratedCriterionComponent {...props} />, {
      context: buildTestContext(styles, UIDomain.LOCALES_ENUM.en),
    })
    // 1 - check label is displayed
    assert.isTrue(enzymeWrapper.debug().includes(props.label[UIDomain.LOCALES_ENUM.en]), 'attribute label should be shown for the right locale')
    // 2 - check autocomplete field is correctly configured
    const subComponentWrapper = enzymeWrapper.find(AutoCompleteTextField)
    assert.lengthOf(subComponentWrapper, 1, 'The autocomplete field should be shown')
    testSuiteHelpers.assertWrapperProperties(subComponentWrapper, {
      currentHintText: 'idk', // field text being entered by the user
      isFetching: false,
      isInError: false,
      onUpdateInput: props.onUpdateTextFilter,
      onFilterSelected: props.onFilterSelected,
    }, 'Properties should be correctly reported')
  })
  it('should render correctly localized label and options', () => {
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
      error: false,
      text: 'idk2',
      availablePropertyValues: ['a', 'b', 'c'],
      isFetching: false,
      onUpdateTextFilter: () => { },
      onFilterSelected: () => { },
    }
    // Render with each locale
    UIDomain.LOCALES.forEach((locale) => {
      const enzymeWrapper = shallow(<EnumeratedCriterionComponent {...props} />, {
        context: buildTestContext(styles, locale),
      })
      // 1 - check label is displayed
      assert.include(enzymeWrapper.debug(), props.label[locale], 'attribute label should be shown for the current locale')
      // 2 - check autocomplete field is correctly configured
      const autocompleteWrapper = enzymeWrapper.find(AutoCompleteTextField)
      assert.lengthOf(autocompleteWrapper, 1, 'The autocomplete field should be shown')
      const stateComputedHints = enzymeWrapper.state().currentHints
      testSuiteHelpers.assertWrapperProperties(autocompleteWrapper, {
        currentHintText: 'idk2', // field text being entered by the user
        currentHints: stateComputedHints,
        isFetching: false,
        isInError: false,
        onUpdateInput: props.onUpdateTextFilter,
        onFilterSelected: props.onFilterSelected,
      }, 'Properties should be correctly reported')
      // 3 - check options were correctly computed
      assert.lengthOf(stateComputedHints, props.availablePropertyValues.length, 'There should be the right count of hints')
      enzymeWrapper.state().currentHints.forEach((computedHint, index) => {
        const modelHint = props.availablePropertyValues[index]
        assert.equal(computedHint.id, modelHint, `Hint #${index}: Id should worth hint text`)
        assert.equal(computedHint.text, modelHint, `Hint #${index}: Text should worth hint text`)
      })
    })

    // 1 - check label is displayed
  })
  it('should render correctly fetching', () => {
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
      error: false,
      text: 'idk',
      availablePropertyValues: ['a', 'b'],
      isFetching: true,
      onUpdateTextFilter: () => { },
      onFilterSelected: () => { },
    }
    const enzymeWrapper = shallow(<EnumeratedCriterionComponent {...props} />, { context })
    // check autocomplete field state
    const subComponentWrapper = enzymeWrapper.find(AutoCompleteTextField)
    assert.lengthOf(subComponentWrapper, 1, 'The autocomplete field should be shown')
    assert.isTrue(subComponentWrapper.props().isFetching, 'The component should be marked fetching')
    assert.isFalse(subComponentWrapper.props().isInError, 'The component should not be marked in error')
  })
  it('should render correctly in error', () => {
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),
      searchAttribute: criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.STRING),
      error: true,
      text: 'idk',
      availablePropertyValues: ['a', 'b'],
      isFetching: false,
      onUpdateTextFilter: () => { },
      onFilterSelected: () => { },
    }
    const enzymeWrapper = shallow(<EnumeratedCriterionComponent {...props} />, { context })
    // check autocomplete field state
    const subComponentWrapper = enzymeWrapper.find(AutoCompleteTextField)
    assert.lengthOf(subComponentWrapper, 1, 'The autocomplete field should be shown')
    assert.isFalse(subComponentWrapper.props().isFetching, 'The component should not be marked fetching')
    assert.isTrue(subComponentWrapper.props().isInError, 'The component should be marked in error')
  })
})
