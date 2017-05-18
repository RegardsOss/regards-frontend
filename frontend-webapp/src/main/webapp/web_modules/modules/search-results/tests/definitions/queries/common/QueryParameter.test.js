/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import QueryParameter from '../../../../src/definitions/query/common/QueryParameter'

describe('[Search Results] Testing Query parameter', () => {
  it('Should display correctly in query', () => {
    const queryParameter = new QueryParameter('myName', 'myValue', '(.-.)')
    assert.equal(queryParameter.toQueryString(), 'myName(.-.)myValue', 'The parameter is not correctly displayed')
  })
  it('Should hide when empty', () => {
    const emptyParameters = [
      new QueryParameter('myName', null, 'x'),
      new QueryParameter('myName', undefined, 'x'),
      new QueryParameter('myName', '', 'x')]
    emptyParameters.forEach((qp, index) => {
      assert.equal(qp.toQueryString(), '', `The parameter at ${index} should be hidden`)
    })
  })
})

