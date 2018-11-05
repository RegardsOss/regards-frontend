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
import { buildDescriptionModuleConsumerID } from '../../../src/definitions/description/DescriptionConsumerID'

/**
* Test  UIPluginServiceHelper
* @author Raphaël Mechali
*/
describe('[Entities Common] Testing DescriptionConsumerID', () => {
  it('should exist and provide a unique ID for module ID', () => {
    assert.isDefined(buildDescriptionModuleConsumerID)
    const m1 = buildDescriptionModuleConsumerID(45)
    const m1p = buildDescriptionModuleConsumerID(45)
    assert.isOk(m1, 'Should have build m1 consumer ID')
    assert.equal(m1, m1p, 'Should build the same consumer ID for a given module ID')

    const m2 = buildDescriptionModuleConsumerID(99)
    assert.notEqual(m1, m2, 'Should build different consumer IDs for different module IDs')
  })
})
