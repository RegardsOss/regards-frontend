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
import { modulesHelper } from '@regardsoss/modules-api'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { CatalogDomain } from '@regardsoss/domain'
import { ModuleContainer } from '../../../src/containers/user/ModuleContainer'
import FormContainer from '../../../src/containers/user/FormContainer'
import styles from '../../../src/styles/styles'
import { conf1 } from '../../dump/configuration.dump'
import ResultsContainer from '../../../src/containers/user/ResultsContainer'
import DatasetSelectionTypes from '../../../src/domain/DatasetSelectionTypes'

/**
 * Tests for ModuleContainer
 * @author Sébastien binda
 */
describe('[SEARCH FORM] Testing ModuleContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const context = buildTestContext(styles)
  it('should exist', () => {
    assert.isDefined(ModuleContainer)
  })
  it('should display form and results, computing initial results context and updating context search', () => {
    let spiedStateDiff = null
    const props = {
      project: 'test',
      appName: 'test',
      type: 'any',
      description: 'Test',
      moduleConf: conf1,
      dispatchCollapseForm: () => { },
      dispatchExpandResults: () => { },
      dispatchInitializeWithOpenedResults: () => { },
      dispatchUpdateSearchContext: (stateDiff) => {
        spiedStateDiff = stateDiff
      },
    }
    const enzymeWrapper = shallow(<ModuleContainer {...props} />, { context })
    // Check initial state holds both root query and constant restriction parameters
    assert.deepEqual(enzymeWrapper.state(), {
      contextQuery: 'tags:"URN:DATASET:EXAMPLE1"',
      contextResultsCriteria: [{
        requestParameters: {
          [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]: 'tags:"URN:DATASET:EXAMPLE1"',
        },
      }],
    }, 'Initial state should contain pre-computed query and constant restriciton parameters, taking account of configured dataset')
    // Check published intial state contains restriction parameters
    assert.deepEqual(spiedStateDiff, {
      criteria: {
        otherFilters: enzymeWrapper.state().contextResultsCriteria,
      },
    }, 'Initial results context should be initialized in same context')

    // Check form container is correctly rendered
    const formContainer = enzymeWrapper.find(FormContainer)
    assert.lengthOf(formContainer, 1, 'There should be the form container')
    testSuiteHelpers.assertWrapperProperties(formContainer, {
      contextQuery: enzymeWrapper.state().contextQuery,
      onSearch: enzymeWrapper.instance().onSearch,
      // Other reported properties to instantiate a dynamic module pane
      ...modulesHelper.getReportedUserModuleProps(props),
    }, 'Form container properties should be correctly provided')


    // Check results constainer is correctly rendered
    const resultsContainer = enzymeWrapper.find(ResultsContainer)
    assert.lengthOf(resultsContainer, 1, 'There should be the results container')
    testSuiteHelpers.assertWrapperProperties(resultsContainer, {
      id: props.moduleConf.id,
      appName: props.appName,
      project: props.project,
      preview: props.moduleConf.preview,
      searchResultsConfiguration: props.moduleConf.searchResult,
    }, 'Results container properties should be correctly provided')

    // simulate a search call and check the controlled module filters are updated
    enzymeWrapper.instance().onSearch({
      p1: {
        state: { something: true },
        requestParameters: {
          q: 'something1',
          sort: 'A',
        },
      },
      p2: {
        state: { somethingElse: 'abcde', more: 6 },
        requestParameters: {
          q: 'something2',
          sort: 'B',
          geometry: 'circle',
        },
      },
      p3: {
        state: { ok: true },
        requestParameters: {
          geometry: 'cube',
        },
      },
    })
    // check controlled module  context is updated
    enzymeWrapper.update(spiedStateDiff, {
      criteria: {
        otherFilters: [{ // configuration filters
          requestParameters: {
            [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]: 'tags:"URN%3ADATASET%3AEXAMPLE1"',
          },
        }, { // p1 filter
          requestParameters: {
            q: 'something1',
            sort: 'A',
          },
        }, { // p2 filter
          requestParameters: {
            q: 'something2',
            sort: 'B',
            geometry: 'circle',
          },
        }, { // p3 filter
          requestParameters: {
            geometry: 'cube',
          },
        }],
      },
    })
  })
  it('should compute correctly parameters without context and any plugin query parameter', () => {
    let spiedStateDiff = null
    const props = {
      project: 'test',
      appName: 'test',
      type: 'any',
      description: 'Test',
      moduleConf: {
        ...conf1,
        datasets: {},
      },
      dispatchCollapseForm: () => { },
      dispatchExpandResults: () => { },
      dispatchInitializeWithOpenedResults: () => { },
      dispatchUpdateSearchContext: (stateDiff) => {
        spiedStateDiff = stateDiff
      },
    }
    const enzymeWrapper = shallow(<ModuleContainer {...props} />, { context })
    assert.deepEqual(enzymeWrapper.state(), {
      contextQuery: '',
      contextResultsCriteria: [],
    }, 'Initial state should contain pre-computed query and constant restriciton parameters, taking account of configured dataset')
    assert.isNull(spiedStateDiff, 'Results context should not have been updated as there is no context criterion')

    enzymeWrapper.instance().onSearch({
      p1: {
        state: { something: true },
        requestParameters: {
          q: 'ABCD',
        },
      },
      p2: {
        state: { somethingElse: 'abcde', more: 6 },
        requestParameters: {
          a: 'b',
          b: 'c',
        },
      },
    })

    // Check on search statecontext update
    assert.deepEqual(spiedStateDiff, {
      criteria: {
        otherFilters: [{ // p1
          requestParameters: {
            q: 'ABCD',
          },
        }, { // p2
          requestParameters: {
            a: 'b',
            b: 'c',
          },
        }],
      },
    }, 'On search should have updated correctly results context')
  })
  it('Convert correctly initial query from moduleConf.datasets', () => {
    // 1 - All catalog: no query
    assert.deepEqual(ModuleContainer.buildContextQueryAndCriteria(
      { type: null, selectedDatasets: [], selectedModels: [] }),
    { query: '', resultsCriteria: [] }, '1.A - There should be no context query')
    assert.deepEqual(ModuleContainer.buildContextQueryAndCriteria(
      { type: DatasetSelectionTypes.ALL_CATALOG_TYPE, selectedDatasets: ['URN:DATASET:1'], selectedModels: [1] }),
    { query: '', resultsCriteria: [] }, '1.B - There should be no context query')
    // 2 - Dataset type
    assert.deepEqual(ModuleContainer.buildContextQueryAndCriteria(
      { type: DatasetSelectionTypes.DATASET_TYPE, selectedDatasets: [], selectedModels: [] }),
    { query: '', resultsCriteria: [] }, '2.A - There should be no context query (no dataset)')
    assert.deepEqual(ModuleContainer.buildContextQueryAndCriteria(
      { type: DatasetSelectionTypes.DATASET_TYPE, selectedDatasets: ['', null, undefined], selectedModels: [] }),
    { query: '', resultsCriteria: [] }, '2.B - There should be no context query (no valid dataset)')
    assert.deepEqual(
      ModuleContainer.buildContextQueryAndCriteria(
        { type: DatasetSelectionTypes.DATASET_TYPE, selectedDatasets: ['URN:DATASET:A', null, 'URN:DATASET:B'], selectedModels: [] }),
      {
        query: 'tags:("URN:DATASET:A" OR "URN:DATASET:B")',
        resultsCriteria: [{
          requestParameters: {
            [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]: 'tags:("URN:DATASET:A" OR "URN:DATASET:B")',
          },
        }],
      }, '2.C - Dataset tags query should be built')
    // 3 - Dataset Model id type
    assert.deepEqual(ModuleContainer.buildContextQueryAndCriteria(
      { type: DatasetSelectionTypes.DATASET_MODEL_TYPE, selectedDatasets: [], selectedModels: [] }),
    { query: '', resultsCriteria: [] }, '3.A - There should be no context query (no dataset model)')
    assert.deepEqual(ModuleContainer.buildContextQueryAndCriteria(
      { type: DatasetSelectionTypes.DATASET_MODEL_TYPE, selectedDatasets: [], selectedModels: [null, undefined] }),
    { query: '', resultsCriteria: [] }, '3.B - There should be no context query (no valid model id)')
    assert.deepEqual(
      ModuleContainer.buildContextQueryAndCriteria(
        { type: DatasetSelectionTypes.DATASET_MODEL_TYPE, selectedDatasets: [], selectedModels: [14, null, 38] }),
      {
        query: 'datasetModelIds:(14 OR 38)',
        resultsCriteria: [{
          requestParameters: {
            [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]: 'datasetModelIds:(14 OR 38)',
          },
        }],
      }, '3.C - Dataset model query should be built')
  })
})
