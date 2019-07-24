/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CatalogDomain, DamDomain } from '@regardsoss/domain'
import { modulesManager, LazyModuleComponent } from '@regardsoss/modules'
import { NavigableSearchResultsContainer } from '../../../src/containers/user/NavigableSearchResultsContainer'
import styles from '../../../src/styles/styles'
import { configuration1 } from '../../dumps/configuration.dump'

const context = buildTestContext(styles)

describe('[Search Graph] Testing NavigableSearchResultsContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigableSearchResultsContainer)
  })
  it('should render correctly and update controlled results context', () => {
    let spiedStateDiff = null
    const props = {
      appName: 'any',
      project: 'any',
      type: 'any',
      searchQuery: null, // search query if a dataset is selected
      // Module configuration
      moduleConf: configuration1,
      searchTag: null,
      dispatchExpandResults: () => { },
      dispatchCollapseGraph: () => { },
      dispatchUpdateResultsContext: (stateDiff) => {
        spiedStateDiff = stateDiff
      },
    }
    const enzymeWrapper = shallow(<NavigableSearchResultsContainer {...props} />, { context, lifecycleExperimental: true })
    const lazyModules = enzymeWrapper.find(LazyModuleComponent)
    assert.lengthOf(lazyModules, 1, 'There should be the results module')
    // Test corresponding module properties
    const lazyModuleProps = lazyModules.props()
    assert.equal(lazyModuleProps.appName, props.appName, 'App name should be correctly reported')
    assert.equal(lazyModuleProps.project, props.project, 'Project should be correctly reported')
    const { resultsConfiguration } = enzymeWrapper.state()
    assert.deepEqual(resultsConfiguration, {
      applicationId: props.appName,
      id: props.id,
      type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
      active: true,
      description: 'search.graph.results.title.without.tag',
      conf: props.moduleConf.searchResult,
    }, 'Module configuration should be computed in state')
    assert.deepEqual(lazyModuleProps.module, resultsConfiguration, 'Module configuration should be reported from state')

    assert.deepEqual(spiedStateDiff, {
      criteria: {
        contextTags: [],
        tags: [],
      },
    }, 'Container should initiale controlled module (results context)')
    // Mimic a tag change (word)
    enzymeWrapper.setProps({
      ...props,
      searchTag: {
        type: CatalogDomain.TAG_TYPES_ENUM.WORD,
        data: 'myWord',
      },
    })
    assert.deepEqual(spiedStateDiff, {
      criteria: {
        contextTags: [{
          type: CatalogDomain.TAG_TYPES_ENUM.WORD,
          label: 'myWord',
          searchKey: 'myWord',
          requestParameters: {
            [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]: `${CatalogDomain.OpenSearchQuery.TAGS_PARAM_NAME}:myWord`,
          },
        }],
        tags: [],
      },
    }, 'Container should update controlled module results context with word tag')
    // Mimic a tag change (entity)
    enzymeWrapper.setProps({
      ...props,
      searchTag: {
        type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
        data: {
          content: {
            id: 'URN:DATASET:TEST',
            model: 'myModel',
            providerId: 'myProviderId',
            label: 'myLabel',
            entityType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
            files: {},
            properties: {},
            tags: [],
          },
        },
      },
    })
    assert.deepEqual(spiedStateDiff, {
      criteria: {
        contextTags: [{
          type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
          label: 'myLabel',
          searchKey: 'URN:DATASET:TEST',
          requestParameters: {
            [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]: `${CatalogDomain.OpenSearchQuery.TAGS_PARAM_NAME}:"URN:DATASET:TEST"`,
          },
        }],
        tags: [],
      },
    }, 'Container should update controlled module results context with entity tag')
    // Mimic a tag reset
    enzymeWrapper.setProps({
      ...props,
      searchTag: null,
    })
    assert.deepEqual(spiedStateDiff, {
      criteria: {
        contextTags: [],
        tags: [],
      },
    }, 'Container should update controlled module results context with no tag')
  })
})
