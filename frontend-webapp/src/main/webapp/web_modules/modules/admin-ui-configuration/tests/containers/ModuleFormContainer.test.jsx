/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub, spy } from 'sinon'
import ModuleFormComponent from '../../src/components/ModuleFormComponent'
import { UnconnectedModuleFormContainer } from '../../src/containers/ModuleFormContainer'

/**
 * Tests for ModuleFormContainer
 * @author Sébastien binda
 */
describe('[ADMIN UI-CONFIGURATION] Testing Module form container', () => {
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
  it('Should fetch module before renderinf component', () => {
    const fetchModuleCallback = spy()
    const fetchLayoutCallback = spy()
    const props = {
      params: {
        project: 'testProject',
        applicationId: 'testApp',
        module_id: '1',
      },
      updateModule: () => {},
      createModule: () => {},
      fetchModule: fetchModuleCallback,
      fetchLayout: fetchLayoutCallback,
      // Set by mapStateToProps
      isFetching: false,
    }
    const wrapper = shallow(
      <UnconnectedModuleFormContainer
        {...props}
      />,
    )

    assert.isTrue(wrapper.find(ModuleFormComponent).length === 0, 'There should be no ModuleFormComponent displayed')
    assert.isTrue(fetchModuleCallback.calledOnce, 'The module should fetch the given module')
    assert.isTrue(fetchLayoutCallback.calledOnce, 'The module should fetch the given layout')
  })

  it('Should render component', () => {
    const fetchModuleCallback = spy()
    const fetchLayoutCallback = spy()

    const props = {
      params: {
        project: 'testProject',
        applicationId: 'testApp',
        module_id: '1',
      },
      updateModule: () => {},
      createModule: () => {},
      fetchModule: fetchModuleCallback,
      fetchLayout: fetchLayoutCallback,
      // Set by mapStateToProps
      isFetching: false,
      module: {},
      layout: {},
    }
    const wrapper = shallow(
      <UnconnectedModuleFormContainer
        {...props}
      />,
    )

    assert.isTrue(wrapper.find(ModuleFormComponent).length === 1, 'There should be a ModuleFormComponent displayed')
    assert.isFalse(fetchModuleCallback.called, 'The module should not fetch the module as it is already fetched')
    assert.isFalse(fetchLayoutCallback.called, 'The module should not fetch the module layout as it is already fetched')
  })
})
