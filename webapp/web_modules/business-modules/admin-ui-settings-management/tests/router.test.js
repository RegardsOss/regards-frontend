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
import { assert, expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import Routes from '../src/router'
import EditSettingsContainer from '../src/containers/EditSettingsContainer'

/**
 *
 */
describe('[ADMIN UI SETTINGS MANAGEMENT] Testing user board router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    assert.lengthOf(Routes.childRoutes, 1)
    assert.equal(Routes.childRoutes[0].path, 'edit')
  })
  it('settings should return edit settings container', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(EditSettingsContainer)
      done()
    })
  })
})
