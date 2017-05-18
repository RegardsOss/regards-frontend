/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import URLSearchQuery from '../../../../src/definitions/query/url/URLSearchQuery'
import URLSearchQueryParameter from '../../../../src/definitions//query/url/URLSearchQueryParameter'

describe('[Search Results] Testing URLSearchQuery', () => {
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

