/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import {
  DamDomain, CatalogDomain, CommonDomain, UIDomain,
} from '@regardsoss/domain'
import { getSearchCatalogClient } from '../../../../../src/clients/SearchEntitiesClient'
import { SearchResultsContainer } from '../../../../../src/containers/user/tabs/results/SearchResultsContainer'
import DescriptionLinkContainer from '../../../../../src/containers/user/tabs/results/DescriptionLinkContainer'
import PluginServicesContainer from '../../../../../src/containers/user/tabs/results/PluginServicesContainer'
import OrderCartContainer from '../../../../../src/containers/user/tabs/results/OrderCartContainer'
import SearchResultsComponent from '../../../../../src/components/user/tabs/results/SearchResultsComponent'
import styles from '../../../../../src/styles/styles'
import { datasetEntity, anotherDatasetEntity } from '../../../../dumps/entities.dump'
import { dataContext } from '../../../../dumps/data.context.dump'
import { CriterionBuilder } from '../../../../../src/definitions/CriterionBuilder'
import { attributes } from '../../../../dumps/attributes.dump'

const context = buildTestContext(styles)

describe('[SEARCH RESULTS] Testing SearchResultsContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchResultsContainer)
  })

  it('should render correctly with data context', () => {
    const props = {
      moduleId: 1,
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      project: 'p1',
      appName: UIDomain.APPLICATIONS_ENUM.USER,
      resultsContext: dataContext,
      updateResultsContext: () => {},
      fetchToponym: () => { },
    }
    const enzymeWrapper = shallow(<SearchResultsContainer {...props} />, { context })

    const descriptionContainer = enzymeWrapper.find(DescriptionLinkContainer)
    assert.lengthOf(descriptionContainer, 1, 'It should render the description provider')
    testSuiteHelpers.assertWrapperProperties(descriptionContainer, {
      moduleId: props.moduleId,
    }, 'Description link provider properties should be correctly set')

    const servicesProvider = descriptionContainer.find(PluginServicesContainer)
    assert.lengthOf(servicesProvider, 1, 'It should render the service container')
    const expectedSelectedType = props.resultsContext.tabs[props.tabType].selectedType
    testSuiteHelpers.assertWrapperProperties(servicesProvider, {
      tabType: props.tabType,
      viewObjectType: expectedSelectedType,
      restrictedDatasetsIds: enzymeWrapper.state().restrictedDatasetsIds,
      requestParameters: enzymeWrapper.state().requestParameters,
    }, 'Services provider properties should be correctly set')

    const cartContainer = servicesProvider.find(OrderCartContainer)
    const expectedSelectedMode = props.resultsContext.tabs[props.tabType].types[expectedSelectedType].selectedMode
    assert.lengthOf(cartContainer, 1, 'It should render order cart enabling container')
    testSuiteHelpers.assertWrapperProperties(cartContainer, {
      tabType: props.tabType,
      viewObjectType: expectedSelectedType,
      tableViewMode: expectedSelectedMode,
      requestParameters: enzymeWrapper.state().requestParameters,
    }, 'Cart container properties should be correctly set')

    const resultsComponent = cartContainer.find(SearchResultsComponent)
    assert.lengthOf(resultsComponent, 1, 'It should render a search results component')
    testSuiteHelpers.assertWrapperProperties(resultsComponent, {
      moduleId: props.moduleId,
      tabType: props.tabType,
      resultsContext: props.resultsContext,
      requestParameters: enzymeWrapper.state().requestParameters,
      searchActions: enzymeWrapper.state().searchActions,
      accessToken: props.accessToken,
      projectName: props.project,
      onSearchEntity: enzymeWrapper.instance().onSearchEntity,
    }, 'Results component properties should be correctly set')
  })
  it('should update request parameters, actions and restricted dataset as context changes', () => {
    // start from empty data context (datasets should be initially selected)
    const props = {
      moduleId: 1,
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      project: 'p1',
      appName: UIDomain.APPLICATIONS_ENUM.USER,
      resultsContext: dataContext,
      updateResultsContext: () => {},
      fetchToponym: () => { },
    }
    const enzymeWrapper = shallow(<SearchResultsContainer {...props} />, { context })
    // nota: we do not want to compute here applyingCriteria field, as it is used only for inner management
    let state = enzymeWrapper.state()
    assert.deepEqual(state.restrictedDatasetsIds, [], '(1) Dataset restrictions should be correctly computed for empty / DATASET')
    assert.deepEqual(state.requestParameters, {
      facets: [
        'my.attr.1',
        'my.attr.2',
      ],
      q: ['tags:"URN:DATASET:EXAMPLE1"'],
    }, '(1) Request parameters should contain only configured restriction datasets')
    assert.deepEqual(state.searchActions, getSearchCatalogClient(props.tabType).searchDatasetsActions, '(1) Search actions should be correctly computed for empty / DATASET')

    // add 2 tags (context and user, container should not differenciate them)
    let nextContext = UIDomain.ResultsContextHelper.deepMerge(dataContext, {
      selectedTab: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          criteria: {
            contextTags: [
              CriterionBuilder.buildEntityTagCriterion(datasetEntity),
              CriterionBuilder.buildWordTagCriterion('coffee')],
          },
        },
      },
    })
    enzymeWrapper.setProps({
      ...props,
      resultsContext: nextContext,
    })
    state = enzymeWrapper.state()
    assert.deepEqual(state.restrictedDatasetsIds, [datasetEntity.content.id], '(2) Dataset restrictions should be correctly computed for DATASET with query')
    assert.deepEqual(state.requestParameters, {
      facets: [
        'my.attr.1',
        'my.attr.2',
      ],
      q: ['tags:"URN:DATASET:EXAMPLE1" AND tags:"URN:AIP:DATASET:project1:3aeed1bc-3c14-4100-bcd1-c4f370e679a2:V1" AND tags:"coffee"'],
    }, '(2) Request parameters should be correctly computed for DATASET with query')
    assert.deepEqual(state.searchActions, getSearchCatalogClient(props.tabType).searchDatasetsActions, '(2) Search actions should be correctly computed for DATASET with query')
    // Enter data mode, add sorting, facets request, active facets, quicklook filter and a dataset filter tag
    nextContext = UIDomain.ResultsContextHelper.deepMerge(nextContext, {
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          selectedType: DamDomain.ENTITY_TYPES_ENUM.DATA,
          criteria: {
            appliedFacets: [{
              facetLabels: { en: 'idc.facet.value', fr: 'jmf.valeur.facette' },
              attribute: attributes[1],
              facetType: CatalogDomain.FACET_TYPES_ENUM.STRING,
              facetValue: 'coffee',
              requestParameters: {
                q: 'my.attr.1=coffee',
              },
            }],
            tagsFiltering: [CriterionBuilder.buildEntityTagCriterion(anotherDatasetEntity)],
            requestFacets: [{
              facetLabels: { en: 'idc.facet', fr: 'jmf.facette' },
              attribute: attributes[1],
              requestParameters: { [CatalogDomain.CatalogSearchQueryHelper.FACETS_PARAMETER_NAME]: attributes[1].content.jsonPath },
            }],
          },
          types: {
            [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
              isInInitialSorting: false,
              criteria: {
                sorting: [
                  CriterionBuilder.buildSortCriterion(attributes[1], CommonDomain.SORT_ORDERS_ENUM.DESCENDING_ORDER),
                  CriterionBuilder.buildSortCriterion(attributes[2], CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER),
                ],
              },
            },
          },
        },
      },
    })
    enzymeWrapper.setProps({
      ...props,
      resultsContext: nextContext,
    })
    state = enzymeWrapper.state()
    assert.deepEqual(state.restrictedDatasetsIds, [datasetEntity.content.id, anotherDatasetEntity.content.id], '(3) Dataset restrictions should be correctly computed for DATA with query')
    assert.deepEqual(state.requestParameters, {
      // configuration, tags and applying facets
      q: ['tags:"URN:DATASET:EXAMPLE1" AND tags:"URN:AIP:DATASET:project1:3aeed1bc-3c14-4100-bcd1-c4f370e679a2:V1" AND tags:"coffee" AND my.attr.1=coffee AND tags:"URN:AIP:DATASET:project1:XXXX2:V2"'],
      sort: ['my.attr.1,DESC', 'my.attr.2,ASC'], // sort
      facets: ['my.attr.1'], // requested facets
    }, '(3) Request parameters should be correctly computed for DATA with query')
    assert.deepEqual(state.searchActions, getSearchCatalogClient(props.tabType).searchDataobjectsActions, '(3) Search actions should be correctly computed for DATA with query')
  })
})
