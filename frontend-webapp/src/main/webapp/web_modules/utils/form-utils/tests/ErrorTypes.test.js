import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Field } from '@regardsoss/form-utils'
import ErrorTypes from '../src/ErrorTypes'

// Test a components rendering
describe('[FORM UTILS] Testing error types', () => {
  it('should exists', () => {
    assert.isDefined(ErrorTypes)
    assert.isDefined(ErrorTypes.REQUIRED)
    assert.isDefined(ErrorTypes.EMAIL)
  })
})
