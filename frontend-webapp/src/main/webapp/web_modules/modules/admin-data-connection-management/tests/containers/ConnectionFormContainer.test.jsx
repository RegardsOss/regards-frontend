/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ConnectionFormContainer } from '../../src/containers/ConnectionFormContainer'

const context = buildTestContext()

describe('[ADMIN DATA CONNECTION MANAGEMENT] Testing ConnectionFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ConnectionFormContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  it('Render properly', () => {
    const props = {
      // from router
      params: {
        project: 'lambda',
        connectionId: DumpProvider.getFirstEntityKey('DataManagementClient', 'Connection'),
      },
      // from mapStateToProps
      currentConnection: DumpProvider.getFirstEntity('DataManagementClient', 'Connection'),
      pluginMetaDataList: DumpProvider.get('CommonClient', 'PluginMetaData'),

      // from mapDispatchToProps
      fetchConnection: () => {},
      createConnection: () => {},
      updateConnection: () => {},
      fetchPluginMetaDataList: () => {},
    }
    const enzymeWrapper = shallow(<ConnectionFormContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})

