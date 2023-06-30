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
import { DamDomain, UIDomain } from '@regardsoss/domain'
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
    let stateUpdateCount = 0
    const props = {
      appName: 'any',
      project: 'any',
      type: 'any',
      resultsModuleTitle: 'anyTitle',
      searchQuery: null, // search query if a dataset is selected
      // Module configuration
      moduleConf: configuration1,
      selectionPath: [],
      dispatchExpandResults: () => { },
      dispatchCollapseGraph: () => { },
      dispatchUpdateResultsContext: (stateDiff) => {
        spiedStateDiff = stateDiff
        stateUpdateCount += 1
      },
    }
    const enzymeWrapper = shallow(<NavigableSearchResultsContainer {...props} />, { context })
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
      description: 'anyTitle',
      conf: props.moduleConf.searchResult,
    }, 'Module configuration should be computed in state')
    assert.deepEqual(lazyModuleProps.module, resultsConfiguration, 'Module configuration should be reported from state')

    assert.isNull(spiedStateDiff, 'No update should be dispatched as there is no selected dataset')
    // Mimic browsing in collections
    enzymeWrapper.setProps({
      ...props,
      selectionPath: [{
        label: 'c1',
        entityType: DamDomain.ENTITY_TYPES_ENUM.COLLECTION,
        id: 'URN:COLLECTION:c1',
        requestParameters: {},
      }, {
        label: 'c2',
        entityType: DamDomain.ENTITY_TYPES_ENUM.COLLECTION,
        id: 'URN:COLLECTION:c2',
        requestParameters: {},
      }],
    })
    assert.isNull(spiedStateDiff, 'No update should be dispatched as there is no selected dataset')
    // Mimic dataset selection (that should update context)
    enzymeWrapper.setProps({
      ...props,
      selectionPath: [{
        label: 'c1',
        entityType: DamDomain.ENTITY_TYPES_ENUM.COLLECTION,
        id: 'URN:COLLECTION:c1',
        requestParameters: {},
      }, {
        label: 'c2',
        entityType: DamDomain.ENTITY_TYPES_ENUM.COLLECTION,
        id: 'URN:COLLECTION:c2',
        requestParameters: {},
      }, {
        label: 'd1',
        entityType: DamDomain.ENTITY_TYPES_ENUM.DATASET,
        id: 'URN:DATASET:d1',
        requestParameters: {},
      }],
    })
    assert.equal(stateUpdateCount, 1, 'Filtering should have been updated for data selection')
    assert.deepEqual(spiedStateDiff, {
      selectedTab: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          criteria: {
            tagsFiltering: [{
              entity: {
                content: {
                  entityType: 'DATASET',
                  id: 'URN:DATASET:d1',
                  label: 'd1',
                  requestParameters: {},
                },
              },
              type: DamDomain.ENTITY_TYPES_ENUM.DATASET,
              searchKey: 'URN:DATASET:d1',
              requestParameters: {
                q: 'tags:"URN:DATASET:d1"',
              },
            }],
          },
        },
      },
    }, 'Dataset should be selected as new context root in results')
    // Mimic browsing other collections, unselecting dataset
    enzymeWrapper.setProps({
      ...props,
      selectionPath: [{
        label: 'c4',
        entityType: DamDomain.ENTITY_TYPES_ENUM.COLLECTION,
        id: 'URN:COLLECTION:c4',
        requestParameters: {},
      }],
    })
    assert.equal(stateUpdateCount, 1, 'Filtering should not have been updated for any other selection')
  })
})
