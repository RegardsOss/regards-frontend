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
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers, criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import ToponymCriterionComponent from '../../src/components/ToponymCriterionComponent'
import styles from '../../src/styles'
import { AutoCompleteTextField } from '@regardsoss/components'

const context = buildTestContext(styles)

/**
 * Test ToponymCriterionComponent
 * @author Theo Lasserre
 */
describe('[Toponym criterion] Testing ToponymCriterionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ToponymCriterionComponent)
  })
  it('should render correctly label for locale (english)', () => {
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),
      error: false,
      toponymFilterText: 'en',
      matchingToponyms: {
        id: {
          content: {
            labelFr: 'fr',
            labelEn: 'en',
            businessId: 'id',
          }
        }
      },
      isFetching: false,
      onUpdateToponymsFilter: () => { },
      onToponymFilterSelected: () => { },
      currentLocale: UIDomain.LOCALES_ENUM.en
    }
    const enzymeWrapper = shallow(<ToponymCriterionComponent {...props} />, {
      context: buildTestContext(styles, UIDomain.LOCALES_ENUM.en)
    })
    // 1 - check label is displayed
    assert.isTrue(enzymeWrapper.debug().includes(props.label[UIDomain.LOCALES_ENUM.en]), 'attribute label should be shown for the right locale')
    // 2 - check autocomplete field is correctly configured
    const subComponentWrapper = enzymeWrapper.find(AutoCompleteTextField)
    assert.lengthOf(subComponentWrapper, 1, 'The autocomplete field should be shown')
    testSuiteHelpers.assertWrapperProperties(subComponentWrapper, {
      currentHintText: 'en', // field text being entered by the user
      isFetching: false,
      isInError: false,
      onUpdateInput: props.onUpdateToponymsFilter,
      onFilterSelected: props.onToponymFilterSelected,
    }, 'Properties should be correctly reported')
  })
  it('should render correctly localized label', () => {
    const props = {
      label: criterionTestSuiteHelpers.getLabelStub(),
      error: false,
      toponymFilterText: 'en',
      matchingToponyms: {
        id: {
          content: {
            labelFr: 'fr',
            labelEn: 'en',
            businessId: 'id',
          }
        }
      },
      isFetching: false,
      onUpdateToponymsFilter: () => { },
      onToponymFilterSelected: () => { },
      currentLocale: UIDomain.LOCALES_ENUM.en
    }
    // Render with each locale
    UIDomain.LOCALES.forEach((locale) => {
      const enzymeWrapper = shallow(<ToponymCriterionComponent {...props} />, {
        context: buildTestContext(styles, locale),
      })
      // 1 - check label is displayed
      assert.include(enzymeWrapper.debug(), props.label[locale], 'attribute label should be shown for the current locale')
      // 2 - check autocomplete field is correctly configured
      const autocompleteWrapper = enzymeWrapper.find(AutoCompleteTextField)
      assert.lengthOf(autocompleteWrapper, 1, 'The autocomplete field should be shown')
      const stateComputedHints = enzymeWrapper.state().currentHints
      testSuiteHelpers.assertWrapperProperties(autocompleteWrapper, {
        currentHintText: 'en', // field text being entered by the user
        currentHints: stateComputedHints,
        isFetching: false,
        isInError: false,
        onUpdateInput: props.onUpdateToponymsFilter,
        onFilterSelected: props.onToponymFilterSelected,
      }, 'Properties should be correctly reported')
    })
    it('should render correctly fetching', () => {
      const props = {
        label: criterionTestSuiteHelpers.getLabelStub(),
        error: false,
        toponymFilterText: 'en',
        matchingToponyms: {
          id: {
            content: {
              labelFr: 'fr',
              labelEn: 'en',
              businessId: 'id',
            }
          }
        },
        isFetching: true,
        onUpdateToponymsFilter: () => { },
        onToponymFilterSelected: () => { },
        currentLocale: UIDomain.LOCALES_ENUM.en
      }
      const enzymeWrapper = shallow(<ToponymCriterionComponent {...props} />, { context })
      // check autocomplete field state
      const subComponentWrapper = enzymeWrapper.find(AutoCompleteTextField)
      assert.lengthOf(subComponentWrapper, 1, 'The autocomplete field should be shown')
      assert.isTrue(subComponentWrapper.props().isFetching, 'The component should be marked fetching')
      assert.isFalse(subComponentWrapper.props().isInError, 'The component should not be marked in error')
    })
    it('should render correctly in error', () => {
      const props = {
        label: criterionTestSuiteHelpers.getLabelStub(),
        error: true,
        toponymFilterText: 'idk',
        matchingToponyms: {
          id: {
            content: {
              labelFr: 'fr',
              labelEn: 'en',
              businessId: 'id',
            }
          }
        },
        isFetching: false,
        onUpdateToponymsFilter: () => { },
        onToponymFilterSelected: () => { },
        currentLocale: UIDomain.LOCALES_ENUM.en
      }
      const enzymeWrapper = shallow(<ToponymCriterionComponent {...props} />, { context })
      // check autocomplete field state
      const subComponentWrapper = enzymeWrapper.find(AutoCompleteTextField)
      assert.lengthOf(subComponentWrapper, 1, 'The autocomplete field should be shown')
      assert.isFalse(subComponentWrapper.props().isFetching, 'The component should not be marked fetching')
      assert.isTrue(subComponentWrapper.props().isInError, 'The component should be marked in error')
    })
  })
})
