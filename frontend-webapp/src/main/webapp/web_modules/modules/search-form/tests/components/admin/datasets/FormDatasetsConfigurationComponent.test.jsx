/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { PageableListContainer, ListContainer } from '@regardsoss/components'
import Styles from '../../../../src/styles/styles'
import { DATASET_MODEL_TYPE, DATASET_TYPE, ALL_CATALOG_TYPE } from '../../../../src/models/datasets/DatasetSelectionTypes'
import DatasetModelLineComponent from '../../../../src/components/admin/datasets/DatasetModelLineComponent'
import DatasetLineComponent from '../../../../src/components/admin/datasets/DatasetLineComponent'
import FormDatasetsConfigurationComponent from '../../../../src/components/admin/datasets/FormDatasetsConfigurationComponent'

/**
 * Tests for FormDatasetsConfigurationComponent
 * @author Sébastien binda
 */
describe('[SEARCH FORM] Testing FormDatasetsConfigurationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const context = buildTestContext(Styles)

  it('Should render a FormDatasetsConfigurationComponent to configure datasets', () => {
    const props = {
      changeField: () => { },
      defaultType: DATASET_TYPE,
      defaultSelectedDatasets: [],
      defaultSelectedDatasetModels: [],
      disableChangeDatasets: false,
    }

    const wrapper = shallow(
      <FormDatasetsConfigurationComponent {...props} />, { context },
    )

    const listComp = wrapper.find(PageableListContainer)
    assert(listComp.length === 1, 'The list of selectable datasets should be rendered')
    assert.equal(listComp.prop('lineComponent'), DatasetLineComponent)
  })

  it('Should render a FormDatasetsConfigurationComponent to configure models', () => {
    const props = {
      changeField: () => { },
      defaultType: DATASET_MODEL_TYPE,
      defaultSelectedDatasets: [],
      defaultSelectedDatasetModels: [],
      disableChangeDatasets: false,
    }

    const wrapper = shallow(
      <FormDatasetsConfigurationComponent {...props} />, { context },
    )

    const listComp = wrapper.find(ListContainer)
    assert(listComp.length === 1, 'The list of selectable dataset models should be rendered')
    assert.equal(listComp.prop('lineComponent'), DatasetModelLineComponent)
  })

  it('Should render a FormDatasetsConfigurationComponent for all datasets', () => {
    const props = {
      changeField: () => { },
      defaultType: ALL_CATALOG_TYPE,
      defaultSelectedDatasets: [],
      defaultSelectedDatasetModels: [],
      disableChangeDatasets: false,
    }

    const wrapper = shallow(
      <FormDatasetsConfigurationComponent {...props} />, { context },
    )

    const listComp = wrapper.find(PageableListContainer)
    assert(listComp.length === 0, 'The list of selectable datasets should not be rendered as the form is associated to all datasets of the catalog')
  })
})
