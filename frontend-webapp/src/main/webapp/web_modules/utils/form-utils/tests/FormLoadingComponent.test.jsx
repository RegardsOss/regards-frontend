import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import FormLoadingComponent from '../src/FormLoadingComponent'

// Test a components rendering
describe('[FORM UTILS] Testing FormLoadingComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FormLoadingComponent)
  })
  it('should retrive the right child', () => {
    const enzymeWrapper = shallow(<FormLoadingComponent />)
    const subComponent = enzymeWrapper.find('span')
    expect(subComponent).to.have.length(1)
  })
})
