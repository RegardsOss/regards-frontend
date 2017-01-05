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
  it('should should accept only valid IPs', () => {
    assert.isFalse(ValidationHelpers.isValidIP('210.110'))
    assert.isFalse(ValidationHelpers.isValidIP('666.10.10.20'))
    assert.isFalse(ValidationHelpers.isValidIP('4444.11.11.11'))
    assert.isFalse(ValidationHelpers.isValidIP('33.3333.33.3'))
    assert.isFalse(ValidationHelpers.isValidIP('y.y.y.y'))
    assert.isTrue(ValidationHelpers.isValidIP('110.234.52.124'))
    assert.isTrue(ValidationHelpers.isValidIP('115.42.150.37'))
  })
})
