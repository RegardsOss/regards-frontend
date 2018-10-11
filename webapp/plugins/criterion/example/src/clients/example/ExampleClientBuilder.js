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
import ExampleActions from './ExampleActions'
import getExampleReducer from './ExampleReducer'
import getExampleSelectors from './ExampleSelectors'

/**
 * The client in REGARDS OSS holds usually an instance of actions, selectors and reducer that can be imported everywhere in module.
 * However, as this code is part of a plugin, it is here a builder that takes the plugin ID to build client.
 * Through that mechanism, it is possible to create multiple instances of the same plugin type while avoiding
 * their actions / reducer conflicts (since redux store in an application singleton)
 */
export default function buildExampleClient(pluginInstanceId) {
  const namespace = `example-criteria/todo-example/${pluginInstanceId}` // namespace, unique by pluginInstanceId
  const actions = new ExampleActions(namespace)
  const reducer = getExampleReducer(namespace)
  const selectors = getExampleSelectors([
    `plugins.example-criterion.${pluginInstanceId}`, // always built like 'plugins.[plugin-name].[instance id]'
    'todoClient', // registered by the plugin, see reducer.js file
  ])
  return {
    actions,
    reducer,
    selectors,
  }
}
