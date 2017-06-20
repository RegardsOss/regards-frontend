/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import URLSearchQuery from '../../../../catalog/query/url/URLSearchQuery'
import URLSearchQueryParameter from '../../../../catalog/query/url/URLSearchQueryParameter'

describe('[Search Results] Testing URLSearchQuery', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should display correctly an empty query', () => {
    const query = new URLSearchQuery('', [])
    assert.equal(query.toQueryString(), '', 'The empty query result should be empty')
  })

  it('Should display correctly the query basis', () => {
    const query = new URLSearchQuery('hello/world', [])
    assert.equal(query.toQueryString(), 'hello/world', 'Query should display basiss and only basis')
  })

  it('Should display correclty with parameters and basis', () => {
    const query = new URLSearchQuery('lala?bitmasks=bullshit&ragemode=true', [new URLSearchQueryParameter('simple', 'no'), new URLSearchQueryParameter('sucky', 'yes')])
    assert.equal(query.toQueryString(), 'lala?bitmasks=bullshit&ragemode=true&simple=no&sucky=yes', 'Wrong generated URL')
  })
})

