/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import Query from '../../../src/query/common/Query'
import StaticQueryParameter from '../../../src/query/common/StaticQueryParameter'
import QueryParameter from '../../../src/query/common/QueryParameter'

describe('[RESULTS MODULE] Testing Query', () => {
  it('Should display correctly an empty query', () => {
    const query = new Query('', [], '&')
    assert.equal(query.toQueryString(), '', 'The empty query result should be empty')
  })

  it('Should display correctly the query basis', () => {
    const query = new Query('hello/world', [], '&')
    assert.equal(query.toQueryString(), 'hello/world', 'The empty query result should be empty')
  })

  it('Should display correclty with parameters and basis', () => {
    const query = new Query('www.bitmasks.sucks/x.x?reason=none', [new StaticQueryParameter('simple=no'), new QueryParameter('sucky', 'yes', '=')], '&')
    assert.equal(query.toQueryString(), 'www.bitmasks.sucks/x.x?reason=none&simple=no&sucky=yes', 'Wrong generated URL')
  })
})

