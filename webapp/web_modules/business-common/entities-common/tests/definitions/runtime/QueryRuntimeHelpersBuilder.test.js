/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { buildQueryTarget } from '../../../src/definitions/ServiceTarget'
import { QueryRuntimeHelpersBuilder } from '../../../src/definitions/runtime/QueryRuntimeHelpersBuilder'


/**
* Test QueryRuntimeHelpersBuilder
* @author Raphaël Mechali
*/
describe('[Entities Common] Testing QueryRuntimeHelpersBuilder', () => {
  it('should be defined', () => {
    assert.isDefined(QueryRuntimeHelpersBuilder)
  })
  it('should provide the main API functions: getFetchAction and getReducePromise', () => {
    const helperBuilder = new QueryRuntimeHelpersBuilder(buildQueryTarget('a=a&b=b', ENTITY_TYPES_ENUM.DATA, 15, []))
    assert.isFunction(helperBuilder.buildGetFetchAction, 'The buildGetFetchAction method should return getFetchAction function')
    assert.isFunction(helperBuilder.buildGetReducePromise, 'The buildGetReducePromise method should return getReducePromise function')
  })
})
