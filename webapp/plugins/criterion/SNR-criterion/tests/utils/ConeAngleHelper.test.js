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
import ConeAngleHelper from '../../src/utils/ConeAngleHelper'

/**
 * Tests for ConeAngleHelper

@author Théo Lasserre
 */
describe('[SNR-criterion] Testing ConeAngleHelper', () => {
  it('should check correctly angles outside bounds', () => {
    assert.isFalse(ConeAngleHelper.isValidAngle('-1'))
    assert.isFalse(ConeAngleHelper.isValidAngle('0'))
    assert.isFalse(ConeAngleHelper.isValidAngle('180'))
    assert.isFalse(ConeAngleHelper.isValidAngle('181'))
  })
  it('should check correctly parsable values', () => {
    assert.isTrue(ConeAngleHelper.isValidAngle('0.5'))
    assert.isTrue(ConeAngleHelper.isValidAngle('1.5'))
    assert.isTrue(ConeAngleHelper.isValidAngle('28'))
    assert.isTrue(ConeAngleHelper.isValidAngle('179.9999'))
    assert.isTrue(ConeAngleHelper.isValidAngle(null))
    assert.isTrue(ConeAngleHelper.isValidAngle(''))
  })
  it('should check correctly non parsable values', () => {
    assert.isFalse(ConeAngleHelper.isValidAngle('a26'))
  })
  it('should check correctly angle SNR field not in error', () => {
    assert.isFalse(ConeAngleHelper.isAngleSNRInError('', ''))
    assert.isFalse(ConeAngleHelper.isAngleSNRInError('any', '5'))
  })
  it('should check correctly angle SNR field in error', () => {
    assert.isTrue(ConeAngleHelper.isAngleSNRInError('any', ''))
  })
  it('should check correctly angle DIRECT_VALUES field not in error', () => {
    assert.isFalse(ConeAngleHelper.isAngleDirectValuesInError('', '', ''))
    assert.isFalse(ConeAngleHelper.isAngleDirectValuesInError('55', '45', '5'))
    assert.isFalse(ConeAngleHelper.isAngleDirectValuesInError('', '', '5'))
    assert.isFalse(ConeAngleHelper.isAngleDirectValuesInError('14', '', '6'))
    assert.isFalse(ConeAngleHelper.isAngleDirectValuesInError('', '5', '6'))
  })
  it('should check correctly angle DIRECT_VALUES field in error', () => {
    assert.isTrue(ConeAngleHelper.isAngleDirectValuesInError('', '7', ''))
    assert.isTrue(ConeAngleHelper.isAngleDirectValuesInError('14', '', ''))
    assert.isTrue(ConeAngleHelper.isAngleDirectValuesInError('14', '54', ''))
  })
})
