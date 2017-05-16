/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import OpenSearchQueryParameter from '../../../src/query/opensearch/OpenSearchQueryParameter'

describe('[RESULTS MODULE] Testing Open search query parameter', () => {
  it('Should display correctly in query', () => {
    const queryParameter = new OpenSearchQueryParameter('myName', 'myValue')
    assert.equal(queryParameter.toQueryString(), 'myName:myValue', 'The parameter is not correctly displayed')
  })
  it('Should hide when empty', () => {
    const emptyParameters = [
      new OpenSearchQueryParameter('myName', null),
      new OpenSearchQueryParameter('myName', undefined),
      new OpenSearchQueryParameter('myName', '')]
    emptyParameters.forEach((qp, index) => {
      assert.equal(qp.toQueryString(), '', `The parameter at ${index} should be hidden`)
    })
  })
})

