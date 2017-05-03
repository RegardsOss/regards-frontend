/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { TableRow } from 'material-ui/Table'
import ConnectionListComponent from '../../src/components/ConnectionListComponent'
import ConnectionTesterIconButton from '../../src/components/ConnectionTesterIconButton'

const context = buildTestContext()

describe('[ADMIN DATA CONNECTION MANAGEMENT] Testing ConnectionListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ConnectionListComponent)
    assert.isDefined(TableRow)
    assert.isDefined(ConnectionTesterIconButton)
  })
  it('Render properly', () => {
    const props = {
      connectionList: DumpProvider.get('DataManagementClient', 'Connection'),
      handleDelete: () => {},
      handleEdit: () => {},
      handleTestConnection: () => {},
      backUrl: '#',
      createUrl: '#',
    }
    const enzymeWrapper = shallow(<ConnectionListComponent {...props} />, { context })
    expect(enzymeWrapper.find(TableRow)).to.have.length(2)
    expect(enzymeWrapper.find(ConnectionTesterIconButton)).to.have.length(1)
  })
})

