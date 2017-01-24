/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import sinon from 'sinon'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent } from '@regardsoss/form-utils'
import ModuleListComponent from '../../src/components/ModuleListComponent'
import { UnconnectedModulesListContainer } from '../../src/containers/ModulesListContainer'

describe('[ADMIN UI-CONFIGURATION] Testing Modules list container', () => {
  it('Should fetch the modules list before rendering', () => {
    const fetchModulesCallback = sinon.spy()
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
      isFetching: false,
    }
    const wrapper = shallow(
      <UnconnectedModulesListContainer
        {...props}
      />,
    )

    assert.isTrue(wrapper.find(ModuleListComponent).length === 0, 'There should not be a ModuleListComponent displayed')
    assert.isTrue(wrapper.find(FormLoadingComponent).length === 1, 'There should not be a FormLoadingComponent displayed')
    assert.isTrue(wrapper.find(I18nProvider).length === 0, 'There should not be a I18nProvider')
    assert.isTrue(fetchModulesCallback.calledOnce, 'The container should fetch the modules list at mount')
  })

  it('Should render ModuleListComponent', () => {
    const fetchModulesCallback = sinon.spy()
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
      isFetching: false,
      modules: {
        0: {
          id: 0,
          name: 'tests',
        },
      },
    }
    const wrapper = shallow(
      <UnconnectedModulesListContainer
        {...props}
      />,
    )

    assert.isTrue(wrapper.find(ModuleListComponent).length === 1, 'There should not be a ModuleListComponent displayed')
    assert.isTrue(wrapper.find(FormLoadingComponent).length === 0, 'There should not be a FormLoadingComponent displayed')
    assert.isTrue(wrapper.find(I18nProvider).length === 1, 'There should not be a I18nProvider')
    assert.isFalse(fetchModulesCallback.called, 'The container should fetch the modules list at mount')
  })
})
