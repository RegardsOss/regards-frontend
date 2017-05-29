import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import FormEntityNotFoundComponent from '../src/FormEntityNotFoundComponent'

// Test a components rendering
describe('[FORM UTILS] Testing FormEntityNotFoundComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FormEntityNotFoundComponent)
  })
  it('should retrive the right child', () => {
    const enzymeWrapper = shallow(<FormEntityNotFoundComponent />)
    const subComponent = enzymeWrapper.find('span')
    expect(subComponent).to.have.length(1)
  })
})
