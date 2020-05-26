/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ShowableAtRender } from '@regardsoss/display-control'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CriterionBuilder } from '../../../../../../src/definitions/CriterionBuilder'
import ApplyingCriteriaHeaderRowComponent from '../../../../../../src/components/user/tabs/results/header/ApplyingCriteriaHeaderRowComponent'
import TagCriterionComponent from '../../../../../../src/components/user/tabs/results/header/filter/TagCriterionComponent'
import SelectedBooleanFacetComponent from '../../../../../../src/components/user/tabs/results/header/filter/facets/SelectedBooleanFacetComponent'
import SelectedDateRangeFacetComponent from '../../../../../../src/components/user/tabs/results/header/filter/facets/SelectedDateRangeFacetComponent'
import SelectedNumberRangeFacetComponent from '../../../../../../src/components/user/tabs/results/header/filter/facets/SelectedNumberRangeFacetComponent'
import SelectedStringFacetComponent from '../../../../../../src/components/user/tabs/results/header/filter/facets/SelectedStringFacetComponent'
import GeometryCriterionComponent from '../../../../../../src/components/user/tabs/results/header/filter/GeometryCriterionComponent'
import EntitiesSelectionCriterionComponent from '../../../../../../src/components/user/tabs/results/header/filter/EntitiesSelectionCriterionComponent'
import styles from '../../../../../../src/styles'
import resultsDump from '../../../../../dumps/results.dump'
import { datasetEntity } from '../../../../../dumps/entities.dump'
import { attributes } from '../../../../../dumps/attributes.dump'
import SearchCriteriaComponent from '../../../../../../src/components/user/tabs/results/header/filter/SearchCriteriaComponent'
import StaticParameterCriterionComponent from '../../../../../../src/components/user/tabs/results/header/filter/StaticParameterCriterionComponent'
import ReactiveStaticParameterCriterionComponent from '../../../../../../src/components/user/tabs/results/header/filter/ReactiveStaticParameterCriterionComponent'

const context = buildTestContext(styles)

const aDatasetTag = CriterionBuilder.buildEntityTagCriterion(datasetEntity)

// Some criteria def (common to all tests below)
const boolFacet = {
  facetType: CatalogDomain.FACET_TYPES_ENUM.BOOLEAN,
  facetValue: resultsDump.facets[3].values[0].value,
  facetLabels: { en: 'EN3', fr: 'FR3' },
  attribute: attributes[1],
  requestParameters: {},
}

const dateRangeFacet = {
  facetType: CatalogDomain.FACET_TYPES_ENUM.DATE,
  facetValue: {
    upper: resultsDump.facets[1].values[0].upperBound,
    lower: resultsDump.facets[1].values[0].lowerBound,
  },
  facetLabels: { en: 'EN1', fr: 'FR1' },
  attribute: attributes[1],
  requestParameters: {},
}

const numberRangeFacet = {
  facetType: CatalogDomain.FACET_TYPES_ENUM.NUMBER,
  facetValue: {
    upper: resultsDump.facets[2].values[0].upperBound,
    lower: resultsDump.facets[2].values[0].lowerBound,
  },
  facetLabels: { en: 'EN1', fr: 'FR1' },
  attribute: attributes[1],
  requestParameters: {},
}

const wordFacet = {
  facetType: CatalogDomain.FACET_TYPES_ENUM.STRING,
  facetValue: resultsDump.facets[0].values[0].word,
  facetLabels: { en: 'EN8', fr: 'FR8' },
  attribute: attributes[1],
  requestParameters: {},
}

const entitiesSelection = {
  entitiesCount: 25,
  requestParameters: {},
}

const geometrySelection = {
  point1: [1, 2],
  point2: [3, 4],
  requestParameters: {},
}

