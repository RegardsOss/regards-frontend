/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub, spy } from 'sinon'
import { UnconnectedAdminContainer } from '../../src/containers/AdminContainer'
import FormTabsComponent from '../../src/components/admin/FormTabsComponent'
import { DATASET_TYPE, DATASET_MODEL_TYPE } from '../../src/models/datasets/DatasetSelectionTypes'

/**
 * Tests for AdminContainer
 * @author Sébastien binda
 */
describe('[FORM MODULE] Testing Admin Container', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
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
        form: {},
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
        layout: {
          id: 'main',
          type: 'type',
        },
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
        layout: {
          id: 'main',
          type: 'type',
        },
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
