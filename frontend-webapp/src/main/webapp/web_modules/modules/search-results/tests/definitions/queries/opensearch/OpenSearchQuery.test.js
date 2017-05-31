/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import OpenSearchQuery from '../../../../src/definitions/query/opensearch/OpenSearchQuery'
import StaticQueryParameter from '../../../../src/definitions/query/common/StaticQueryParameter'
import OpenSearchQueryParameter from '../../../../src/definitions/query/opensearch/OpenSearchQueryParameter'

describe('[Search Results] Testing OpenSearchQuery', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should display correctly an empty query', () => {
    const query = new OpenSearchQuery('', [])
    assert.equal(query.toQueryString(), '', 'The empty query result should be empty')
  })

  it('Should display correctly the query basis', () => {
    const query = new OpenSearchQuery('hello/world', [])
    assert.equal(query.toQueryString(), 'hello/world', 'Query should display basiss and only basis')
  })

  it('Should display correclty with parameters and basis', () => {
    const query = new OpenSearchQuery('bitmasks:less%20please', [new StaticQueryParameter('simple=no'), new OpenSearchQueryParameter('sucky', 'yes')])
    assert.equal(query.toQueryString(), 'bitmasks:less%20please AND simple=no AND sucky:yes', 'Wrong generated URL')
  })
})

