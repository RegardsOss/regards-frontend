/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import StaticQueryParameter from '../../../../src/definitions/query/common/StaticQueryParameter'

describe('[Search Results] Testing StaticQueryParameter', () => {
  it('Should display correctly', () => {
    const p1 = new StaticQueryParameter('simple=no')
    assert.equal(p1.toQueryString(), 'simple=no')
    const p2 = new StaticQueryParameter('')
    assert.equal(p2.toQueryString(), '')
  })
})

