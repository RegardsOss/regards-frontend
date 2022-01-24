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
import { TableHeaderText } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UIDomain } from '@regardsoss/domain'
import ResultFacetsHeaderRowComponent from '../../../../../../src/components/user/tabs/results/header/ResultFacetsHeaderRowComponent'
import BooleanFacetSelectorComponent from '../../../../../../src/components/user/tabs/results/header/facets/BooleanFacetSelectorComponent'
import DateRangeFacetSelectorComponent from '../../../../../../src/components/user/tabs/results/header/facets/DateRangeFacetSelectorComponent'
import NumberRangeFacetSelectorComponent from '../../../../../../src/components/user/tabs/results/header/facets/NumberRangeFacetSelectorComponent'
import WordFacetSelectorComponent from '../../../../../../src/components/user/tabs/results/header/facets/WordFacetSelectorComponent'
import TableHeaderSelectAllContainer from '../../../../../../src/containers/user/tabs/results/header/TableHeaderSelectAllContainer'
import styles from '../../../../../../src/styles'
import { attributes } from '../../../../../dumps/attributes.dump'
import resultsDump from '../../../../../dumps/results.dump'

const context = buildTestContext(styles)

const someFacets = [{
  facetLabels: { en: 'boolean value', fr: 'valeur booléenne' },
  attribute: attributes[1],
  model: resultsDump.facets[3],
}, {
  facetLabels: { en: 'date range', fr: 'interval de dates' },
  attribute: attributes[1],
  model: resultsDump.facets[1],
}, {
  facetLabels: { en: 'number range', fr: 'interval de nombres' },
  attribute: attributes[1],
  model: resultsDump.facets[2],
}, {
  facetLabels: { en: 'string', fr: 'chaîne de caractères' },
  attribute: attributes[1],
  model: resultsDump.facets[0],
}]

