/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import ConnectionTesterIconButton from '../../src/components/ConnectionTesterIconButton'
import ConnectionTesterProgress from '../../src/components/ConnectionTesterProgress'

const context = buildTestContext()

describe('[ADMIN DATA CONNECTION MANAGEMENT] Testing ConnectionTesterIconButton', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ConnectionTesterIconButton)
    assert.isDefined(ConnectionTesterProgress)
  })
  it('Render properly', () => {
    const props = {
      connection: DumpProvider.getFirstEntity('DataManagementClient', 'Connection'),
      handleTestConnection: () => { },
    }
    const enzymeWrapper = shallow(<ConnectionTesterIconButton {...props} />, { context })
    expect(enzymeWrapper.find(ConnectionTesterProgress)).to.have.length(0)
  })
})
