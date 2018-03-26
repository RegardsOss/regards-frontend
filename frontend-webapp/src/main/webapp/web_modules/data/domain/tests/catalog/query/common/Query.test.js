/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import Query from '../../../../catalog/query/common/Query'
import StaticQueryParameter from '../../../../catalog/query/common/StaticQueryParameter'
import QueryParameter from '../../../../catalog/query/common/QueryParameter'

describe('[Domain] Testing Query', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should display correctly an empty query', () => {
    const query = new Query('', [], '&')
    assert.equal(query.toQueryString(), '', 'The empty query result should be empty')
  })

  it('Should display correctly the query basis', () => {
    const query = new Query('hello/world', [], '&')
    assert.equal(query.toQueryString(), 'hello/world', 'Query should display basiss and only basis')
  })

  it('Should display correclty with parameters and basis', () => {
    const query = new Query('www.bitmasks.sucks/x.x?reason=none', [new StaticQueryParameter('simple=no'), new QueryParameter('sucky', 'yes', '=')], '&')
    assert.equal(query.toQueryString(), 'www.bitmasks.sucks/x.x?reason=none&simple=no&sucky=yes', 'Wrong generated URL')
  })
})

