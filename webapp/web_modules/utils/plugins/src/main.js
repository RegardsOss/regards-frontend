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

/**
 * Main interface to expose plugins utils
 * @author Sébastien Binda
 */
export { default as PluginProvider } from './containers/PluginProvider'
export { default as PluginLoader } from './containers/PluginLoader'
export {
  loadPlugin, savePluginLoaded, PLUGIN_LOADED, CHECK_PLUGIN, PLUGIN_ERROR,
} from './model/LoadPluginActions'
export { AttributeModelWithBounds } from './shapes/AttributeModelWithBounds'
export { CriterionConfiguration } from './shapes/CriterionConfiguration'
export { CriterionProperties } from './shapes/CriterionProperties'
export { default as pluginReducerHelper } from './helpers/PluginReducerHelper'
export { default as PluginReducer } from './reducer'
