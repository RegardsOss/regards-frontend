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
import cloneDeep from 'lodash/cloneDeep'
import keys from 'lodash/keys'
import find from 'lodash/find'
import forEach from 'lodash/forEach'
import replace from 'lodash/replace'
import { CommonDomain } from '@regardsoss/domain'

/**
 * Tools created to handle pluginConfiguration formating to handle special caracters '.' as key in Redux Field names.
 * It is possible to have dots in Field names in case of RenderMapField where user choose the key.
 * @author Sébastien Binda
 */
const DOT_CHAR_REPLACEMENT = '_____'

/**
 * Format keys of a PluginParameter type MAP to remove dot caracters
 * @param {*} parameterConf
 * @param {*} parameterMeta
 * @param {*} forInit
 */
const formMapParameterKeys = (parameterMeta, parameterConf, forInit) => {
  const newParameterConf = {}
  forEach(keys(parameterConf), (key) => {
    if (!forInit && key.includes(DOT_CHAR_REPLACEMENT)) {
      newParameterConf[replace(key, new RegExp(DOT_CHAR_REPLACEMENT, 'g'), '.')] = parameterConf[key]
    } else if (forInit && key.includes('.')) {
      newParameterConf[replace(key, new RegExp('\\.', 'g'), DOT_CHAR_REPLACEMENT)] = parameterConf[key]
    } else {
      newParameterConf[key] = parameterConf[key]
    }
  })
  return newParameterConf
}

/**
 * Format a PluginParameter configuration
 * @param {*} parameterConfValue
 * @param {*} parameterMeta
 * @param {*} forInit
 */
const formatParameterConf = (parameterConfValue, parameterMeta, forInit) => {
  let formatedConf = parameterConfValue
  // If the parameter to format is a MAP parameter format keys
  if (parameterMeta.paramType === CommonDomain.PluginParameterTypes.MAP) {
    formatedConf = formMapParameterKeys(parameterMeta, parameterConfValue, forInit)
  }
  // check for other parameters
  forEach(parameterMeta.parameters, (p) => {
    if (formatedConf[p.name]) {
      formatedConf[p.name] = formatParameterConf(formatedConf[p.name], p, forInit)
    }
  })
  return formatedConf
}

/**
 * Format a PluginConfiguration
 * @param {*} pluginConfiguration
 * @param {*} pluginMetaData
 * @param {*} forInit
 */
const formatPluginConf = (pluginConfiguration, pluginMetaData, forInit = false) => {
  const formatedConf = cloneDeep(pluginConfiguration)
  forEach(pluginMetaData.parameters, (p) => {
    const parameterConf = find(formatedConf.parameters, { name: p.name })
    // First level, complex parameters with value
    if (parameterConf && parameterConf.value) {
      parameterConf.value = formatParameterConf(parameterConf.value, p, forInit)
      console.error('param initialized', parameterConf)
    }
  })
  return formatedConf
}

/**
 * Format a PluginConfigration before Redux form initilialization
 * @param {*} pluginConfiguration
 * @param {*} pluginMetaData
 */
const formatPluginConfForReduxFormInit = (pluginConfiguration, pluginMetaData) => formatPluginConf(pluginConfiguration, pluginMetaData, true)
/**
 * Format a PluginConfiguration before Redux form submit
 * @param {*} pluginConfiguration
 * @param {*} pluginMetaData
 */
const formatPluginConfForReduxFormSubmit = (pluginConfiguration, pluginMetaData) => formatPluginConf(pluginConfiguration, pluginMetaData, false)

module.exports = {
  formatPluginConfForReduxFormInit,
  formatPluginConfForReduxFormSubmit,
  DOT_CHAR_REPLACEMENT,
}
