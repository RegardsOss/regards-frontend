/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import ConnectionTesterIconButton from '../../src/components/ConnectionTesterIconButton'
import ConnectionTesterProgress from '../../src/components/ConnectionTesterProgress'
import ConnectionDump from '../model/dump/ConnectionDump'

describe('[ADMIN DATA CONNECTION MANAGEMENT] Testing ConnectionTesterIconButton', () => {
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
  it('should exists', () => {
    assert.isDefined(ConnectionTesterIconButton)
    assert.isDefined(ConnectionTesterProgress)
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
      connection: ConnectionDump[1353],
      handleTestConnection: () => { },
    }
    const enzymeWrapper = shallow(<ConnectionTesterIconButton {...props} />, { context })
    expect(enzymeWrapper.find(ConnectionTesterProgress)).to.have.length(0)
  })
})
