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
import { CatalogDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SelectedNumberRangeFacetComponent from '../../../../../../../../src/components/user/tabs/results/header/filter/facets/SelectedNumberRangeFacetComponent'
import SelectedFacetComponent from '../../../../../../../../src/components/user/tabs/results/header/filter/facets/SelectedFacetComponent'
import styles from '../../../../../../../../src/styles'
import { attributes } from '../../../../../../../dumps/attributes.dump'
import resultsDump from '../../../../../../../dumps/results.dump'

const context = buildTestContext(styles)

/**
 * Test SelectedNumberRangeFacetComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing SelectedNumberRangeFacetComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SelectedNumberRangeFacetComponent)
  })
  it('should render correctly with a range ] -inf, value ]', () => {
    const props = {
      selectedFacetValue: {
        facetType: CatalogDomain.FACET_TYPES_ENUM.NUMBER,
        facetValue: {
          upper: resultsDump.facets[2].values[0].upperBound,
          lower: resultsDump.facets[2].values[0].lowerBound,
        },
        facetLabels: { en: 'EN1', fr: 'FR1' },
        attribute: attributes[1],
        requestParameters: {},
      },
      onUnselectFacetValue: () => { },
    }
    const enzymeWrapper = shallow(<SelectedNumberRangeFacetComponent {...props} />, { context })
    const selectedFacetRenderWrapper = enzymeWrapper.find(SelectedFacetComponent)
    assert.lengthOf(selectedFacetRenderWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(selectedFacetRenderWrapper, {
      label: 'search.facets.filter.chip.number.lower',
      selectedFacetValue: props.selectedFacetValue,
      onUnselectFacetValue: props.onUnselectFacetValue,
    })
  })
  it('should render correctly with a range [ value, +inf [', () => {
    const props = {
      selectedFacetValue: {
        facetType: CatalogDomain.FACET_TYPES_ENUM.NUMBER,
        facetValue: {
          upper: resultsDump.facets[2].values[9].upperBound,
          lower: resultsDump.facets[2].values[9].lowerBound,
        },
        facetLabels: { en: 'EN1', fr: 'FR1' },
        attribute: attributes[1],
        requestParameters: {},
      },
      onUnselectFacetValue: () => { },
    }
    const enzymeWrapper = shallow(<SelectedNumberRangeFacetComponent {...props} />, { context })
    const selectedFacetRenderWrapper = enzymeWrapper.find(SelectedFacetComponent)
    assert.lengthOf(selectedFacetRenderWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(selectedFacetRenderWrapper, {
      label: 'search.facets.filter.chip.number.greater',
      selectedFacetValue: props.selectedFacetValue,
      onUnselectFacetValue: props.onUnselectFacetValue,
    })
  })
  it('should render correctly with a range [ value1, value2 ]', () => {
    const props = {
      selectedFacetValue: {
        facetType: CatalogDomain.FACET_TYPES_ENUM.NUMBER,
        facetValue: {
          upper: resultsDump.facets[2].values[1].upperBound,
          lower: resultsDump.facets[2].values[1].lowerBound,
        },
        facetLabels: { en: 'EN1', fr: 'FR1' },
        attribute: attributes[1],
        requestParameters: {},
      },
      onUnselectFacetValue: () => { },
    }
    const enzymeWrapper = shallow(<SelectedNumberRangeFacetComponent {...props} />, { context })
    const selectedFacetRenderWrapper = enzymeWrapper.find(SelectedFacetComponent)
    assert.lengthOf(selectedFacetRenderWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(selectedFacetRenderWrapper, {
      label: 'search.facets.filter.chip.number.range',
      selectedFacetValue: props.selectedFacetValue,
      onUnselectFacetValue: props.onUnselectFacetValue,
    })
  })
  it('should render correctly with a simple value', () => {
    const props = {
      selectedFacetValue: {
        facetType: CatalogDomain.FACET_TYPES_ENUM.NUMBER,
        facetValue: {
          upper: resultsDump.facets[2].values[8].upperBound,
          lower: resultsDump.facets[2].values[8].lowerBound,
        },
        facetLabels: { en: 'EN1', fr: 'FR1' },
        attribute: attributes[1],
        requestParameters: {},
      },
      onUnselectFacetValue: () => { },
    }
    const enzymeWrapper = shallow(<SelectedNumberRangeFacetComponent {...props} />, { context })
    const selectedFacetRenderWrapper = enzymeWrapper.find(SelectedFacetComponent)
    assert.lengthOf(selectedFacetRenderWrapper, 1)
    testSuiteHelpers.assertWrapperProperties(selectedFacetRenderWrapper, {
      label: 'search.facets.filter.chip.number.value',
      selectedFacetValue: props.selectedFacetValue,
      onUnselectFacetValue: props.onUnselectFacetValue,
    })
  })
})
