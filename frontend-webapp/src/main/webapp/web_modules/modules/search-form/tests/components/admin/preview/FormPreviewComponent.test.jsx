/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { LazyModuleComponent } from '@regardsoss/modules'
import DefaultLayout from '../../../../src/components/admin/layout/DefaultFormLayout'
import Styles from '../../../../src/styles/styles'
import FormPreviewComponent from '../../../../src/components/admin/preview/FormPreviewComponent'

/**
 * Tests for FormPreviewComponent
 * @author Sébastien binda
 */
describe('[FORM MODULE] Testing FormPreviewComponent', () => {
  const muiTheme = getMuiTheme({})
  const options = {
    context: {
      muiTheme,
      moduleTheme: Styles(muiTheme),
      intl: {
        formatMessage: id => (id.id),
      },
    },
  }

  it('Should render a FormPreviewComponent', () => {
    const props = {
      module: {
        id: 12,
        name: 'formModule',
        description: 'Form module test',
        active: false,
        applicationId: 'test',
        container: 'content',
        conf: {
          layout: JSON.stringify(DefaultLayout),
        },
      },
    }
    const wrapper = shallow(
      <FormPreviewComponent {...props} />, options,
    )

    const lazyModule = wrapper.find(LazyModuleComponent)
    assert(lazyModule.length === 1, 'The current module sould be rendered with a LayModuleComponent')
    const renderedModule = lazyModule.prop('module')
    assert(renderedModule.active === true, 'The module in preview mode should always be active')
  })
})
