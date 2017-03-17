/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { IntlStub } from '@regardsoss/tests-helpers'
import { DefaultLayout } from '@regardsoss/layout'
import { LazyModuleComponent } from '@regardsoss/modules'
import Styles from '../../../../src/styles/styles'
import FormPreviewComponent from '../../../../src/components/admin/preview/FormPreviewComponent'

/**
 * Tests for FormPreviewComponent
 * @author Sébastien binda
 */
describe('[SEARCH FORM] Testing FormPreviewComponent', () => {
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
      intl: IntlStub,
    },
  }

  it('Should render a FormPreviewComponent', () => {
    const props = {
      project: 'test',
      module: {
        id: 12,
        name: 'formModule',
        description: 'Form module test',
        active: false,
        applicationId: 'test',
        container: 'content',
        conf: {
          layout: DefaultLayout,
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
