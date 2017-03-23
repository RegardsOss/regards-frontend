/**
 * LICENSE_PLACEHOLDER
 */
import size from 'lodash/size'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { BasicFacetsPageableSelectors } from '@regardsoss/store-utils'
import ModuleContentComponent from '../../src/components/ModuleContentComponent'
import DateRangeFacetSelectorComponent from '../../src/components/DateRangeFacetSelectorComponent'
import NumberRangeFacetSelectorComponent from '../../src/components/NumberRangeFacetSelectorComponent'
import WordFacetSelectorComponent from '../../src/components/WordFacetSelectorComponent'
import FilterDisplayComponent from '../../src/components/FilterDisplayComponent'

import styles from '../../src/styles/styles'
import facetsNetworkDump from '../network-dump/search-results-dump'

describe('[SEARCH FACETS] Testing ModuleContentComponent', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(ModuleContentComponent)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {
      },
    },
    moduleTheme: styles({}),
  }
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
