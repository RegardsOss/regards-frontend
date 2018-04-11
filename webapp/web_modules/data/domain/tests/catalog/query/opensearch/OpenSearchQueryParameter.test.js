/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import OpenSearchQueryParameter from '../../../../catalog/query/opensearch/OpenSearchQueryParameter'

describe('[Domain] Testing Open search query parameter', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should display correctly in query', () => {
    const queryParameter = new OpenSearchQueryParameter('myName', 'myValue')
    assert.equal(queryParameter.toQueryString(), 'myName:myValue', 'The parameter is not correctly displayed')
  })
  it('Should escape values with special characters', () => {
    const queryParameter = new OpenSearchQueryParameter('myName', 'my Value:')
    assert.equal(queryParameter.toQueryString(), 'myName:"my%20Value%3A"', 'The parameter is not correctly displayed')
  })
  it('Should merge possible values array into an OR joined string', () => {
    const queryParameter = new OpenSearchQueryParameter('value', ['v1', 'v2'])
    assert.equal(queryParameter.toQueryString(), 'value:(v1 OR v2)', 'The parameter is not correctly displayed')
  })
  it('Should negate its own value on demand', () => {
    const queryParameter = new OpenSearchQueryParameter('value', 'v1', true)
    assert.equal(queryParameter.toQueryString(), '!(value:v1)', 'The parameter is not correctly displayed')
  })
  it('Should combine negation, multiple values and special characters', () => {
    const queryParameter = new OpenSearchQueryParameter('value', ['v:v1', 'z:z1'], true)
    assert.equal(queryParameter.toQueryString(), '!(value:("v%3Av1" OR "z%3Az1"))', 'The parameter is not correctly displayed')
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

