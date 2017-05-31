/**
 * LICENSE_PLACEHOLDER
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
      facetLabels: {},
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
