/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import URLSearchQueryParameter from '../../../src/query/url/URLSearchQueryParameter'

describe('[RESULTS MODULE] Testing URL search query parameter', () => {
  it('Should display correctly in query', () => {
    const queryParameter = new URLSearchQueryParameter('myName', 'myValue')
    assert.equal(queryParameter.toQueryString(), 'myName=myValue', 'The parameter is not correctly displayed')
  })
  it('Should hide when empty', () => {
    const emptyParameters = [
      new URLSearchQueryParameter('myName', null),
      new URLSearchQueryParameter('myName', undefined),
      new URLSearchQueryParameter('myName', '')]
    emptyParameters.forEach((qp, index) => {
      assert.equal(qp.toQueryString(), '', `The parameter at ${index} should be hidden`)
    })
  })
})

