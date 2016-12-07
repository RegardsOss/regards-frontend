import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Field } from '@regardsoss/form-utils'
import ValidationHelpers from '../src/ValidationHelpers'

// Test a component rendering
describe('[FORM UTILS] Testing validation helpers', () => {
  it('should exists', () => {
    assert.isDefined(ValidationHelpers)
  })
  it('should should accept only valid emails', () => {
    expect(ValidationHelpers.isValidEmail('myemail')).to.be.false
    expect(ValidationHelpers.isValidEmail('myemail@cnn.fr')).to.be.true
  })
})
