import { assert } from 'chai'
import { testSuiteHelpers} from '@regardsoss/tests-helpers'

import ValidationHelpers from '../src/ValidationHelpers'

// Test a components rendering
describe('[FORM UTILS] Testing validation helpers', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ValidationHelpers)
  })
  it('should should accept only valid emails', () => {
    assert.isFalse(ValidationHelpers.isValidEmail('myemail'))
    assert.isTrue(ValidationHelpers.isValidEmail('myemail@cnn.fr'))
  })
  it('should should accept only valid urls', () => {
    assert.isTrue(ValidationHelpers.isValidUrl('http://monserveur', false), 'A1')
    assert.isTrue(ValidationHelpers.isValidUrl('http://126.8.40.21:2828/anywhere?type=anything', false), 'A2')
    assert.isTrue(ValidationHelpers.isValidUrl('http://google.com', false))
    assert.isTrue(ValidationHelpers.isValidUrl('https://google.com', false))
    assert.isTrue(ValidationHelpers.isValidUrl('./mes-recettes/ma-petite-tarte.gif', true))
    assert.isTrue(ValidationHelpers.isValidUrl('../mes_recettes/ma-petite-tarte.gif', true))
    assert.isFalse(ValidationHelpers.isValidUrl('/mes_recettes/ma-petite-tarte.gif', true))
    assert.isFalse(ValidationHelpers.isValidUrl('mes:recettes/ma-petite-tarte.gif', true))
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
  it('should should accept only valid passwords', () => {
    assert.isFalse(ValidationHelpers.isValidPassword('aaa'))
    assert.isTrue(ValidationHelpers.isValidPassword('aaaaaa'))
  })
})
