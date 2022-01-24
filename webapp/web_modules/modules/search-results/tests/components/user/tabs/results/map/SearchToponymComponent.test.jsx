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
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AutoCompleteTextField } from '@regardsoss/components'
import SearchToponymComponent from '../../../../../../src/components/user/tabs/results/map/SearchToponymComponent'
import styles from '../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SearchToponymComponent
 * @author Théo Lasserre
 */
describe('[ Module name] Testing SearchToponymComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchToponymComponent)
  })
  it('should render correctly', () => {
    const props = {
      toponymFilterText: 'idk',
      matchingToponyms: {
        id: {
          content: {
            labelFr: 'fr',
            labelEn: 'en',
            businessId: 'id',
          },
        },
      },
      isInError: false,
      isFetching: false,
      onUpdateToponymsFilter: () => { },
      onToponymFilterSelected: () => { },
      currentLocale: UIDomain.LOCALES_ENUM.en,
    }
    const enzymeWrapper = shallow(<SearchToponymComponent {...props} />, { context })
    // Check autocomplete field is correctly configured
    const subComponentWrapper = enzymeWrapper.find(AutoCompleteTextField)
    testSuiteHelpers.assertWrapperProperties(subComponentWrapper, {
      currentHintText: 'idk', // field text being entered by the user
      isFetching: false,
      isInError: false,
      onUpdateInput: props.onUpdateToponymsFilter,
      onFilterSelected: props.onToponymFilterSelected,
    }, 'Properties should be correctly reported')
  })
})
