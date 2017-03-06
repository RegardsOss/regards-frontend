/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { TableRow } from 'material-ui/Table'
import ConnectionListComponent from '../../src/components/ConnectionListComponent'
import ConnectionTesterIconButton from '../../src/components/ConnectionTesterIconButton'
import ConnectionDump from '../model/dump/ConnectionDump'

describe('[ADMIN DATA CONNECTION MANAGEMENT] Testing ConnectionListComponent', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    sinon.stub(console, 'error', (warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(ConnectionListComponent)
    assert.isDefined(TableRow)
    assert.isDefined(ConnectionTesterIconButton)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {
        primary1Color: 'red',
        accent1Color: 'red',
      },
    },
  }
  it('Render properly', () => {
    const props = {
      connectionList: ConnectionDump,
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

