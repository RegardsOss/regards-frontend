/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import AuthenticationDialogComponent from '../../src/components/AuthenticationDialogComponent'
import styles from '../../src/styles/styles'

/**
 * Tests for AuthenticationDialogComponent
 * @author Sébastien binda
 */
describe('[AUTHENTICATION] Testing AuthenticationDialogComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AuthenticationDialogComponent)
  })

  const context = buildTestContext(styles)

  it('Should render properly', () => {
    // quick test: just checking if render is done without error
    shallow(<AuthenticationDialogComponent open><div /></AuthenticationDialogComponent>, { context })
  })
})
