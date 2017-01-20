/**
 * @author lmieulet
 * @author Xavier-Alexandre Brochard
 */
import { expect } from 'chai'
import allMatchHateoasDisplayLogic from '../../src/hateoas/allMatchHateoasDisplayLogic'

describe('[DISPLAY CONTROL UTILS] Testing allMatchHateoasDisplayLogic', () => {
  it('should return true when all match', () => {
    const required = ['titi', 'tutu']
    const available = ['tutu', 'titi', 'tata']
    expect(allMatchHateoasDisplayLogic(required, available)).to.eql(true)
  })
  it('should return false if at least one does not match', () => {
    const required = ['titi', 'tutu']
    const available = ['toto', 'titi', 'tata']
    expect(allMatchHateoasDisplayLogic(required, available)).to.eql(false)
  })
})
