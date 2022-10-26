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
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'

import ValidationHelpers from '../../src/domain/ValidationHelpers'

// Test a components rendering
describe('[FORM UTILS] Testing validation helpers', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ValidationHelpers)
  })
  it('should should accept only valid emails', () => {
    assert.isFalse(ValidationHelpers.isValidEmail('myemail'))
    assert.isTrue(ValidationHelpers.isValidEmail('myemail@cnn.fr'))
    assert.isTrue(ValidationHelpers.isValidEmail('didier.marchal@tumine.world'))
  })
  it('should should accept only valid urls', () => {
    assert.isTrue(ValidationHelpers.isValidUrl('http://monserveur', false), 'A1')
    assert.isTrue(ValidationHelpers.isValidUrl('http://126.8.40.21:2828/anywhere?type=anything', false), 'A2')
    assert.isTrue(ValidationHelpers.isValidUrl('http://google.com', false))
    assert.isTrue(ValidationHelpers.isValidUrl('https://google.com', false))
    assert.isTrue(ValidationHelpers.isValidUrl('./mes-recettes/ma-petite-tarte.gif', true))
    assert.isTrue(ValidationHelpers.isValidUrl('../mes_recettes/ma-petite-tarte.gif', true))
    assert.isFalse(ValidationHelpers.isValidUrl('/mes_recettes/ma-petite-tarte.gif', false))
    assert.isTrue(ValidationHelpers.isValidUrl('/mes_recettes/ma-petite-tarte.gif', true))
    assert.isFalse(ValidationHelpers.isValidUrl('mes:recettes/ma-petite-tarte.gif', true))
    assert.isTrue(ValidationHelpers.isValidUrl('http://172.0.0.0/mapserver/?map=/etc/mapserver/bluemarble.map', true))
  })
  it('should should accept only valid IPs', () => {
    assert.isFalse(ValidationHelpers.isValidIP('210.110'))
    assert.isFalse(ValidationHelpers.isValidIP('666.10.10.20'))
    assert.isFalse(ValidationHelpers.isValidIP('4444.11.11.21'))
    assert.isFalse(ValidationHelpers.isValidIP('33.3333.33.3'))
    assert.isFalse(ValidationHelpers.isValidIP('y.y.y.y'))
    assert.isTrue(ValidationHelpers.isValidIP('110.234.52.124'))
    assert.isTrue(ValidationHelpers.isValidIP('115.42.150.37'))
  })
})
