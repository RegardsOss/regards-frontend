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

/**
 * @author Xavier-Alexandre Brochard
 */
import { expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import someMatchHateoasDisplayLogic from '../../src/logics/someMatchHateoasDisplayLogic'

describe('[DISPLAY CONTROL] Testing someMatchHateoasDisplayLogic', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return true when at least one matches', () => {
    const required = ['titi', 'tutu']
    const available = ['toto', 'titi', 'tata']
    expect(someMatchHateoasDisplayLogic(required, available)).to.eql(true)
  })
  it('should return false if no element matches', () => {
    const required = ['titi', 'tutu']
    const available = ['toto']
    expect(someMatchHateoasDisplayLogic(required, available)).to.eql(false)
  })
})
