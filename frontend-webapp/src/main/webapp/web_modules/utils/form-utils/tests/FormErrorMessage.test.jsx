import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers} from '@regardsoss/tests-helpers'
import { ErrorDecoratorComponent } from '@regardsoss/components'
import FormErrorMessage from '../src/FormErrorMessage'

// Test a components rendering
describe('[FORM UTILS] Testing FormErrorMessage', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FormErrorMessage)
  })
  it('should retrive the right child', () => {
    const enzymeWrapper = shallow(<FormErrorMessage />)
    const subComponent = enzymeWrapper.find(ErrorDecoratorComponent)
    expect(subComponent).to.have.length(1)
  })
})
