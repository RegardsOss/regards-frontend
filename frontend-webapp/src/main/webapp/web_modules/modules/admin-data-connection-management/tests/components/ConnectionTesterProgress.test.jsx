/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import CircularProgress from 'material-ui/CircularProgress'
import ConnectionTesterProgress from '../../src/components/ConnectionTesterProgress'

describe('[ADMIN DATA CONNECTION MANAGEMENT] Testing ConnectionTesterProgress', () => {
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
    assert.isDefined(ConnectionTesterProgress)
    assert.isDefined(CircularProgress)
  })
  it('Render properly', () => {
    const enzymeWrapper = shallow(<ConnectionTesterProgress />)
    expect(enzymeWrapper.find(CircularProgress)).to.have.length(1)
  })
})

