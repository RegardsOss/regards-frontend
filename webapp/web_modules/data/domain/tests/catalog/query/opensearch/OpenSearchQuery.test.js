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
import OpenSearchQuery from '../../../../catalog/query/opensearch/OpenSearchQuery'
import StaticQueryParameter from '../../../../catalog/query/common/StaticQueryParameter'
import OpenSearchQueryParameter from '../../../../catalog/query/opensearch/OpenSearchQueryParameter'

describe('[Domain] Testing OpenSearchQuery', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should display correctly an empty query', () => {
    const query = new OpenSearchQuery('', [])
    assert.equal(query.toQueryString(), '', 'The empty query result should be empty')
  })

  it('Should display correctly the query basis', () => {
    const query = new OpenSearchQuery('hello/world', [])
    assert.equal(query.toQueryString(), 'hello/world', 'Query should display basiss and only basis')
  })

  it('Should display correclty with parameters and basis', () => {
    const query = new OpenSearchQuery('bitmasks:less%20please', [new StaticQueryParameter('simple=no'), new OpenSearchQueryParameter('sucky', 'yes')])
    assert.equal(query.toQueryString(), 'bitmasks:less%20please AND simple=no AND sucky:yes', 'Wrong generated URL')
  })
})
