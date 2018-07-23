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
import ResultsAndFacetsHeaderRow from '../../../../../src/components/user/results/header/ResultsAndFacetsHeaderRow'
import BooleanFacetSelectorComponent from '../../../../../src/components/user/results/facets/BooleanFacetSelectorComponent'
import DateRangeFacetSelectorComponent from '../../../../../src/components/user/results/facets/DateRangeFacetSelectorComponent'
import NumberRangeFacetSelectorComponent from '../../../../../src/components/user/results/facets/NumberRangeFacetSelectorComponent'
import WordFacetSelectorComponent from '../../../../../src/components/user/results/facets/WordFacetSelectorComponent'
import styles from '../../../../../src/styles/styles'
import resultsDump from '../../../../dumps/results.dump'

const context = buildTestContext(styles)

/**
* Test ResultsAndFacetsHeaderRow
* @author Raphaël Mechali
*/
describe('[Search Results] Testing ResultsAndFacetsHeaderRow', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ResultsAndFacetsHeaderRow)
  })
  it('should render correctly loading', () => {
    const props = {
      isFetching: true,
      showFacets: true,
      facets: [],
      resultsCount: 22,
      onSelectFacet: () => { },
    }
    shallow(<ResultsAndFacetsHeaderRow {...props} />, { context })
  })
  it('should render correctly facets for all facet types (from dump)', () => {
    const props = {
      isFetching: false,
      showFacets: true,
      facets: [{
        label: { en: 'EN0', fr: 'FR0' },
        model: resultsDump.facets[0],
      }, {
        label: { en: 'EN1', fr: 'FR1' },
        model: resultsDump.facets[1],
      }, {
        label: { en: 'EN2', fr: 'FR2' },
        model: resultsDump.facets[2],
      }, {
        label: { en: 'EN3', fr: 'FR3' },
        model: resultsDump.facets[3],
      }],
      resultsCount: 22,
      onSelectFacet: () => { },
    }
    const enzymeWrapper = shallow(<ResultsAndFacetsHeaderRow {...props} />, { context })
    // 1 - string facet
    const stringFacetWrapper = enzymeWrapper.find(WordFacetSelectorComponent)
    assert.lengthOf(stringFacetWrapper, 1, 'There should be the string facet component')
    testSuiteHelpers.assertWrapperProperties(stringFacetWrapper, {
      facet: props.facets[0],
      onSelectFacet: props.onSelectFacet,
    }, 'Selected string facet wrapper properties shoud be correctly reported')
    // 2 - date range facet
    const dateRangeFacetWrapper = enzymeWrapper.find(DateRangeFacetSelectorComponent)
    assert.lengthOf(dateRangeFacetWrapper, 1, 'There should be the date range facet component')
    testSuiteHelpers.assertWrapperProperties(dateRangeFacetWrapper, {
      facet: props.facets[1],
      onSelectFacet: props.onSelectFacet,
    }, 'Selected date range facet wrapper properties shoud be correctly reported')
    // 3 - number range facet
    const numberRangeFacetWrapper = enzymeWrapper.find(NumberRangeFacetSelectorComponent)
    assert.lengthOf(numberRangeFacetWrapper, 1, 'There should be the number range facet component')
    testSuiteHelpers.assertWrapperProperties(numberRangeFacetWrapper, {
      facet: props.facets[2],
      onSelectFacet: props.onSelectFacet,
    }, 'Selected number range facet wrapper properties shoud be correctly reported')
    // 3 - boolean facet
    const booleanFacetWrapper = enzymeWrapper.find(BooleanFacetSelectorComponent)
    assert.lengthOf(booleanFacetWrapper, 1, 'There should be the boolean facet component')
    testSuiteHelpers.assertWrapperProperties(booleanFacetWrapper, {
      facet: props.facets[3],
      onSelectFacet: props.onSelectFacet,
    }, 'Selected boolean facet wrapper properties shoud be correctly reported')
  })
})
