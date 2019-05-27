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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain, CatalogDomain, CommonDomain } from '@regardsoss/domain'
import { DescriptionProviderContainer } from '@regardsoss/entities-common'
import { UIClient } from '@regardsoss/client'
import {
  searchDataobjectsActions, searchDatasetsActions, searchDatasetsFromDataObjectsActions, searchDocumentsActions,
} from '../../../../src/clients/SearchEntitiesClient'
import { SearchResultsContainer } from '../../../../src/containers/user/results/SearchResultsContainer'
import PluginServicesContainer from '../../../../src/containers/user/results/PluginServicesContainer'
import OrderCartContainer from '../../../../src/containers/user/results/OrderCartContainer'
import SearchResultsComponent from '../../../../src/components/user/results/SearchResultsComponent'
import styles from '../../../../src/styles/styles'
import { datasetEntity, documentEntity } from '../../../dumps/entities.dump'
import { dataContext } from '../../../dumps/data.context.dump'
import { documentsContext } from '../../../dumps/documents.context.dump'
import { CriterionBuilder } from '../../../../src/definitions/CriterionBuilder'
import { attributes } from '../../../dumps/attributes.dump'
import { ToggleOnlyQuicklookContainer } from '../../../../src/containers/user/results/header/options/ToggleOnlyQuicklookContainer'

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
      resultsContext: dataContext,
      accessToken: 'abc',
      projectName: 'def',
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<SearchResultsContainer {...props} />, { context })

    const descriptionProvider = enzymeWrapper.find(DescriptionProviderContainer)
    assert.lengthOf(descriptionProvider, 1, 'It should render the description provider')
    assert.equal(descriptionProvider.props().onSearchTag, enzymeWrapper.instance().onAddSearchTagFromDescription,
      'Description provider callback should be correctly set')

    const servicesProvider = descriptionProvider.find(PluginServicesContainer)
    assert.lengthOf(servicesProvider, 1, 'It should render the service container')
    testSuiteHelpers.assertWrapperProperties(servicesProvider, {
      viewObjectType: props.resultsContext.type,
      restrictedDatasetsIds: enzymeWrapper.state().restrictedDatasetsIds,
      requestParameters: enzymeWrapper.state().requestParameters,
    }, 'Services provider properties should be correctly set')

    const cartContainer = servicesProvider.find(OrderCartContainer)
    assert.lengthOf(cartContainer, 1, 'It should render order cart enabling container')
    testSuiteHelpers.assertWrapperProperties(cartContainer, {
      viewObjectType: props.resultsContext.type,
      tableViewMode: props.resultsContext.typeState[props.resultsContext.type].mode,
      requestParameters: enzymeWrapper.state().requestParameters,
    }, 'Cart container properties should be correctly set')

    const resultsComponent = cartContainer.find(SearchResultsComponent)
    assert.lengthOf(resultsComponent, 1, 'It should render a search results component')
    testSuiteHelpers.assertWrapperProperties(resultsComponent, {
      moduleId: props.moduleId,
      resultsContext: props.resultsContext,
      requestParameters: enzymeWrapper.state().requestParameters,
      searchActions: enzymeWrapper.state().searchActions,
      accessToken: props.accessToken,
      projectName: props.projectName,
      onSearchEntity: enzymeWrapper.instance().onSearchEntity,
    }, 'Results component properties should be correctly set')
  })
  it('should render correctly with documents context', () => {
    const props = {
      moduleId: 1,
      resultsContext: documentsContext,
      accessToken: 'abc',
      projectName: 'def',
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<SearchResultsContainer {...props} />, { context })

    const descriptionProvider = enzymeWrapper.find(DescriptionProviderContainer)
    assert.lengthOf(descriptionProvider, 1, 'It should render the description provider')
    assert.equal(descriptionProvider.props().onSearchTag, enzymeWrapper.instance().onAddSearchTagFromDescription,
      'Description provider callback should be correctly set')

    const servicesProvider = descriptionProvider.find(PluginServicesContainer)
    assert.lengthOf(servicesProvider, 1, 'It should render the service container')
    testSuiteHelpers.assertWrapperProperties(servicesProvider, {
      viewObjectType: props.resultsContext.type,
      restrictedDatasetsIds: enzymeWrapper.state().restrictedDatasetsIds,
      requestParameters: enzymeWrapper.state().requestParameters,
    }, 'Services provider properties should be correctly set')

    const cartContainer = servicesProvider.find(OrderCartContainer)
    assert.lengthOf(cartContainer, 1, 'It should render order cart enabling container')
    testSuiteHelpers.assertWrapperProperties(cartContainer, {
      viewObjectType: props.resultsContext.type,
      tableViewMode: props.resultsContext.typeState[props.resultsContext.type].mode,
      requestParameters: enzymeWrapper.state().requestParameters,
    }, 'Cart container properties should be correctly set')

    const resultsComponent = cartContainer.find(SearchResultsComponent)
    assert.lengthOf(resultsComponent, 1, 'It should render a search results component')
    testSuiteHelpers.assertWrapperProperties(resultsComponent, {
      moduleId: props.moduleId,
      resultsContext: props.resultsContext,
      requestParameters: enzymeWrapper.state().requestParameters,
      searchActions: enzymeWrapper.state().searchActions,
      accessToken: props.accessToken,
      projectName: props.projectName,
      onSearchEntity: enzymeWrapper.instance().onSearchEntity,
    }, 'Results component properties should be correctly set')
  })
  it('should update request parameters, actions and restricted dataset as context changes', () => {
    // start from empty data context (datasets should be initially selected)
    const props = {
      moduleId: 1,
      resultsContext: dataContext,
      accessToken: 'abc',
      projectName: 'def',
      updateResultsContext: () => {},
    }
    const enzymeWrapper = shallow(<SearchResultsContainer {...props} />, { context })
    // nota: we do not want to compute here applyingCriteria field, as it is used only for inner management
    let state = enzymeWrapper.state()
    assert.deepEqual(state.restrictedDatasetsIds, [], '(1) Dataset restrictions should be correctly computed for empty / DATASET')
    assert.deepEqual(state.requestParameters, {}, '(1) Request parameters should be correctly computed for empty / DATASET')
    assert.deepEqual(state.searchActions, searchDatasetsActions, '(1) Search actions should be correctly computed for empty / DATASET')

    // add 2 tags (context and user, container should not differenciate them)
    let nextContext = {
      ...dataContext,
      criteria: {
        contextTags: [CriterionBuilder.buildEntityTagCriterion(datasetEntity), {
          // simple word tag
          label: 'coffee', // label is search key
          type: CatalogDomain.TAG_TYPES_ENUM.WORD,
          searchKey: 'coffee',
          requestParameters: {
            [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]:
              new CatalogDomain.OpenSearchQueryParameter(CatalogDomain.OpenSearchQuery.TAGS_PARAM_NAME, 'coffee').toQueryString(),
          },
        }],
        tags: [{
          // simple word tag
          label: 'tea', // label is search key
          type: CatalogDomain.TAG_TYPES_ENUM.WORD,
          searchKey: 'tea',
          requestParameters: {
            [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]:
              new CatalogDomain.OpenSearchQueryParameter(CatalogDomain.OpenSearchQuery.TAGS_PARAM_NAME, 'tea').toQueryString(),
          },
        }, CriterionBuilder.buildEntityTagCriterion(documentEntity)],
      },
    }
    enzymeWrapper.setProps({
      ...props,
      resultsContext: nextContext,
    })
    state = enzymeWrapper.state()
    assert.deepEqual(state.restrictedDatasetsIds, [datasetEntity.content.id], '(2) Dataset restrictions should be correctly computed for DATASET with query')
    assert.deepEqual(state.requestParameters, {
      q: 'tags:"URN%3AAIP%3ADATASET%3Aproject1%3A3aeed1bc-3c14-4100-bcd1-c4f370e679a2%3AV1" AND tags:coffee AND tags:tea AND tags:"URN%3AAIP%3ADOCUMENT%3Aproject1%3A3aeed1bc-3c14-4100-bcd1-c4f370e679a2%3AV1"',
    }, '(2) Request parameters should be correctly computed for DATASET with query')
    assert.deepEqual(state.searchActions, searchDatasetsFromDataObjectsActions, '(2) Search actions should be correctly computed for DATASET with query')
    // Enter data mode, add sorting, facets request, active facets, quicklook filter and one more dataset tag
    nextContext = UIClient.ResultsContextHelper.mergeDeep(nextContext, {
      type: DamDomain.ENTITY_TYPES_ENUM.DATA,
      criteria: {
        tags: [...nextContext.criteria.tags,
          CriterionBuilder.buildEntityTagCriterion({
            content: {
              ...datasetEntity.content,
              id: 'URN:AIP:DATASET:anotherDataset',
            },
          }),
        ],
        appliedFacets: [{
          facetLabels: { en: 'idc.facet.value', fr: 'jmf.valeur.facette' },
          attribute: attributes[1],
          facetType: CatalogDomain.FACET_TYPES_ENUM.STRING,
          facetValue: 'coffee',
          requestParameters: {
            q: 'my.attr.1=coffee',
          },
        }],
        quicklooksFiltering: [ToggleOnlyQuicklookContainer.ONLY_QUICKLOOK_CRITERION],
      },
      typeState: {
        [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
          isInInitialSorting: false,
          criteria: {
            sorting: [
              CriterionBuilder.buildSortCriterion(attributes[1], CommonDomain.SORT_ORDERS_ENUM.DESCENDING_ORDER),
              CriterionBuilder.buildSortCriterion(attributes[2], CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER),
            ],
            requestFacets: [{
              facetLabels: { en: 'idc.facet', fr: 'jmf.facette' },
              attribute: attributes[1],
              requestParameters: { [CatalogDomain.CatalogSearchQueryHelper.FACETS_PARAMETER_NAME]: attributes[1].content.jsonPath },
            }],
          },
        },
      },
    })
    enzymeWrapper.setProps({
      ...props,
      resultsContext: nextContext,
    })
    state = enzymeWrapper.state()
    assert.deepEqual(state.restrictedDatasetsIds, [datasetEntity.content.id, 'URN:AIP:DATASET:anotherDataset'], '(3) Dataset restrictions should be correctly computed for DATA with query')
    assert.deepEqual(state.requestParameters, {
      // tags, applying facets and quicklooks restriction
      q: 'tags:"URN%3AAIP%3ADATASET%3Aproject1%3A3aeed1bc-3c14-4100-bcd1-c4f370e679a2%3AV1" AND tags:coffee AND tags:tea AND tags:"URN%3AAIP%3ADOCUMENT%3Aproject1%3A3aeed1bc-3c14-4100-bcd1-c4f370e679a2%3AV1" AND tags:"URN%3AAIP%3ADATASET%3AanotherDataset" AND my.attr.1=coffee',
      sort: ['my.attr.1,DESC', 'my.attr.2,ASC'], // sort
      facets: ['my.attr.1'], // requested facets
      exists: ['feature.files.QUICKLOOK_SD'], // quicklook exists filter
    }, '(3) Request parameters should be correctly computed for DATA with query')
    assert.deepEqual(state.searchActions, searchDataobjectsActions, '(3) Search actions should be correctly computed for DATA with query')
    // Finally, just change totally context to enter documents one (not a normal use case but container should handle it too)
    enzymeWrapper.setProps({
      ...props,
      resultsContext: {
        ...documentsContext,
        criteria: {
          tags: [
            CriterionBuilder.buildEntityTagCriterion(documentEntity), {
              // simple word tag
              label: 'tea', // label is search key
              type: CatalogDomain.TAG_TYPES_ENUM.WORD,
              searchKey: 'tea',
              requestParameters: {
                [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]:
                  new CatalogDomain.OpenSearchQueryParameter(CatalogDomain.OpenSearchQuery.TAGS_PARAM_NAME, 'tea').toQueryString(),
              },
            },
          ],
        },
      },
    })
    state = enzymeWrapper.state()
    assert.isEmpty(state.restrictedDatasetsIds, '(4) Dataset restrictions should be not apply for documents')
    assert.deepEqual(state.requestParameters, {
      q: 'tags:"URN%3AAIP%3ADOCUMENT%3Aproject1%3A3aeed1bc-3c14-4100-bcd1-c4f370e679a2%3AV1" AND tags:tea',
      facets: ['my.attr.1'], // from configuration, initially enabled
    }, '(4) Request parameters should be correctly computed for DOCUMENT with query')
    assert.deepEqual(state.searchActions, searchDocumentsActions, '(4) Search actions should be correctly computed for DOCUMENT with query')
  })
})
