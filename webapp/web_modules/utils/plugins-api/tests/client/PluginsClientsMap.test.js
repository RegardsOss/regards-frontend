/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import PluginsClientsMap from '../../src/client/PluginsClientsMap'

describe('[PLUGINS API] Testing PluginsClientsMap', () => {
  it('should initialize and manage map correctly', () => {
    // note: builders here do not return clients as it is not required for lazy map to work
    let callBuilder1Count = 0
    const testBuilder1 = function testBuilder1(pluginInstanceId) {
      callBuilder1Count += 1
      return `builder1.${pluginInstanceId}`
    }
    let callBuilder2Count = 0
    const testBuilder2 = function testBuilder2(pluginInstanceId) {
      callBuilder2Count += 1
      return `builder2.${pluginInstanceId}`
    }

    const testMap = new PluginsClientsMap()
    // 1 - test second builder on first plugin instance
    let client2Instance1 = testMap.getClient(testBuilder2, 'instance1')
    assert.equal(callBuilder1Count, 0, '1 - First builder should not have been called')
    assert.equal(callBuilder2Count, 1, '1 - Second builder should have been called')
    assert.equal(client2Instance1, 'builder2.instance1', '1 - It should have produced the expected result for plugin instance 1')

    // 2 - recall second client builder result
    client2Instance1 = testMap.getClient(testBuilder2, 'instance1')
    assert.equal(callBuilder2Count, 1, '2 - Second builder should not have been called (buffered in map)')
    assert.equal(client2Instance1, 'builder2.instance1', '2 - It should have returned the buffered result')

    // 3 - test first builder on first plugin instance
    const client1Instance1 = testMap.getClient(testBuilder1, 'instance1')
    assert.equal(callBuilder1Count, 1, '3 - First builder should have been called')
    assert.equal(callBuilder2Count, 1, '3 - Second builder should not have been called')
    assert.equal(client1Instance1, 'builder1.instance1', '3 - It should have produced the expected result for plugin instance 1')

    // 4 - test second builder on second plugin instance
    const client2Instance2 = testMap.getClient(testBuilder2, 'instance2')
    assert.equal(callBuilder1Count, 1, '4 - First builder should not have been called')
    assert.equal(callBuilder2Count, 2, '4 - Second builder should have been called')
    assert.equal(client2Instance2, 'builder2.instance2', '4 - It should have produced the expected result for plugin instance 2')
  })
})
