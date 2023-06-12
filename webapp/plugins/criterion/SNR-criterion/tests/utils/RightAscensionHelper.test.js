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
import RightAscensionHelper from '../../src/utils/RightAscensionHelper'

/**
 * Tests for RightAscensionHelper

@author Théo Lasserre
 */
describe('[SNR-criterion] Testing RightAscensionHelper', () => {
  it('should check correctly right ascension outside bounds', () => {
    assert.isFalse(RightAscensionHelper.isValidRightAscension('-1'))
    assert.isFalse(RightAscensionHelper.isValidRightAscension('361'))
  })
  it('should check correctly parsable values', () => {
    assert.isTrue(RightAscensionHelper.isValidRightAscension('0.5'))
    assert.isTrue(RightAscensionHelper.isValidRightAscension('0'))
    assert.isTrue(RightAscensionHelper.isValidRightAscension('360'))
    assert.isTrue(RightAscensionHelper.isValidRightAscension('1.5'))
    assert.isTrue(RightAscensionHelper.isValidRightAscension('28'))
    assert.isTrue(RightAscensionHelper.isValidRightAscension('179.9999'))
    assert.isTrue(RightAscensionHelper.isValidRightAscension(null))
    assert.isTrue(RightAscensionHelper.isValidRightAscension(''))
  })
  it('should check correctly non parsable values', () => {
    assert.isFalse(RightAscensionHelper.isValidRightAscension('a26'))
  })
  it('should check correctly right ascension field not in error', () => {
    assert.isFalse(RightAscensionHelper.isRightAscensionInError('', '', ''))
    assert.isFalse(RightAscensionHelper.isRightAscensionInError('54', '5', '7'))
    assert.isFalse(RightAscensionHelper.isRightAscensionInError('', '5', ''))
    assert.isFalse(RightAscensionHelper.isRightAscensionInError('6', '5', ''))
    assert.isFalse(RightAscensionHelper.isRightAscensionInError('', '5', '46'))
  })
  it('should check correctly rigth ascension field in error', () => {
    assert.isTrue(RightAscensionHelper.isRightAscensionInError('4', '', ''))
    assert.isTrue(RightAscensionHelper.isRightAscensionInError('', '', '6'))
    assert.isTrue(RightAscensionHelper.isRightAscensionInError('7', '', '6'))
  })
})
