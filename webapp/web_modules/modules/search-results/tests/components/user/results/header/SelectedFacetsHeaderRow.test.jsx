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
import { ShowableAtRender } from '@regardsoss/components'
import SelectedFacetsHeaderRow from '../../../../../src/components/user/results/header/SelectedFacetsHeaderRow'
import SelectedBooleanFacetComponent from '../../../../../src/components/user/results/facets/selected/SelectedBooleanFacetComponent'
import SelectedDateRangeFacetComponent from '../../../../../src/components/user/results/facets/selected/SelectedDateRangeFacetComponent'
import SelectedNumberRangeFacetComponent from '../../../../../src/components/user/results/facets/selected/SelectedNumberRangeFacetComponent'
import SelectedStringFacetComponent from '../../../../../src/components/user/results/facets/selected/SelectedStringFacetComponent'
import styles from '../../../../../src/styles/styles'
import resultsDump from '../../../../dumps/results.dump'

const context = buildTestContext(styles)

/**
* Test SelectedFacetsHeaderRow
* @author Raphaël Mechali
*/
describe('[Search Results] Testing SelectedFacetsHeaderRow', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SelectedFacetsHeaderRow)
  })
  it('should render hidden when not showing facets', () => {
    const props = {
      showingFacettes: false,
      selectedFacets: [],
      onUnselectFacet: () => { },
    }
    const enzymeWrapper = shallow(<SelectedFacetsHeaderRow {...props} />, { context })
    const showableWrapper = enzymeWrapper.find(ShowableAtRender)
    assert.isFalse(showableWrapper.props().show)
  })
  it('should render hidden without selected facets', () => {
    const props = {
      showingFacettes: true,
      selectedFacets: [],
      onUnselectFacet: () => { },
    }
    const enzymeWrapper = shallow(<SelectedFacetsHeaderRow {...props} />, { context })
    const showableWrapper = enzymeWrapper.find(ShowableAtRender)
    assert.isFalse(showableWrapper.props().show)
  })
  it('should render with selected facets', () => {
    const props = {
      showingFacettes: true,
      // rebuild a selected facet of each type
      selectedFacets: [{
        label: { en: 'EN0', fr: 'FR0' },
        model: resultsDump.facets[0],
        value: resultsDump.facets[0].values[0],
      }, {
        label: { en: 'EN1', fr: 'FR1' },
        model: resultsDump.facets[1],
        value: resultsDump.facets[1].values[0],
      }, {
        label: { en: 'EN2', fr: 'FR2' },
        model: resultsDump.facets[2],
        value: resultsDump.facets[2].values[0],
      }, {
        label: { en: 'EN3', fr: 'FR3' },
        model: resultsDump.facets[3],
        value: resultsDump.facets[3].values[0],
      }],
      onUnselectFacet: () => { },
    }
    const enzymeWrapper = shallow(<SelectedFacetsHeaderRow {...props} />, { context })
    const showableWrapper = enzymeWrapper.find(ShowableAtRender)
    assert.isTrue(showableWrapper.props().show, 'selected facets should be displayed')
    // check each rendered element
    // 1 - selected string facet
    const selectedStringFacetWrapper = enzymeWrapper.find(SelectedStringFacetComponent)
    assert.lengthOf(selectedStringFacetWrapper, 1, 'There should be the selected string facet component')
    testSuiteHelpers.assertWrapperProperties(selectedStringFacetWrapper, {
      selectedFacet: props.selectedFacets[0],
      onUnselectFacet: props.onUnselectFacet,
    }, 'Selected string facet wrapper properties shoud be correctly reported')
    // 2 - selected date range facet
    const selectedDateRangeFacetWrapper = enzymeWrapper.find(SelectedDateRangeFacetComponent)
    assert.lengthOf(selectedDateRangeFacetWrapper, 1, 'There should be the selected date range facet component')
    testSuiteHelpers.assertWrapperProperties(selectedDateRangeFacetWrapper, {
      selectedFacet: props.selectedFacets[1],
      onUnselectFacet: props.onUnselectFacet,
    }, 'Selected date range facet wrapper properties shoud be correctly reported')
    // 3 - selected number range facet
    const selectedNumberRangeFacetWrapper = enzymeWrapper.find(SelectedNumberRangeFacetComponent)
    assert.lengthOf(selectedNumberRangeFacetWrapper, 1, 'There should be the selected number range facet component')
    testSuiteHelpers.assertWrapperProperties(selectedNumberRangeFacetWrapper, {
      selectedFacet: props.selectedFacets[2],
      onUnselectFacet: props.onUnselectFacet,
    }, 'Selected number range facet wrapper properties shoud be correctly reported')
    // 3 - selected boolean facet
    const selectedBooleanFacetWrapper = enzymeWrapper.find(SelectedBooleanFacetComponent)
    assert.lengthOf(selectedBooleanFacetWrapper, 1, 'There should be the selected boolean facet component')
    testSuiteHelpers.assertWrapperProperties(selectedBooleanFacetWrapper, {
      selectedFacet: props.selectedFacets[3],
      onUnselectFacet: props.onUnselectFacet,
    }, 'Selected boolean facet wrapper properties shoud be correctly reported')
  })
})
