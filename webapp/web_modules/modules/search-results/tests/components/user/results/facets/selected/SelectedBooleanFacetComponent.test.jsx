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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SelectedBooleanFacetComponent from '../../../../../../src/components/user/results/facets/selected/SelectedBooleanFacetComponent'
import SelectedFacetComponent from '../../../../../../src/components/user/results/facets/selected/SelectedFacetComponent'
import styles from '../../../../../../src/styles'
import resultsDump from '../../../../../dumps/results.dump'

const context = buildTestContext(styles)

/**
 * Test SelectedBooleanFacetComponent
 * @author Raphaël Mechali
 */
describe('[Search Results] Testing SelectedBooleanFacetComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SelectedBooleanFacetComponent)
  })
  it('should render correctly', () => {
    const props = {
      selectedFacet: {
        label: { en: 'EN3', fr: 'FR3' },
        model: resultsDump.facets[3],
        value: resultsDump.facets[3].values[0],
      },
      onUnselectFacet: () => { },
    }
    const enzymeWrapper = shallow(<SelectedBooleanFacetComponent {...props} />, { context })
    const selectedFacetRenderWrapper = enzymeWrapper.find(SelectedFacetComponent)
    assert.lengthOf(selectedFacetRenderWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(selectedFacetRenderWrapper, {
      label: 'search.facets.filter.chip.boolean.value',
      selectedFacet: props.selectedFacet,
      onUnselectFacet: props.onUnselectFacet,
    })
  })
})
