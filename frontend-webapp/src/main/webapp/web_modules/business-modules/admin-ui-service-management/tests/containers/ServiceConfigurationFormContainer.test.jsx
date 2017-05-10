/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { spy } from 'sinon'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ServiceConfigurationFormContainer } from '../../src/containers/ServiceConfigurationFormContainer'

const context = buildTestContext()

describe('[ADMIN UI SERVICE MANAGEMENT] Testing ServiceConfigurationFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ServiceConfigurationFormContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('Render properly', () => {
    const fetchUIPluginConfigurationSpy = spy()
    const updateUIPluginConfigurationSpy = spy()
    const createUIPluginConfigurationSpy = spy()
    const props = {
      // from router
      params: {
        project: 'lambda',
        uiPluginId: DumpProvider.getFirstEntityKey('AccessProjectClient', 'UIPluginDefinition'),
        uiPluginConfId: DumpProvider.getFirstEntityKey('AccessProjectClient', 'UIPluginConfiguration'),
        mode: 'duplicate',
      },
      // from mapStateToProps
      uiPluginConfiguration: DumpProvider.getFirstEntity('AccessProjectClient', 'UIPluginConfiguration'),
      // from mapDispatchToProps
      fetchUIPluginConfiguration: fetchUIPluginConfigurationSpy,
      updateUIPluginConfiguration: updateUIPluginConfigurationSpy,
      createUIPluginConfiguration: createUIPluginConfigurationSpy,
    }

    const enzymeWrapper = shallow(<ServiceConfigurationFormContainer {...props} />, { context, lifecycleExperimental: true })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
    assert.isTrue(fetchUIPluginConfigurationSpy.calledOnce, 'Component should fetch entity on his initial componentDidMount')
    assert.isTrue(updateUIPluginConfigurationSpy.notCalled, 'Not called yet')
    assert.isTrue(createUIPluginConfigurationSpy.notCalled, 'Not called yet')
  })
})
