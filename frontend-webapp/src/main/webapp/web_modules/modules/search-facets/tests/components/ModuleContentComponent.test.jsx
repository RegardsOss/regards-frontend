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
 */
import size from 'lodash/size'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { BasicFacetsPageableSelectors } from '@regardsoss/store-utils'
import ModuleContentComponent from '../../src/components/ModuleContentComponent'
import DateRangeFacetSelectorComponent from '../../src/components/DateRangeFacetSelectorComponent'
import NumberRangeFacetSelectorComponent from '../../src/components/NumberRangeFacetSelectorComponent'
import WordFacetSelectorComponent from '../../src/components/WordFacetSelectorComponent'
import FilterDisplayComponent from '../../src/components/FilterDisplayComponent'

import styles from '../../src/styles/styles'
import facetsNetworkDump from '../network-dump/search-results-dump'

describe('[SEARCH FACETS] Testing ModuleContentComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleContentComponent)
  })
  const context = buildTestContext(styles)

  it('should render properly', () => {
    const props = {
      facets: facetsNetworkDump.facets,
      filters: [{ filterKey: 'aFilter', filterLabel: 'aFilter', openSearchQuery: 'query' }],
      resultsSelectors: new BasicFacetsPageableSelectors(),
      applyFilter: () => { },
      deleteFilter: () => { },
    }
    const enzymeWrapper = shallow(<ModuleContentComponent {...props} />, { context })
    // we will now check that we find one facet displayer and one filter displayer for
    // each facet / filter (applied facet) to display
    const selectorsCount = enzymeWrapper.find(DateRangeFacetSelectorComponent).length +
      enzymeWrapper.find(NumberRangeFacetSelectorComponent).length +
      enzymeWrapper.find(WordFacetSelectorComponent).length
    assert.equal(selectorsCount, size(props.facets))
    const filtersCount = enzymeWrapper.find(FilterDisplayComponent).length
    assert.equal(filtersCount, size(props.filters))
  })
})
