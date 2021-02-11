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
import OpenSearchQuery from '../../../catalog/query/OpenSearchQuery'
import OpenSearchQueryParameter from '../../../catalog/query/OpenSearchQueryParameter'

describe('[Domain] Testing OpenSearchQuery', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should display correctly an empty query', () => {
    const query = new OpenSearchQuery([])
    assert.equal(query.toQueryString(), '', 'The empty query result should be empty')
  })

  it('Should display correctly the query basis', () => {
    const query = new OpenSearchQuery([], 'hello/world')
    assert.equal(query.toQueryString(), 'hello/world', 'Query should display basiss and only basis')
  })

  it('Should display correctly with parameters and basis', () => {
    const query = new OpenSearchQuery([
      new OpenSearchQueryParameter('simple',
        OpenSearchQueryParameter.toStrictStringEqual(['yes', 'no'],
          OpenSearchQueryParameter.OR_SEPARATOR, false)),
      new OpenSearchQueryParameter('sucky', OpenSearchQueryParameter.toStringContained('yes+')),
      new OpenSearchQueryParameter('cranky',
        OpenSearchQueryParameter.toStrictStringEqual([
          'why', null], OpenSearchQueryParameter.AND_SEPARATOR, true)),
      new OpenSearchQueryParameter('hidden1', OpenSearchQueryParameter.toStrictStringEqual('')), // should be filtered
      new OpenSearchQueryParameter('', OpenSearchQueryParameter.toStringContained('hidden2')), // should be filtered
      new OpenSearchQueryParameter('hidden3', OpenSearchQueryParameter.toStrictStringEqual([])), // should be filtered
      new OpenSearchQueryParameter('hidden4', OpenSearchQueryParameter.toStringContained(
        ['', '', null, undefined])), // should be filtered
      new OpenSearchQueryParameter('hidden5',
        OpenSearchQueryParameter.toStringContained(
          ['', '', null, undefined], OpenSearchQueryParameter.OR_SEPARATOR, true)), // should be filtered
    ], 'bitmasks:less%20please')
    assert.equal(query.toQueryString(), 'bitmasks:less%20please AND simple:("yes" OR "no") AND sucky:(yes\\+) AND cranky:(!("why"))', 'Wrong generated URL')
  })
})
