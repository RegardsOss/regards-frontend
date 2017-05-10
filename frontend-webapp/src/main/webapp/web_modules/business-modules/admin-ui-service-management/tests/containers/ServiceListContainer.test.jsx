/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { spy } from 'sinon'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ServiceListContainer } from '../../src/containers/ServiceListContainer'

const context = buildTestContext()

describe('[ADMIN UI SERVICE MANAGEMENT] Testing ServiceListContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ServiceListContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('Render properly', () => {
    const fetchUIPluginDefinitionListSpy = spy()
    const props = {
      // from router
      params: {
        project: 'lambda',
      },
      // from mapStateToProps
      uiPluginDefinitionList: DumpProvider.get('AccessProjectClient', 'UIPluginDefinition'),
      // from mapDispatchToProps
      fetchUIPluginDefinitionList: fetchUIPluginDefinitionListSpy,
    }

    const enzymeWrapper = shallow(<ServiceListContainer {...props} />, { context, lifecycleExperimental: true })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
    assert.isTrue(fetchUIPluginDefinitionListSpy.calledOnce, 'Component should fetch entity on his initial componentDidMount')
  })
})
