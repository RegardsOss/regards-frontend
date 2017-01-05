import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import LinearProgress from 'material-ui/LinearProgress'
import ConnectionTesterProgress from '../../src/components/ConnectionTesterProgress'

// Test a component rendering
describe('[ADMIN DATABASE MANAGEMENT] Testing ConnectionTesterProgress', () => {
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
