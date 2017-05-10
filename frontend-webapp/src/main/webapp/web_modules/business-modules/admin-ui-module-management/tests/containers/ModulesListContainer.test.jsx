/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { spy } from 'sinon'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { UnconnectedModulesListContainer } from '../../src/containers/ModulesListContainer'

/**
 * Tests for ModulesListContainer
 * @author Sébastien binda
 */
describe('[ADMIN UI MODULE MANAGEMENT] Testing Modules list container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(UnconnectedModulesListContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('Should fetch the modules list before rendering', () => {
    const fetchModulesCallback = spy()
    const props = {
      params: {
        project: 'testProject',
        applicationId: 'testApp',
        module_id: '0',
      },
      // Set by mapDispatchToProps
      fetchModules: fetchModulesCallback,
      updateModule: () => {},
      deleteModule: () => {},
    }
    const wrapper = shallow(
      <UnconnectedModulesListContainer
        {...props}
      />,
      {
        lifecycleExperimental: true,
      },
    )

    assert.isTrue(wrapper.find(LoadableContentDisplayDecorator).length === 1, 'There should be a LoadableContentDisplayDecorator displayed')
    assert.isTrue(fetchModulesCallback.calledOnce, 'The container should fetch the modules list at mount')
  })
})
