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
import SesameActions from './SesameActions'
import getSesameReducer from './SesameReducer'
import SesameSelectors from './SesameSelectors'

/**
 * Sesame API redux client builder to fetch and consume the spatial name resolution required
 * by this plugin. Note: plugin reducer and actions are  dynamically built on the instance ID
 * to ensure each plugin has its own separated redux store space
 * @param {string} pluginInstanceId plugin instance ID
 * @return {actions, reduder, selectors} client
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
export default function getSesameClient(pluginInstanceId) {
  // note: namespace requires to be unique among instances to avoid reduction conflicts
  const namespace = `SNR-CRITERION/${pluginInstanceId}`
  const actions = new SesameActions(namespace)
  const reducer = getSesameReducer(namespace)
  // Note: store path for plugin is always: plugins.{pluginName}.{pluginInstanceId} / {reducerField}
  const selectors = new SesameSelectors([`plugins.SNR-criterion.${pluginInstanceId}`, 'sesame'])
  return {
    actions,
    reducer,
    selectors,
  }
}
