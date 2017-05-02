/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ConnectionListContainer } from '../../src/containers/ConnectionListContainer'

const context = buildTestContext()

describe('[ADMIN DATA CONNECTION MANAGEMENT] Testing ConnectionListContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ConnectionListContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  it('Render properly', () => {
    const props = {
      // from router
      params: {
        project: 'lambda',
      },
      // from mapStateToProps
      connectionList: DumpProvider.get('DataManagementClient', 'Connection'),
      // from mapDispatchToProps
      fetchConnectionList: () => {},
      testConnection: () => {},
      deleteConnection: () => {},
    }
    const enzymeWrapper = shallow(<ConnectionListContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})
