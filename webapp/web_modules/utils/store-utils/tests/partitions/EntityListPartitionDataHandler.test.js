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
import dataHandler from '../../src/partition/EntityListPartitionDataHandler'

describe('[STORE UTILS] Testing EntityListPartitionDataHandler', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should convert correctly payload', () => {
    const convert = dataHandler('potatoes')
    assert.deepEqual(convert({
      payload: {
        entities: {
          potatoes: {
            1: {
              id: 1,
              weight: 1.65,
            },
            2: {
              id: 2,
              weight: 0.85,
            },
          },
        },
        anotherField: 35,
      },
    }), {
      items: {
        1: {
          id: 1,
          weight: 1.65,
        },
        2: {
          id: 2,
          weight: 0.85,
        },
      },
      anotherField: 35,
    })
  })
})
