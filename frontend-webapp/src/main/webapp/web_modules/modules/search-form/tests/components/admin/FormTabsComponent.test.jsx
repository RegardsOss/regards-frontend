/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import FormTabsComponent from '../../../src/components/admin/FormTabsComponent'
import Styles from '../../../src/styles/styles'
import FormParameters from '../../../src/components/admin/parameters/FormParametersConfigurationComponent'
import FormDatasetsConfigurationComponent from '../../../src/components/admin/datasets/FormDatasetsConfigurationComponent'
import FormLayoutComponent from '../../../src/components/admin/layout/FormLayoutComponent'
import FormCriterionComponent from '../../../src/components/admin/criterion/FormCriterionComponent'
import FormPreviewComponent from '../../../src/components/admin/preview/FormPreviewComponent'

/**
 * Tests for FormTabsComponent
 * @author Sébastien binda
 */
describe('[FORM MODULE] Testing FormTabsComponent', () => {
  const muiTheme = getMuiTheme({})
  const options = {
    context: {
      muiTheme,
      moduleTheme: Styles(muiTheme),
    },
  }
  it('Should render form tabs', () => {
    const props = {
      currentConf: {},
      module: {
        id: 1,
        name: 'testModule',
        description: 'description',
        active: true,
        applicationId: 'test',
        container: 'content',
        conf: {},
      },
      defaultConf: {
        datasets: {},
        criterion: [],
        layout: '',
        resultType: null,
      },
      selectableAttributes: {},
      disableChangeDatasets: false,
      availableCriterion: {
        content: {},
      },
      criterionFetching: false,
    }
    const wrapper = shallow(
      <FormTabsComponent {...props} />, options,
    )

    const paramTab = wrapper.find(FormParameters)
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