/**
 * Test ApplyingCriteriaHeaderRowComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ApplyingCriteriaHeaderRowComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ApplyingCriteriaHeaderRowComponent)
  })
  it('should render hidden when no criterion is applying', () => {
    const props = {
      tagsFiltering: [],
      facetValues: [],
      geometries: [],
      entitiesSelections: [],
      searchCriteria: [],
      staticParameters: [],
      onUnselectTagFilter: () => {},
      onUnselectFacetValue: () => {},
      onUnselectGeometry: () => {},
      onUnselectEntitiesSelection: () => {},
      onUnselectSearchCriteria: () => {},
      onToggleStaticParameter: () => {},
    }
    const enzymeWrapper = shallow(<ApplyingCriteriaHeaderRowComponent {...props} />, { context })
    const showable = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showable, 1)
    assert.isFalse(showable.props().show)
  })
  it('should render visible with one tag filter only', () => {
    const props = {
      tagsFiltering: [aDatasetTag],
      facetValues: [],
      geometries: [],
      entitiesSelections: [],
      searchCriteria: [],
      staticParameters: [],
      onUnselectTagFilter: () => {},
      onUnselectFacetValue: () => {},
      onUnselectGeometry: () => {},
      onUnselectEntitiesSelection: () => {},
      onUnselectSearchCriteria: () => {},
      onToggleStaticParameter: () => {},
    }
    const enzymeWrapper = shallow(<ApplyingCriteriaHeaderRowComponent {...props} />, { context })
    const showable = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showable, 1)
    assert.isTrue(showable.props().show)
  })
  it('should render visible whth one facet only', () => {
    const props = {
      tagsFiltering: [],
      facetValues: [boolFacet],
      geometries: [],
      entitiesSelections: [],
      searchCriteria: [],
      staticParameters: [],
      onUnselectTagFilter: () => {},
      onUnselectFacetValue: () => {},
      onUnselectGeometry: () => {},
      onUnselectEntitiesSelection: () => {},
      onUnselectSearchCriteria: () => {},
      onToggleStaticParameter: () => {},
    }
    const enzymeWrapper = shallow(<ApplyingCriteriaHeaderRowComponent {...props} />, { context })
    const showable = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showable, 1)
    assert.isTrue(showable.props().show)
  })
  it('should render visible whth one entities selection only', () => {
    const props = {
      tagsFiltering: [],
      facetValues: [],
      geometries: [],
      entitiesSelections: [entitiesSelection],
      searchCriteria: [],
      staticParameters: [],
      onUnselectTagFilter: () => {},
      onUnselectFacetValue: () => {},
      onUnselectGeometry: () => {},
      onUnselectEntitiesSelection: () => {},
      onUnselectSearchCriteria: () => {},
      onToggleStaticParameter: () => {},
    }
    const enzymeWrapper = shallow(<ApplyingCriteriaHeaderRowComponent {...props} />, { context })
    const showable = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showable, 1)
    assert.isTrue(showable.props().show)
  })
  it('should render visible whth one geometry selection only', () => {
    const props = {
      tagsFiltering: [],
      facetValues: [],
      geometries: [geometrySelection],
      entitiesSelections: [],
      searchCriteria: [],
      staticParameters: [],
      onUnselectTagFilter: () => {},
      onUnselectFacetValue: () => {},
      onUnselectGeometry: () => {},
      onUnselectEntitiesSelection: () => {},
      onUnselectSearchCriteria: () => {},
      onToggleStaticParameter: () => {},
    }
    const enzymeWrapper = shallow(<ApplyingCriteriaHeaderRowComponent {...props} />, { context })
    const showable = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showable, 1)
    assert.isTrue(showable.props().show)
  })
  it('should render visible with one active static parameter', () => {
    const props = {
      tagsFiltering: [],
      facetValues: [],
      geometries: [],
      entitiesSelections: [],
      searchCriteria: [],
      staticParameters: [{
        parameters: {
          q: 'attr1:val1',
        },
        requestParameters: {
          q: 'attr1:val1',
        },
        active: true,
        label: 'myFakeStaticParam1',
      }],
      onUnselectTagFilter: () => {},
      onUnselectFacetValue: () => {},
      onUnselectGeometry: () => {},
      onUnselectEntitiesSelection: () => {},
      onUnselectSearchCriteria: () => {},
      onToggleStaticParameter: () => {},
    }
    const enzymeWrapper = shallow(<ApplyingCriteriaHeaderRowComponent {...props} />, { context })
    const showable = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showable, 1)
    assert.isTrue(showable.props().show)
  })
  it('should render visible with one reactive static parameter', () => {
    const props = {
      tagsFiltering: [],
      facetValues: [],
      geometries: [],
      entitiesSelections: [],
      searchCriteria: [],
      staticParameters: [{
        parameters: {
          q: 'attr2:val2',
        },
        requestParameters: {},
        active: false,
        label: 'myFakeStaticParam2',
      }],
      onUnselectTagFilter: () => {},
      onUnselectFacetValue: () => {},
      onUnselectGeometry: () => {},
      onUnselectEntitiesSelection: () => {},
      onUnselectSearchCriteria: () => {},
      onToggleStaticParameter: () => {},
    }
    const enzymeWrapper = shallow(<ApplyingCriteriaHeaderRowComponent {...props} />, { context })
    const showable = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showable, 1)
    assert.isTrue(showable.props().show)
  })
  it('should render visible whth one search criterion only', () => {
    const props = {
      tagsFiltering: [],
      facetValues: [],
      geometries: [geometrySelection],
      entitiesSelections: [],
      searchCriteria: [{
        pluginInstanceId: 'myFakeCrit118',
        state: {
          searchText: 'Any',
          myBool: false,
        },
        requestParameters: {
          gg: 'gg!',
          q: 'azerty',
        },
      }],
      staticParameters: [],
      onUnselectTagFilter: () => {},
      onUnselectFacetValue: () => {},
      onUnselectGeometry: () => {},
      onUnselectEntitiesSelection: () => {},
      onUnselectSearchCriteria: () => {},
      onToggleStaticParameter: () => {},
    }
    const enzymeWrapper = shallow(<ApplyingCriteriaHeaderRowComponent {...props} />, { context })
    const showable = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showable, 1)
    assert.isTrue(showable.props().show)
  })
  it('should render all available filters', () => {
    const props = {
      tagsFiltering: [aDatasetTag],
      facetValues: [boolFacet, dateRangeFacet, numberRangeFacet, wordFacet],
      geometries: [geometrySelection],
      entitiesSelections: [entitiesSelection],
      searchCriteria: [{
        pluginInstanceId: 'myFakeCrit118',
        state: {
          searchText: 'Any',
          myBool: false,
        },
        requestParameters: {
          gg: 'gg!',
          q: 'azerty',
        },
      }],
      staticParameters: [{
        parameters: {
          q: 'attr1:val1',
        },
        requestParameters: {
          q: 'attr1:val1',
        },
        active: true,
        label: 'myFakeStaticParam1',
      }, {
        parameters: {
          q: 'attr2:val2',
        },
        requestParameters: {},
        active: false,
        label: 'myFakeStaticParam2',
      }],
      onUnselectTagFilter: () => {},
      onUnselectFacetValue: () => {},
      onUnselectGeometry: () => {},
      onUnselectEntitiesSelection: () => {},
      onUnselectSearchCriteria: () => {},
      onToggleStaticParameter: () => {},
    }
    const enzymeWrapper = shallow(<ApplyingCriteriaHeaderRowComponent {...props} />, { context })
    const showable = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showable, 1)
    assert.isTrue(showable.props().show)

    const tagFilterComponent = enzymeWrapper.find(TagCriterionComponent)
    assert.lengthOf(tagFilterComponent, 1, 'There should be a tag criterion filter component')
    testSuiteHelpers.assertWrapperProperties(tagFilterComponent, {
      tagCriterion: aDatasetTag,
      onUnselectTagFilter: props.onUnselectTagFilter,
    }, 'Tag filter component properties should be correctly set')

    const boolFacetComponent = enzymeWrapper.find(SelectedBooleanFacetComponent)
    assert.lengthOf(boolFacetComponent, 1, 'There should be selected boolean facet displayer')
    testSuiteHelpers.assertWrapperProperties(boolFacetComponent, {
      selectedFacetValue: boolFacet,
      onUnselectFacetValue: props.onUnselectFacetValue,
    }, 'Selected boolean facet displayer properties should be correctly reported')

    const dateFacetComponent = enzymeWrapper.find(SelectedDateRangeFacetComponent)
    assert.lengthOf(dateFacetComponent, 1, 'There should be selected date facet displayer')
    testSuiteHelpers.assertWrapperProperties(dateFacetComponent, {
      selectedFacetValue: dateRangeFacet,
      onUnselectFacetValue: props.onUnselectFacetValue,
    }, 'Selected date facet displayer properties should be correctly reported')

    const numberFacetComponent = enzymeWrapper.find(SelectedNumberRangeFacetComponent)
    assert.lengthOf(numberFacetComponent, 1, 'There should be selected number facet displayer')
    testSuiteHelpers.assertWrapperProperties(numberFacetComponent, {
      selectedFacetValue: numberRangeFacet,
      onUnselectFacetValue: props.onUnselectFacetValue,
    }, 'Selected number facet displayer properties should be correctly reported')

    const wordFacetComponent = enzymeWrapper.find(SelectedStringFacetComponent)
    assert.lengthOf(wordFacetComponent, 1, 'There should be selected word facet displayer')
    testSuiteHelpers.assertWrapperProperties(wordFacetComponent, {
      selectedFacetValue: wordFacet,
      onUnselectFacetValue: props.onUnselectFacetValue,
    }, 'Selected word facet displayer properties should be correctly reported')

    const entitiesSelectionComponent = enzymeWrapper.find(EntitiesSelectionCriterionComponent)
    assert.lengthOf(entitiesSelectionComponent, 1, 'There should be entities selection displayer')
    testSuiteHelpers.assertWrapperProperties(entitiesSelectionComponent, {
      entitiesSelectionCriterion: entitiesSelection,
      onUnselectEntitiesSelection: props.onUnselectEntitiesSelection,
    }, 'Selected entities displayer properties should be correctly reported')

    const geometryComponent = enzymeWrapper.find(GeometryCriterionComponent)
    assert.lengthOf(geometryComponent, 1, 'There should be geometry displayer')
    testSuiteHelpers.assertWrapperProperties(geometryComponent, {
      geometryCriterion: geometrySelection,
      onUnselectGeometry: props.onUnselectGeometry,
    }, 'Geometry displayer properties should be correctly reported')

    const searchCriteriaComponent = enzymeWrapper.find(SearchCriteriaComponent)
    assert.lengthOf(searchCriteriaComponent, 1, 'There should be search criteria displayer')
    testSuiteHelpers.assertWrapperProperties(searchCriteriaComponent, {
      onUnselectSearchCriteria: props.onUnselectSearchCriteria,
    }, 'Search criteria properties should be correctly reported')

    const staticParameterCriterionComponent = enzymeWrapper.find(StaticParameterCriterionComponent)
    assert.lengthOf(staticParameterCriterionComponent, 1, 'There should be search criteria displayer')
    testSuiteHelpers.assertWrapperProperties(staticParameterCriterionComponent, {
      onUnselectStaticParameter: props.onToggleStaticParameter,
      staticParameter: props.staticParameters[0],
    }, 'Static Parameter Criterion properties should be correctly reported')

    const reactiveStaticParameterCriterionComponent = enzymeWrapper.find(ReactiveStaticParameterCriterionComponent)
    assert.lengthOf(reactiveStaticParameterCriterionComponent, 1, 'There should be search criteria displayer')
    testSuiteHelpers.assertWrapperProperties(reactiveStaticParameterCriterionComponent, {
      onSelectStaticParameter: props.onToggleStaticParameter,
      staticParameter: props.staticParameters[1],
    }, 'Reactive Static Parameter Criterion properties should be correctly reported')
  })
})
