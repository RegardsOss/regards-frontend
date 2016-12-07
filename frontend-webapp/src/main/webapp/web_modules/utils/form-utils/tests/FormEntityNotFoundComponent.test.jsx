import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import FormEntityNotFoundComponent from '../src/FormEntityNotFoundComponent'

// Test a component rendering
describe('[FORM UTILS] Testing FormEntityNotFoundComponent', () => {
  it('should exists', () => {
    assert.isDefined(FormEntityNotFoundComponent)
  })
  it('should retrive the right child', () => {
    const enzymeWrapper = shallow(<FormEntityNotFoundComponent />)
    const subComponent = enzymeWrapper.find('span')
    expect(subComponent).to.have.length(1)
  })
})
