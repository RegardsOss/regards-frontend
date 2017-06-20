/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import StaticQueryParameter from '../../../../catalog/query/common/StaticQueryParameter'

describe('[Search Results] Testing StaticQueryParameter', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should display correctly', () => {
    const p1 = new StaticQueryParameter('simple=no')
    assert.equal(p1.toQueryString(), 'simple=no')
    const p2 = new StaticQueryParameter('')
    assert.equal(p2.toQueryString(), '')
  })
})

