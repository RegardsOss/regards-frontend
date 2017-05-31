/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { DefaultLayout } from '@regardsoss/layout'
import { LazyModuleComponent } from '@regardsoss/modules'
import Styles from '../../../../src/styles/styles'
import FormPreviewComponent from '../../../../src/components/admin/preview/FormPreviewComponent'

/**
 * Tests for FormPreviewComponent
 * @author Sébastien binda
 */
describe('[SEARCH FORM] Testing FormPreviewComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const context = buildTestContext(Styles)

  it('Should render a FormPreviewComponent', () => {
    const props = {
      project: 'test',
      module: {
        id: 12,
        type: 'formModule',
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
      <FormPreviewComponent {...props} />, { context },
    )

    const lazyModule = wrapper.find(LazyModuleComponent)
    assert(lazyModule.length === 1, 'The current module sould be rendered with a LayModuleComponent')
    const renderedModule = lazyModule.prop('module')
    assert(renderedModule.active === true, 'The module in preview mode should always be active')
  })
})
