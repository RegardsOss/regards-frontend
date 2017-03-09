/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import sinon from 'sinon'
import { UnconnectedAdminContainer } from '../../src/containers/AdminContainer'
import FormTabsComponent from '../../src/components/admin/FormTabsComponent'
import { DATASET_TYPE, DATASET_MODEL_TYPE } from '../../src/models/datasets/DatasetSelectionTypes'

/**
 * Tests for AdminContainer
 * @author Sébastien binda
 */
describe('[FORM MODULE] Testing Admin Container', () => {
  it('Create new configuration : Should fetch missings props', () => {
    const fetchDatasetsAttributesCallback = sinon.spy()
    const fetchAllModelsAttributesCallback = sinon.spy()
    const fetchModelsAttributesCallback = sinon.spy()
    const fetchCriterionCallback = sinon.spy()

    const props = {
      appName: 'test',
      project: 'project',
      adminForm: {
        changeField: () => {
        },
        form: {},
      },
      moduleConf: {
        datasets: {
          type: null,
          selectedDatasets: [],
          selectedModels: [],
        },
        criterion: [],
        layout: '',
        resultType: '',
      },
      selectableAttributes: {},
      selectableAttributesFectching: false,
      availableCriterion: {},
      criterionFetching: false,
      fetchCriterion: fetchCriterionCallback,
      fetchModelsAttributes: () => fetchModelsAttributesCallback,
      fetchAllModelsAttributes: fetchAllModelsAttributesCallback,
      fetchDatasetsAttributes: fetchDatasetsAttributesCallback,
    }

    const wrapper = shallow(
      <UnconnectedAdminContainer
        {...props}
      />,
    )

    assert.isTrue(wrapper.find(FormTabsComponent).length === 1, 'There should be one FormTabsComponent')
    assert.isTrue(fetchDatasetsAttributesCallback.notCalled, 'By default if no dataset type is selected, the all datasets type is selected')
    assert.isTrue(fetchModelsAttributesCallback.notCalled, 'By default if no dataset type is selected, the all datasets type is selected')
    assert.isTrue(fetchAllModelsAttributesCallback.calledOnce, 'By default if no dataset type is selected, the all datasets type is selected')
    assert.isTrue(fetchCriterionCallback.calledOnce, 'The list of available criterion should be fetched')
  })

  it('Create new configuration : Should fetch missing props', () => {
    const fetchDatasetsAttributesCallback = sinon.spy()
    const fetchAllModelsAttributesCallback = sinon.spy()
    const fetchModelsAttributesCallback = sinon.spy()
    const fetchCriterionCallback = sinon.spy()
    const props = {
      appName: 'test',
      project: 'project',
      adminForm: {
        changeField: () => {
        },
        form: {
          conf: {
            datasets: {
              type: DATASET_TYPE,
              selectedDatasets: [],
              selectedModels: [],
            },
          },
        },
      },
      moduleConf: {
        datasets: {},
        criterion: [],
        layout: '',
        resultType: '',
      },
      selectableAttributes: {},
      selectableAttributesFectching: false,
      availableCriterion: {},
      criterionFetching: false,
      fetchCriterion: fetchCriterionCallback,
      fetchModelsAttributes: () => fetchModelsAttributesCallback,
      fetchAllModelsAttributes: fetchAllModelsAttributesCallback,
      fetchDatasetsAttributes: fetchDatasetsAttributesCallback,
    }

    const wrapper = shallow(
      <UnconnectedAdminContainer
        {...props}
      />,
    )

    assert.isTrue(wrapper.find(FormTabsComponent).length === 1, 'There should be one FormTabsComponent')
    assert.isTrue(fetchDatasetsAttributesCallback.calledOnce, 'The list of datasets attributes should be fetched')
    assert.isTrue(fetchModelsAttributesCallback.notCalled, 'The list of datasets attributes should be fetched')
    assert.isTrue(fetchAllModelsAttributesCallback.notCalled, 'The list of datasets attributes should be fetched')
    assert.isTrue(fetchCriterionCallback.calledOnce, 'The list of available criterion should be fetched')
  })

  it('Create new configuration : Should fetch missing props', () => {
    const fetchDatasetsAttributesCallback = sinon.spy()
    const fetchAllModelsAttributesCallback = sinon.spy()
    const fetchModelsAttributesCallback = sinon.spy()
    const fetchCriterionCallback = sinon.spy()
    const props = {
      appName: 'test',
      project: 'project',
      adminForm: {
        changeField: () => {
        },
        form: {
          conf: {
            datasets: {
              type: DATASET_MODEL_TYPE,
              selectedDatasets: [],
              selectedModels: [],
            },
          },
        },
      },
      moduleConf: {
        datasets: {},
        criterion: [],
        layout: '',
        resultType: '',
      },
      selectableAttributes: {},
      selectableAttributesFectching: false,
      availableCriterion: {},
      criterionFetching: false,
      fetchCriterion: fetchCriterionCallback,
      fetchModelsAttributes: fetchModelsAttributesCallback,
      fetchAllModelsAttributes: fetchAllModelsAttributesCallback,
      fetchDatasetsAttributes: fetchDatasetsAttributesCallback,
    }

    const wrapper = shallow(
      <UnconnectedAdminContainer
        {...props}
      />,
    )

    assert.isTrue(wrapper.find(FormTabsComponent).length === 1, 'There should be one FormTabsComponent')
    assert.isTrue(fetchDatasetsAttributesCallback.notCalled, 'The list of datasets attributes should be fetched')
    assert.isTrue(fetchModelsAttributesCallback.calledOnce, 'The list of datasets attributes should be fetched')
    assert.isTrue(fetchAllModelsAttributesCallback.notCalled, 'The list of datasets attributes should be fetched')
    assert.isTrue(fetchCriterionCallback.calledOnce, 'The list of available criterion should be fetched')
  })
})
