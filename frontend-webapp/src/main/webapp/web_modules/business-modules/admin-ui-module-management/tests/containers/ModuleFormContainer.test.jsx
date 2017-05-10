/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { spy } from 'sinon'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import ModuleFormComponent from '../../src/components/ModuleFormComponent'
import NoContainerAvailables from '../../src/components/NoContainerAvailables'
import { UnconnectedModuleFormContainer } from '../../src/containers/ModuleFormContainer'

/**
 * Tests for ModuleFormContainer
 * @author Sébastien binda
 */
describe('[ADMIN UI MODULE MANAGEMENT] Testing Module form container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

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

  it('Should render a no container available component', () => {
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
      isFetching: false,
      module: {},
      layout: {},
    }
    const wrapper = shallow(
      <UnconnectedModuleFormContainer
        {...props}
      />,
    )

    assert.isTrue(wrapper.find(ModuleFormComponent).length === 0, 'There should not be a ModuleFormComponent displayed')
    assert.isTrue(wrapper.find(NoContainerAvailables).length === 1, 'There should be a NoContainerAvailables displayed')
    assert.isFalse(fetchModuleCallback.called, 'The module should not fetch the module as it is already fetched')
    assert.isFalse(fetchLayoutCallback.called, 'The module should not fetch the module layout as it is already fetched')
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
      isFetching: false,
      module: {},
      layout: {
        id: 0,
        type: 'MainContainer',
        applicationId: 'test',
        layout: {
          id: 'test',
          type: 'RowContainer',
          containers: [
            { id: 'test1', type: 'RowContainer' },
            { id: 'test2', type: 'RowContainer' },
          ],
        },
      },
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
