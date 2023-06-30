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
import get from 'lodash/get'
import map from 'lodash/map'
import isBoolean from 'lodash/isBoolean'
import isDate from 'lodash/isDate'
import isNumber from 'lodash/isNumber'
import isNil from 'lodash/isNil'
import reduce from 'lodash/reduce'
import { UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM } from '@regardsoss/domain/access'
import { ValidationHelpers } from '@regardsoss/form-utils'
import { Parameter } from './parameters/Parameter'

/**
* Tools to convert an UI plugin service configuration into common form parameter models
* @author Raphaël Mechali
*/

/**
 * Resolves parameter
 * @param parameterKey parameter key
 * @param adminValue admin set value for dynamic parameter, if any
 * @param parameter parameter model from plugin instance plugin-info conf
 */
export function resolveParameter(parameterKey, value, { label, type = UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.STRING, required = false }) {
  switch (type) {
    case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.BOOL:
      return Parameter.buildBooleanEditor(parameterKey, value, required, label)
    case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.CHAR:
      return Parameter.buildTextEditor(parameterKey, value, ValidationHelpers.characterValidator, required, label)
    case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.DATE:
      return Parameter.buildDateEditor(parameterKey, value, required, label)
    case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.FLOAT:
      return Parameter.buildTextEditor(parameterKey, value, ValidationHelpers.javaDoubleValidator, required, label)
    case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.INT:
      return Parameter.buildTextEditor(parameterKey, value, ValidationHelpers.javaLongValidator, required, label)
    case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.STRING:
      return Parameter.buildTextEditor(parameterKey, value, null, required, label)
    default:
      throw new Error('Unknown parameter type', type)
  }
}

/**
 * Resolves UI plugin configuration to common parameters model fconvertParameter(configParam, metaParamor edition
 * @param uiPluginConf UI plugin configuration with shape UIPluginConf
 * @param uiPluginInstance corresponding UI plugin instance with shape UIPluginInstanceContent
 * @return {Array<Parameter>} resolved array or empty array. Note: it removes non dynamic parameters
 */
export function resolveParameters(uiPluginConf, pluginInstance) {
  const dynamicParameters = get(pluginInstance, 'info.conf.dynamic', {})
  const adminDynamicConfiguration = get(uiPluginConf, 'content.conf.dynamic', {})
  // for each parameter defined in plugin info dynamic configuration, create corresponding parameter model
  // note: We resolve from definition to configuration, to make sure the plugin version that will be used
  // will have all parameters it requires (we ignore the parameters that could have been removed)
  return map(dynamicParameters, (parameter, key) => resolveParameter(key, adminDynamicConfiguration[key], parameter))
}

/**
 * Checks that type corresponds to expected plugin parameter type (that may not be the case due to
 * form conversion / DB storage / serialization....)
 * @param valuesMap runtime configuration map (static or dynamic parameters)
 * @param correspondingInfo corresponding map in plugin info (static or dynamic)
*/
function ensureTypes(valuesMap, correspondingInfo) {
  return reduce(valuesMap, (acc, value, key) => {
    let convertedValue = null
    if (!isNil(value)) {
      switch (correspondingInfo[key].type) {
        case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.BOOL:
          convertedValue = isBoolean(value) ? value : JSON.parse(value)
          break
        case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.DATE:
          convertedValue = isDate(value) ? value : new Date(value)
          break
        case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.INT:
          convertedValue = isNumber(value) ? value : parseInt(value, 10)
          break
        case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.FLOAT:
          convertedValue = isNumber(value) ? value : parseFloat(value)
          break
        case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.CHAR:
        case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.STRING:
        default:
          convertedValue = value
      }
    }
    return {
      [key]: convertedValue,
      ...acc,
    }
  }, {})
}

/**
 * Packs runtime plugin configuration
 * @param {uiPluginConf} uiPluginConf UI plugin configuration with shape UIPluginConf
 * @param {*} configuredDynamicValues corresponding UI plugin instance with shape UIPluginInstanceContent
 * @return {Array<Parameter>} resolved array or empty array. Note: it removes non dynamic parameters
 */
export function packRuntimeConfiguration(uiPluginConf, pluginInstance, configuredDynamicValues) {
  // we use here only the static configuration from admin conf, other parameters have been
  // overriden, either by the user or the values initialization (see resolveParameters)
  const adminStaticConfiguration = get(uiPluginConf, 'content.conf.static', {})
  return {
    static: ensureTypes(adminStaticConfiguration, get(pluginInstance, 'info.conf.static', {})),
    dynamic: ensureTypes(configuredDynamicValues, get(pluginInstance, 'info.conf.dynamic', {})),
  }
}

/**
 * Enhance plugin handlers based on the plugin definition
 * @param {uiPluginConf} pluginInstance UI plugin instance information
 * @param {*} handlers callback function to propagate plugin events
 * @return {Array<Parameter>} handlers and props for plugin react component
 */
export function packPluginProps(pluginInstance, handlers = {}) {
  // Define available expected in the plugin-info.json
  // SHOW_BUTTONS_BAR - when false, delegate the close mecanism to the popup
  const PROPERTY_SHOW_BUTTONS_BAR = 'info.conf.showButtonsBar'
  const DEFAULT_SHOW_BUTTONS_BAR = true

  const pluginProps = {}
  if (!get(pluginInstance, PROPERTY_SHOW_BUTTONS_BAR, DEFAULT_SHOW_BUTTONS_BAR)) {
    pluginProps.onClose = handlers.onClose
  }
  return pluginProps
}
