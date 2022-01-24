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
import {
  adminContainer, moduleContainer, styles, messages,
} from '../src/main'

/**
 * Tests for menu module interfaces
 * @author Sébastien Binda
 */
describe('[Module] Testing module interface', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should supply valid module interface', () => {
    assert.isDefined(adminContainer, 'Module should define a main container for administration page')
    assert.isDefined(moduleContainer, 'Module should define a main container')
    assert.isDefined(styles, 'Module should define a styles file')
    assert.isDefined(messages, 'Form module should define his internationalization messages')
  })
})
