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
import SelectedDateRangeFacetComponent from '../../../../../../src/components/user/results/facets/selected/SelectedDateRangeFacetComponent'
import SelectedFacetComponent from '../../../../../../src/components/user/results/facets/selected/SelectedFacetComponent'
import styles from '../../../../../../src/styles'
import resultsDump from '../../../../../dumps/results.dump'

const context = buildTestContext(styles)

/**
 * Test SelectedDateRangeFacetComponent
 * @author Raphaël Mechali
 */
describe('[Search Results] Testing SelectedDateRangeFacetComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SelectedDateRangeFacetComponent)
  })
  it('should render correctly with a range ] -inf, value ]', () => {
    const props = {
      selectedFacet: {
        label: { en: 'EN1', fr: 'FR1' },
        model: resultsDump.facets[1],
        value: resultsDump.facets[1].values[0],
      },
      onUnselectFacet: () => { },
    }
    const enzymeWrapper = shallow(<SelectedDateRangeFacetComponent {...props} />, { context })
    const selectedFacetRenderWrapper = enzymeWrapper.find(SelectedFacetComponent)
    assert.lengthOf(selectedFacetRenderWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(selectedFacetRenderWrapper, {
      label: 'search.facets.filter.chip.date.before',
      selectedFacet: props.selectedFacet,
      onUnselectFacet: props.onUnselectFacet,
    })
  })
  it('should render correctly with a range [ value, +inf [', () => {
    const props = {
      selectedFacet: {
        label: { en: 'EN1', fr: 'FR1' },
        model: resultsDump.facets[1],
        value: resultsDump.facets[1].values[9],
      },
      onUnselectFacet: () => { },
    }
    const enzymeWrapper = shallow(<SelectedDateRangeFacetComponent {...props} />, { context })
    const selectedFacetRenderWrapper = enzymeWrapper.find(SelectedFacetComponent)
    assert.lengthOf(selectedFacetRenderWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(selectedFacetRenderWrapper, {
      label: 'search.facets.filter.chip.date.after',
      selectedFacet: props.selectedFacet,
      onUnselectFacet: props.onUnselectFacet,
    })
  })
  it('should render correctly with a range [ value1, value2 ]', () => {
    const props = {
      selectedFacet: {
        label: { en: 'EN1', fr: 'FR1' },
        model: resultsDump.facets[1],
        value: resultsDump.facets[1].values[1],
      },
      onUnselectFacet: () => { },
    }
    const enzymeWrapper = shallow(<SelectedDateRangeFacetComponent {...props} />, { context })
    const selectedFacetRenderWrapper = enzymeWrapper.find(SelectedFacetComponent)
    assert.lengthOf(selectedFacetRenderWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(selectedFacetRenderWrapper, {
      label: 'search.facets.filter.chip.date.range',
      selectedFacet: props.selectedFacet,
      onUnselectFacet: props.onUnselectFacet,
    })
  })
  it('should render correctly with a simple value', () => {
    const props = {
      selectedFacet: {
        label: { en: 'EN1', fr: 'FR1' },
        model: resultsDump.facets[1],
        value: resultsDump.facets[1].values[8],
      },
      onUnselectFacet: () => { },
    }
    const enzymeWrapper = shallow(<SelectedDateRangeFacetComponent {...props} />, { context })
    const selectedFacetRenderWrapper = enzymeWrapper.find(SelectedFacetComponent)
    assert.lengthOf(selectedFacetRenderWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(selectedFacetRenderWrapper, {
      label: 'search.facets.filter.chip.date.value',
      selectedFacet: props.selectedFacet,
      onUnselectFacet: props.onUnselectFacet,
    })
  })
})
