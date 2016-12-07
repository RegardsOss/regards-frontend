import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { BoardContainer } from '../../src/containers/BoardContainer'
import BoardComponent from '../../src/components/BoardComponent'

// Test a component rendering
describe('[ADMIN USER MANAGEMENT] Testing BoardContainer', () => {
  it('should exists', () => {
    assert.isDefined(BoardContainer)
  })

  it('should render self and subcomponents', () => {
    const props = {
      params: {
        project: 'myproject',
      },
    }

    const enzymeWrapper = shallow(<BoardContainer {...props} />)
    const subComponent = enzymeWrapper.find(BoardComponent)
    expect(subComponent).to.have.length(1)
  })
})
