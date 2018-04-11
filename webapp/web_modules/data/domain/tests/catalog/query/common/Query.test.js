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
import Query from '../../../../catalog/query/common/Query'
import StaticQueryParameter from '../../../../catalog/query/common/StaticQueryParameter'
import QueryParameter from '../../../../catalog/query/common/QueryParameter'

describe('[Domain] Testing Query', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should display correctly an empty query', () => {
    const query = new Query('', [], '&')
    assert.equal(query.toQueryString(), '', 'The empty query result should be empty')
  })

  it('Should display correctly the query basis', () => {
    const query = new Query('hello/world', [], '&')
    assert.equal(query.toQueryString(), 'hello/world', 'Query should display basiss and only basis')
  })

  it('Should display correclty with parameters and basis', () => {
    const query = new Query('www.bitmasks.sucks/x.x?reason=none', [new StaticQueryParameter('simple=no'), new QueryParameter('sucky', 'yes', '=')], '&')
    assert.equal(query.toQueryString(), 'www.bitmasks.sucks/x.x?reason=none&simple=no&sucky=yes', 'Wrong generated URL')
  })
})

