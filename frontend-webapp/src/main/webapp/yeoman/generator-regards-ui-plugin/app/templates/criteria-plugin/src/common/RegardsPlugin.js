/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Init the regards plugin in the application.
 * The plugin is added to the application store to be used by the application.
 *
 * @param pluginClass The main Plugin React Component
 * @param reducer The Redux-reducers or null if no one is defined
 * @param messages Object where key is the language and value is the list of messages used by the plugin
 * @param pluginInfo The plugin-info.json of the plugin. File containing plugin definition and configuration informations
 *
 * Usage :
 * From your main javascript file :
 * initPlugin(PluginComponent, pluginReducers, messages, pluginInfo)
 *
 * @author Sébastien Binda
 */
const initPlugin = (pluginClass, reducer, messages, pluginInfo) => {
  const event = new CustomEvent('plugin', {
    detail: {
      sourcePath: document.currentScript.src,
      plugin: pluginClass,
      messages,
      reducer,
      info: pluginInfo,
    },
  })
  document.dispatchEvent(event)
}

export { initPlugin }
