import { assert } from 'chai'
import ValidationHelpers from '../src/ValidationHelpers'

// Test a components rendering
describe('[FORM UTILS] Testing validation helpers', () => {
  it('should exists', () => {
    assert.isDefined(ValidationHelpers)
  })
  it('should should accept only valid emails', () => {
    assert.isFalse(ValidationHelpers.isValidEmail('myemail'))
    assert.isTrue(ValidationHelpers.isValidEmail('myemail@cnn.fr'))
  })
  it('should should accept only valid urls', () => {
    assert.isFalse(ValidationHelpers.isValidUrl('http://google'))
    assert.isFalse(ValidationHelpers.isValidUrl('google.com'))
    assert.isTrue(ValidationHelpers.isValidUrl('http://google.com'))
    assert.isTrue(ValidationHelpers.isValidUrl('https://google.com'))
  })
})
