import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { ErrorDecoratorComponent } from '@regardsoss/components'
import FormErrorMessage from '../src/FormErrorMessage'

// Test a component rendering
describe('[FORM UTILS] Testing FormErrorMessage', () => {
  it('should exists', () => {
    assert.isDefined(FormErrorMessage)
  })
  it('should retrive the right child', () => {
    const enzymeWrapper = shallow(<FormErrorMessage />)
    const subComponent = enzymeWrapper.find(ErrorDecoratorComponent)
    expect(subComponent).to.have.length(1)
  })
})
