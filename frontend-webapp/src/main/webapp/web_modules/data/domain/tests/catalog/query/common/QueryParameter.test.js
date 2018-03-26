/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import QueryParameter from '../../../../catalog/query/common/QueryParameter'

describe('[Domain] Testing QueryParameter', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should display correctly in query', () => {
    const queryParameter = new QueryParameter('myName', 'myValue', '(.-.)')
    assert.equal(queryParameter.toQueryString(), 'myName(.-.)myValue', 'The parameter is not correctly displayed')
    const queryParameter2 = new QueryParameter('myName', 0, '=')
    assert.equal(queryParameter2.toQueryString(), 'myName=0', 'The parameter2 is not correctly displayed')
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

