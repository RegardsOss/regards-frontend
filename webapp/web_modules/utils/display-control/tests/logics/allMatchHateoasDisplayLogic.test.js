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
 * @author lmieulet
 * @author Xavier-Alexandre Brochard
 */
import { expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import allMatchHateoasDisplayLogic from '../../src/logics/allMatchHateoasDisplayLogic'

describe('[DISPLAY CONTROL] Testing allMatchHateoasDisplayLogic', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return true when all match', () => {
    const required = ['titi', 'tutu']
    const available = ['tutu', 'titi', 'tata']
    expect(allMatchHateoasDisplayLogic(required, available)).to.eql(true)
  })
  it('should return false if at least one does not match', () => {
    const required = ['titi', 'tutu']
    const available = ['toto', 'titi', 'tata']
    expect(allMatchHateoasDisplayLogic(required, available)).to.eql(false)
  })
})
