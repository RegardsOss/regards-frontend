/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import URLSearchQueryParameter from '../../../../common/query/url/URLSearchQueryParameter'

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
      assert.isNotOk(qp.toQueryString(), `The parameter at ${index} should be hidden`)
    })
  })
})
