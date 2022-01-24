/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import keys from 'lodash/keys'
import { assert } from 'chai'
import { StorageUnitScale } from '../../src/storage/StorageUnitScale'
import messages from '../../src/storage/i18n'

/**
* Test  Component name
* @author Raphaël Mechali
*/
describe('[Units] Testing  Messages', () => {
  it('should exist', () => {
    assert.isDefined(messages)
    assert.isDefined(messages.en)
    assert.isDefined(messages.fr)
  })
  it('should define same sentences', () => {
    assert.deepEqual(keys(messages.en), keys(messages.fr))
  })
  it('should define keys for each unit and scale unit', () => {
    // as there is equality between FR and EN messages, test above, no need to test it twice here
    const messagesKeys = keys(messages.en)
    StorageUnitScale.all.forEach((scale) => {
      assert.include(messagesKeys, scale.messageKey, `Missing scale key in messages : ${scale.messageKey}`)
      scale.units.forEach((unit) => {
        assert.include(messagesKeys, unit.messageKey, `Missing unit key in messages : ${unit.messageKey}`)
      })
    })
  })
})
