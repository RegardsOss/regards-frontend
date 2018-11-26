/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import PluginStateActions from '../../src/model/PluginStateActions'

/**
 * Test PluginStateActions
 * @author Raphaël Mechali
 */
describe('[PLUGINS] Testing PluginStateActions', () => {
  it('should exists', () => {
    assert.isDefined(PluginStateActions)
  })
  it('should return publish all states action', () => {
    const actions = new PluginStateActions('TEST')
    assert.deepEqual(actions.publishAllStates({
      p1: { state: { a: 'a', b: 'b' }, query: 'query1' },
      p2: { state: { c: 'c', d: 'd' }, query: 'query2' },
    }), {
      type: actions.PUBLISH_ALL_STATES,
      pluginsStates: {
        p1: { state: { a: 'a', b: 'b' }, query: 'query1' },
        p2: { state: { c: 'c', d: 'd' }, query: 'query2' },
      },
    })
  })
  it('should return publish state action', () => {
    const actions = new PluginStateActions('TEST')
    assert.deepEqual(actions.publishState('IDX', { a: 'a', b: 'b' }, 'idkawsyc'), {
      type: actions.PUBLISH_STATE,
      pluginInstanceId: 'IDX',
      state: { a: 'a', b: 'b' },
      query: 'idkawsyc',
    })
  })
  it('should return clearAll action', () => {
    const actions = new PluginStateActions('TEST2')
    assert.deepEqual(actions.clearAllStates(), {
      type: actions.CLEAR_ALL,
    })
  })
})
