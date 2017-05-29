import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import LinearProgress from 'material-ui/LinearProgress'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import ConnectionTesterProgress from '../../../src/components/projectConnection/ConnectionTesterProgress'

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing ConnectionTesterProgress', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ConnectionTesterProgress)
  })

  it('should render a LinearProgress', () => {
    const props = {
      value: 50,
    }
    const enzymeWrapper = shallow(<ConnectionTesterProgress {...props} />)
    expect(enzymeWrapper.find(LinearProgress)).to.have.length(1)
  })
})
