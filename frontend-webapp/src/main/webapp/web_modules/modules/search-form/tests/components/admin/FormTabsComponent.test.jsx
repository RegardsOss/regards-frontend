/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import FormTabsComponent from '../../../src/components/admin/FormTabsComponent'
import Styles from '../../../src/styles/styles'
import FormParametersComponent from '../../../src/components/admin/parameters/FormParametersComponent'
import FormDatasetsConfigurationComponent from '../../../src/components/admin/datasets/FormDatasetsConfigurationComponent'
import FormLayoutComponent from '../../../src/components/admin/layout/FormLayoutComponent'
import FormCriterionComponent from '../../../src/components/admin/criterion/FormCriterionComponent'
import FormPreviewComponent from '../../../src/components/admin/preview/FormPreviewComponent'

/**
 * Tests for FormTabsComponent
 * @author Sébastien binda
 */
describe('[FORM MODULE] Testing FormTabsComponent', () => {
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
  const muiTheme = getMuiTheme({})
  const options = {
    context: {
      muiTheme,
      moduleTheme: Styles(muiTheme),
    },
  }
  it('Should render form tabs', () => {
    const props = {
      project: 'test',
      appName: 'test',
      adminForm: {
        changeField: () => {},
        form: {
          id: 1,
          name: 'testModule',
          description: 'description',
          active: true,
          applicationId: 'test',
          container: 'content',
          conf: {},
          layout: {
            id: 'main',
            type: 'letype',
          },
        },
      },
      defaultConf: {
        datasets: {},
        criterion: [],
        layout: {
          id: 'main',
          type: 'letype',
        },
        resultType: null,
      },
      selectableAttributes: {},
      disableChangeDatasets: false,
      availableCriterion: {},
      criterionFetching: false,
    }
    const wrapper = shallow(
      <FormTabsComponent {...props} />, options,
    )

    const paramTab = wrapper.find(FormParametersComponent)
    const datasetTab = wrapper.find(FormDatasetsConfigurationComponent)
    const layoutTab = wrapper.find(FormLayoutComponent)
    const criterionTab = wrapper.find(FormCriterionComponent)
    const previewTab = wrapper.find(FormPreviewComponent)

    assert(paramTab.length === 1)
    assert(datasetTab.length === 1)
    assert(layoutTab.length === 1)
    assert(criterionTab.length === 1)
    assert(previewTab.length === 1)
  })
})
