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
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import {
  adminContainer, moduleContainer, reducer, styles, messages, dependencies,
} from '../src/main'

/**
 * Tests for search-form module interfaces
 * @author Sébastien binda
 */
describe('[FORM MODULE] Testing module interface', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should supply valid module interface', () => {
    assert.isDefined(adminContainer, 'Form module should define a main container for administration page')
    assert.isDefined(moduleContainer, 'Form module should define a main container')
    assert.isDefined(styles, 'Form module should define a styles file')
    assert.isDefined(reducer, 'Form module should define his reducers')
    assert.isDefined(messages, 'Form module should define his internationalization messages dictionnary')
    assert.isDefined(dependencies, 'Form module should define his dependencies')
    assert.isDefined(dependencies.user, 'Form module should define his user dependencies')
    assert.isDefined(dependencies.admin, 'Form module should define his admin dependencies')
  })
})
