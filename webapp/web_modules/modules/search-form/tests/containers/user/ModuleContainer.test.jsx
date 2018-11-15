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
  it('should display form and results, computing initial query and updating query on search', () => {
    const props = {
      project: 'test',
      appName: 'test',
      type: 'any',
      description: 'Test',
      moduleConf: conf1,
      pluginsState: {
        p1: {
          state: {
            something: true,
          },
          query: 'something1',
        },
        p2: {
          state: {
            somethingElse: 'abcde',
            more: 6,
          },
          query: 'something2',
        },
      },
      dispatchCollapseForm: () => { },
      dispatchExpandResults: () => { },
      dispatchInitializeWithOpenedResults: () => { },
    }
    const enzymeWrapper = shallow(<ModuleContainer {...props} />, { context })

    // Check contextQuery and current query initialization
    assert.deepEqual(enzymeWrapper.state(), {
      contextQuery: 'tags:"URN%3ADATASET%3AEXAMPLE1"',
      currentSearchQuery: 'tags:"URN%3ADATASET%3AEXAMPLE1"',
    }, 'Queries state should be correctly initialized')

    // Check form container is correctly rendered
    let formContainer = enzymeWrapper.find(FormContainer)
    assert.lengthOf(formContainer, 1, 'There should be the form container')
    testSuiteHelpers.assertWrapperProperties(formContainer, {
      contextQuery: enzymeWrapper.state().contextQuery,
      pluginsState: props.pluginsState,
      onSearch: enzymeWrapper.instance().onSearch,
      // Other reported properties to instantiate a dynamic module pane
      ...modulesHelper.getReportedUserModuleProps(props),
    }, 'Form container properties should be correctly provided')


    // Check results constainer is correctly rendered
    let resultsContainer = enzymeWrapper.find(ResultsContainer)
    assert.lengthOf(resultsContainer, 1, 'There should be the results container')
    testSuiteHelpers.assertWrapperProperties(resultsContainer, {
      id: props.moduleConf.id,
      appName: props.appName,
      project: props.project,
      preview: props.moduleConf.preview,
      searchResultsConfiguration: props.moduleConf.searchResult,
      searchQuery: enzymeWrapper.state().currentSearchQuery,
      restrictedDatasetsIds: props.moduleConf.datasets.selectedDatasets,
    }, 'Results container request should be correctly provided')

    // simulate a search call and check the request now holds initial request + plugins queries
    enzymeWrapper.instance().onSearch()
    enzymeWrapper.update()
    assert.deepEqual(enzymeWrapper.state(), {
      contextQuery: 'tags:"URN%3ADATASET%3AEXAMPLE1"',
      currentSearchQuery: 'tags:"URN%3ADATASET%3AEXAMPLE1" AND something1 AND something2',
    }, 'Queries state should be correctly initialized')
    // check each container was correctly updated
    formContainer = enzymeWrapper.find(FormContainer)
    assert.equal(formContainer.props().contextQuery, enzymeWrapper.state().contextQuery, 'Form container should still use initial context query')
    resultsContainer = enzymeWrapper.find(ResultsContainer)
    assert.equal(resultsContainer.props().searchQuery, enzymeWrapper.state().currentSearchQuery, 'Results container should now use current search query')
  })
  it('Convert correctly initial query from moduleConf.datasets', () => {
    // 1 - All catalog: no query
    assert.isNotOk(ModuleContainer.buildRestrictiveQuery(
      { type: null, selectedDatasets: [], selectedModels: [] }),
    '1.A - There should be no context query')
    assert.isNotOk(ModuleContainer.buildRestrictiveQuery(
      { type: DatasetSelectionTypes.ALL_CATALOG_TYPE, selectedDatasets: ['URN:DATASET:1'], selectedModels: [1] }),
    '1.B - There should be no context query')
    // 2 - Dataset type
    assert.isNotOk(ModuleContainer.buildRestrictiveQuery(
      { type: DatasetSelectionTypes.DATASET_TYPE, selectedDatasets: [], selectedModels: [] }),
    '2.A - There should be no context query (no dataset)')
    assert.isNotOk(ModuleContainer.buildRestrictiveQuery(
      { type: DatasetSelectionTypes.DATASET_TYPE, selectedDatasets: ['', null, undefined], selectedModels: [] }),
    '2.B - There should be no context query (no valid dataset)')
    assert.equal(
      ModuleContainer.buildRestrictiveQuery(
        { type: DatasetSelectionTypes.DATASET_TYPE, selectedDatasets: ['URN:DATASET:A', null, 'URN:DATASET:B'], selectedModels: [] }),
      'tags:("URN%3ADATASET%3AA" OR "URN%3ADATASET%3AB")', '2.C - Dataset tags query should be built')
    // 3 - Dataset Model id type
    assert.isNotOk(ModuleContainer.buildRestrictiveQuery(
      { type: DatasetSelectionTypes.DATASET_MODEL_TYPE, selectedDatasets: [], selectedModels: [] }),
    '3.A - There should be no context query (no dataset)')
    assert.isNotOk(ModuleContainer.buildRestrictiveQuery(
      { type: DatasetSelectionTypes.DATASET_MODEL_TYPE, selectedDatasets: [], selectedModels: [null, undefined] }),
    '3.B - There should be no context query (no valid model id)')
    assert.equal(
      ModuleContainer.buildRestrictiveQuery(
        { type: DatasetSelectionTypes.DATASET_MODEL_TYPE, selectedDatasets: [], selectedModels: [14, null, 38] }),
      'datasetModelIds:(14 OR 38)', '3.C - Dataset model query should be built')
  })
})
