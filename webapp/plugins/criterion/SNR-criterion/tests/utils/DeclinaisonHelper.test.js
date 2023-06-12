/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DeclinaisonHelper from '../../src/utils/DeclinaisonHelper'

/**
 * Tests for DeclinaisonHelper

@author Théo Lasserre
 */
describe('[SNR-criterion] Testing DeclinaisonHelper', () => {
  it('should check correctly declinaison outside bounds', () => {
    assert.isFalse(DeclinaisonHelper.isValidDeclinaison('-91'))
    assert.isFalse(DeclinaisonHelper.isValidDeclinaison('-91'))
  })
  it('should check correctly parsable values', () => {
    assert.isTrue(DeclinaisonHelper.isValidDeclinaison('0.5'))
    assert.isTrue(DeclinaisonHelper.isValidDeclinaison('-90'))
    assert.isTrue(DeclinaisonHelper.isValidDeclinaison('90'))
    assert.isTrue(DeclinaisonHelper.isValidDeclinaison('1.5'))
    assert.isTrue(DeclinaisonHelper.isValidDeclinaison('28'))
    assert.isTrue(DeclinaisonHelper.isValidDeclinaison(null))
    assert.isTrue(DeclinaisonHelper.isValidDeclinaison(''))
  })
  it('should check correctly non parsable values', () => {
    assert.isFalse(DeclinaisonHelper.isValidDeclinaison('a26'))
  })
  it('should check correctly declinaison field not in error', () => {
    assert.isFalse(DeclinaisonHelper.isDeclinaisonInError('', '', ''))
    assert.isFalse(DeclinaisonHelper.isDeclinaisonInError('54', '5', '7'))
    assert.isFalse(DeclinaisonHelper.isDeclinaisonInError('5', '', ''))
    assert.isFalse(DeclinaisonHelper.isDeclinaisonInError('6', '5', ''))
    assert.isFalse(DeclinaisonHelper.isDeclinaisonInError('7', '', '46'))
  })
  it('should check correctly declinaison field in error', () => {
    assert.isTrue(DeclinaisonHelper.isDeclinaisonInError('', '4', ''))
    assert.isTrue(DeclinaisonHelper.isDeclinaisonInError('', '', '6'))
    assert.isTrue(DeclinaisonHelper.isDeclinaisonInError('', '5', '6'))
  })
})
