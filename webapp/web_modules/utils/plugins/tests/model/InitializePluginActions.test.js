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
import initializePluginActions, { InitializePluginActions } from '../../src/model/InitializePluginActions'

/**
 * Test InitializePluginActions
 * @author Raphaël Mechali
 */
describe('[PLUGINS] Testing InitializePluginActions', () => {
  it('should exists', () => {
    assert.isDefined(initializePluginActions)
  })
  it('should return markInitialized action', () => {
    assert.deepEqual(InitializePluginActions.markInitialized('A'), {
      type: InitializePluginActions.MARK_INITIALIZED,
      pluginInstanceId: 'A',
    })
  })
  it('should return marUnloaded action', () => {
    assert.deepEqual(InitializePluginActions.markUnloaded('B'), {
      type: InitializePluginActions.MARK_UNLOADED,
      pluginInstanceId: 'B',
    })
  })
})
