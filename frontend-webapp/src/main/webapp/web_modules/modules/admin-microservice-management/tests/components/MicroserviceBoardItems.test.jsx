/**
 * LICENSE_PLACEHOLDER
 **/
import { assert } from 'chai'
import { stub } from 'sinon'
import MicroserviceBoardItems from '../../src/components/MicroserviceBoardItems'

/**
 * Microservices configuration tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN PROJECT MANAGEMENT] Testing plugin board item generator', () => {
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should generator items properly', () => {
    assert.isDefined(MicroserviceBoardItems)
  })
})
