/**
 * @author lmieulet
 */
import { expect } from 'chai'
import hateoasDisplayLogic from '../../src/hateoas/hateoasDisplayLogic'

describe('[DISPLAY CONTROL UTILS] Testing hateoasDisplayLogic', () => {
  it('should return correct value', () => {
    expect(hateoasDisplayLogic()).to.eql(true)
  })
})