/**
 * Test ResultFacetsHeaderRowComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ResultFacetsHeaderRowComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ResultFacetsHeaderRowComponent)
  })
  it('should render correctly while fetching', () => {
    const props = {
      isFetching: true,
      loadedResultsCount: 25,
      resultsCount: 100,
      facetsEnabled: true,
      facets: someFacets,
      onSelectFacetValue: () => { },
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      selectionEnabled: true,
    }
    const enzymeWrapper = shallow(<ResultFacetsHeaderRowComponent {...props} />, { context })
    // There should be no facet selector nor message
    assert.lengthOf(enzymeWrapper.find(TableHeaderText), 0, 'There should not be empty facets message')
    assert.lengthOf(enzymeWrapper.find(BooleanFacetSelectorComponent), 0, 'There should be no boolean facet selector')
    assert.lengthOf(enzymeWrapper.find(DateRangeFacetSelectorComponent), 0, 'There should be no date range facet selector')
    assert.lengthOf(enzymeWrapper.find(NumberRangeFacetSelectorComponent), 0, 'There should be no number range facet selector')
    assert.lengthOf(enzymeWrapper.find(WordFacetSelectorComponent), 0, 'There should be no word facet selector')
  })
  it('should render correctly table header select all', () => {
    const props = {
      isFetching: false,
      loadedResultsCount: 25,
      resultsCount: 100,
      facetsEnabled: false,
      facets: someFacets,
      onSelectFacetValue: () => { },
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      selectionEnabled: true,
    }
    const enzymeWrapper = shallow(<ResultFacetsHeaderRowComponent {...props} />, { context })

    const tableHeaderSelectAllContainer = enzymeWrapper.find(TableHeaderSelectAllContainer)
    assert.lengthOf(tableHeaderSelectAllContainer, 1, 'There should be the select all container')
    assert.equal(tableHeaderSelectAllContainer.props().tabType, props.tabType, 'Tab type should be transfered')
    assert.equal(tableHeaderSelectAllContainer.props().selectionEnabled, props.selectionEnabled, 'Bool selection enabled should be transfered')
  })
  it('should render correctly when facets are disabled', () => {
    const props = {
      isFetching: false,
      loadedResultsCount: 25,
      resultsCount: 100,
      facetsEnabled: false,
      facets: someFacets,
      onSelectFacetValue: () => { },
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      selectionEnabled: true,
    }
    const enzymeWrapper = shallow(<ResultFacetsHeaderRowComponent {...props} />, { context })
    // There should be no facet selector nor message
    assert.lengthOf(enzymeWrapper.find(TableHeaderText), 0, 'There should not be empty facets message')
    assert.lengthOf(enzymeWrapper.find(BooleanFacetSelectorComponent), 0, 'There should be no boolean facet selector')
    assert.lengthOf(enzymeWrapper.find(DateRangeFacetSelectorComponent), 0, 'There should be no date range facet selector')
    assert.lengthOf(enzymeWrapper.find(NumberRangeFacetSelectorComponent), 0, 'There should be no number range facet selector')
    assert.lengthOf(enzymeWrapper.find(WordFacetSelectorComponent), 0, 'There should be no word facet selector')
  })
  it('should render correctly without facet', () => {
    const props = {
      isFetching: false,
      loadedResultsCount: 25,
      resultsCount: 100,
      facetsEnabled: true,
      facets: [],
      onSelectFacetValue: () => { },
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      selectionEnabled: true,
    }
    const enzymeWrapper = shallow(<ResultFacetsHeaderRowComponent {...props} />, { context })
    // There should be empty facets list message
    const textComponent = enzymeWrapper.find(TableHeaderText)
    assert.lengthOf(textComponent, 1, 'There should not be empty facets message')
    assert.equal(textComponent.props().text, 'search.facets.no.facet.found', 'Message should be internationalized')
    // There should be no facet selector
    assert.lengthOf(enzymeWrapper.find(BooleanFacetSelectorComponent), 0, 'There should be no boolean facet selector')
    assert.lengthOf(enzymeWrapper.find(DateRangeFacetSelectorComponent), 0, 'There should be no date range facet selector')
    assert.lengthOf(enzymeWrapper.find(NumberRangeFacetSelectorComponent), 0, 'There should be no number range facet selector')
    assert.lengthOf(enzymeWrapper.find(WordFacetSelectorComponent), 0, 'There should be no word facet selector')
  })
  it('should render correctly with all facet types', () => {
    const props = {
      isFetching: false,
      loadedResultsCount: 25,
      resultsCount: 100,
      facetsEnabled: true,
      facets: someFacets,
      onSelectFacetValue: () => { },
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      selectionEnabled: true,
    }
    const enzymeWrapper = shallow(<ResultFacetsHeaderRowComponent {...props} />, { context })
    // There should not be empty facets list message
    assert.lengthOf(enzymeWrapper.find(TableHeaderText), 0, 'There should not be empty facets message')
    // There should be one facet selector by facet
    const booleanFacetSelector = enzymeWrapper.find(BooleanFacetSelectorComponent)
    assert.lengthOf(booleanFacetSelector, 1, 'There should be a boolean facet selector')
    testSuiteHelpers.assertWrapperProperties(booleanFacetSelector, {
      facet: props.facets[0],
      onSelectFacetValue: props.onSelectFacetValue,
    }, 'Boolean facet selector properties should be correctly set')

    const dateRangeFacetSelector = enzymeWrapper.find(DateRangeFacetSelectorComponent)
    assert.lengthOf(dateRangeFacetSelector, 1, 'There should be a date range facet selector')
    testSuiteHelpers.assertWrapperProperties(dateRangeFacetSelector, {
      facet: props.facets[1],
      onSelectFacetValue: props.onSelectFacetValue,
    }, 'Date range facet selector properties should be correctly set')

    const numberRangeFacetSelector = enzymeWrapper.find(NumberRangeFacetSelectorComponent)
    assert.lengthOf(numberRangeFacetSelector, 1, 'There should be a number range facet selector')
    testSuiteHelpers.assertWrapperProperties(numberRangeFacetSelector, {
      facet: props.facets[2],
      onSelectFacetValue: props.onSelectFacetValue,
    }, 'Number range facet selector properties should be correctly set')

    const wordFacetSelector = enzymeWrapper.find(WordFacetSelectorComponent)
    assert.lengthOf(wordFacetSelector, 1, 'There should be a word facet selector')
    testSuiteHelpers.assertWrapperProperties(wordFacetSelector, {
      facet: props.facets[3],
      onSelectFacetValue: props.onSelectFacetValue,
    }, 'Word facet selector properties should be correctly set')
  })
})
