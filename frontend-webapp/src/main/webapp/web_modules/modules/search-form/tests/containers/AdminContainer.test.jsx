/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { spy } from 'sinon'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UnconnectedAdminContainer } from '../../src/containers/AdminContainer'
import FormTabsComponent from '../../src/components/admin/FormTabsComponent'
import { DATASET_TYPE, DATASET_MODEL_TYPE } from '../../src/models/datasets/DatasetSelectionTypes'

/**
 * Tests for AdminContainer
 * @author Sébastien binda
 */
describe('[SEARCH FORM] Testing Admin Container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Create new configuration : Should fetch missings props', () => {
    const fetchDatasetsAttributesCallback = spy()
    const fetchAllModelsAttributesCallback = spy()
    const fetchModelsAttributesCallback = spy()
    const fetchCriterionCallback = spy()

    const props = {
      appName: 'test',
      project: 'project',
      adminForm: {
        changeField: () => {
        },
        form: {
          enableFacettes: false,
        },
      },
      moduleConf: {
        datasets: {
          type: null,
          selectedDatasets: [],
          selectedModels: [],
        },
        criterion: [],
        layout: {
          id: 'main',
          type: 'type',
        },
        resultType: '',
        enableFacettes: false,
      },
      selectableDataObjectsAttributes: {},
      selectableAttributesFectching: false,
      availableCriterion: {},
      criterionFetching: false,
      fetchCriterion: fetchCriterionCallback,
      fetchModelsAttributes: () => fetchModelsAttributesCallback,
      fetchAllModelsAttributes: fetchAllModelsAttributesCallback,
      fetchDatasetsAttributes: fetchDatasetsAttributesCallback,
    }

    const wrapper = shallow(<UnconnectedAdminContainer
      {...props}
    />)

    assert.isTrue(wrapper.find(FormTabsComponent).length === 1, 'There should be one FormTabsComponent')
    assert.isTrue(fetchDatasetsAttributesCallback.notCalled, 'By default if no dataset type is selected, the all datasets type is selected')
    assert.isTrue(fetchModelsAttributesCallback.notCalled, 'By default if no dataset type is selected, the all datasets type is selected')
    assert.isTrue(fetchAllModelsAttributesCallback.calledOnce, 'By default if no dataset type is selected, the all datasets type is selected')
    assert.isTrue(fetchCriterionCallback.calledOnce, 'The list of available criterion should be fetched')
  })

  it('Create new configuration with a selected dataset : Should fetch missing props', () => {
    const fetchDatasetsAttributesCallback = spy()
    const fetchAllModelsAttributesCallback = spy()
    const fetchModelsAttributesCallback = spy()
    const fetchCriterionCallback = spy()
    const props = {
      appName: 'test',
      project: 'project',
      adminForm: {
        changeField: () => {
        },
        form: {
          enableFacettes: false,
          conf: {
            datasets: {
              type: DATASET_TYPE,
              selectedDatasets: ['URN://DATASET-TEST'],
              selectedModels: [],
            },
          },
        },
      },
      moduleConf: {
        datasets: {},
        criterion: [],
        layout: {
          id: 'main',
          type: 'type',
        },
        resultType: '',
        enableFacettes: true,
      },
      selectableDataObjectsAttributes: {},
      selectableAttributesFectching: false,
      availableCriterion: {},
      criterionFetching: false,
      fetchCriterion: fetchCriterionCallback,
      fetchModelsAttributes: () => fetchModelsAttributesCallback,
      fetchAllModelsAttributes: fetchAllModelsAttributesCallback,
      fetchDatasetsAttributes: fetchDatasetsAttributesCallback,
    }

    const wrapper = shallow(<UnconnectedAdminContainer
      {...props}
    />)

    assert.isTrue(wrapper.find(FormTabsComponent).length === 1, 'There should be one FormTabsComponent')
    assert.isTrue(fetchDatasetsAttributesCallback.calledOnce, 'The list of datasets attributes should be fetched')
    assert.isTrue(fetchModelsAttributesCallback.notCalled, 'The list of datasets attributes should be fetched')
    assert.isTrue(fetchAllModelsAttributesCallback.notCalled, 'The list of datasets attributes should be fetched')
    assert.isTrue(fetchCriterionCallback.calledOnce, 'The list of available criterion should be fetched')
  })

  it('Create new configuration  with a selected datasetModel : Should fetch missing props', () => {
    const fetchDatasetsAttributesCallback = spy()
    const fetchAllModelsAttributesCallback = spy()
    const fetchModelsAttributesCallback = spy()
    const fetchCriterionCallback = spy()

    // Simulate a selected dataset model in the form
    const selectedDatasetModel = 12

    const props = {
      appName: 'test',
      project: 'project',
      adminForm: {
        changeField: () => {
        },
        form: {
          enableFacettes: false,
          conf: {
            datasets: {
              type: DATASET_MODEL_TYPE,
              selectedDatasets: [],
              selectedModels: [selectedDatasetModel],
            },
          },
        },
      },
      moduleConf: {
        datasets: {},
        criterion: [],
        layout: {
          id: 'main',
          type: 'type',
        },
        resultType: '',
        enableFacettes: true,
      },
      selectableDataObjectsAttributes: {},
      selectableAttributesFectching: false,
      availableCriterion: {},
      criterionFetching: false,
      fetchCriterion: fetchCriterionCallback,
      fetchModelsAttributes: fetchModelsAttributesCallback,
      fetchAllModelsAttributes: fetchAllModelsAttributesCallback,
      fetchDatasetsAttributes: fetchDatasetsAttributesCallback,
    }

    const wrapper = shallow(<UnconnectedAdminContainer
      {...props}
    />)

    assert.isTrue(wrapper.find(FormTabsComponent).length === 1, 'There should be one FormTabsComponent')
    assert.isTrue(fetchDatasetsAttributesCallback.notCalled, 'The list of datasets attributes should not be fetched for selected datasets')
    assert.isTrue(fetchModelsAttributesCallback.calledOnce, 'The list of datasets attributes should be fetched for given model')
    assert.isTrue(fetchModelsAttributesCallback.calledWith([selectedDatasetModel]), 'The list of datasets attributes should be fetched with the given model as parameter')
    assert.isTrue(fetchAllModelsAttributesCallback.notCalled, 'The list of datasets attributes should be fetched')
    assert.isTrue(fetchCriterionCallback.calledOnce, 'The list of available criterion should be fetched')
  })
})
