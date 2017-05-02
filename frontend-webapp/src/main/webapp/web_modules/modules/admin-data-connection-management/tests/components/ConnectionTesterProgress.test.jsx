/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import CircularProgress from 'material-ui/CircularProgress'
import ConnectionTesterProgress from '../../src/components/ConnectionTesterProgress'

describe('[ADMIN DATA CONNECTION MANAGEMENT] Testing ConnectionTesterProgress', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ConnectionTesterProgress)
    assert.isDefined(CircularProgress)
  })
  it('Render properly', () => {
    const enzymeWrapper = shallow(<ConnectionTesterProgress />)
    expect(enzymeWrapper.find(CircularProgress)).to.have.length(1)
  })
})

