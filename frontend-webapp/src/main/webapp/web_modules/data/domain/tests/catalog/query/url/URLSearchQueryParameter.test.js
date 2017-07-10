/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import URLSearchQueryParameter from '../../../../catalog/query/url/URLSearchQueryParameter'

describe('[Domain] Testing URL search query parameter', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

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

