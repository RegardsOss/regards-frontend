/**
 * @author Xavier-Alexandre Brochard
 */
import { expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import someMatchHateoasDisplayLogic from '../../src/hateoas/someMatchHateoasDisplayLogic'

describe('[DISPLAY CONTROL UTILS] Testing someMatchHateoasDisplayLogic', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return true when at least one matches', () => {
    const required = ['titi', 'tutu']
    const available = ['toto', 'titi', 'tata']
    expect(someMatchHateoasDisplayLogic(required, available)).to.eql(true)
  })
  it('should return false if no element matches', () => {
    const required = ['titi', 'tutu']
    const available = ['toto']
    expect(someMatchHateoasDisplayLogic(required, available)).to.eql(false)
  })
})
