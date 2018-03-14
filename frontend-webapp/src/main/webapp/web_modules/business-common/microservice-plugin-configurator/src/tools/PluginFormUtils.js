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
import omit from 'lodash/omit'
import replace from 'lodash/replace'
import { CommonDomain } from '@regardsoss/domain'


class PluginFormUtils {
  /**
   * Tools created to handle pluginConfiguration formating to handle special caracters '.' as key in Redux Field names.
   * It is possible to have dots in Field names in case of RenderMapField where user choose the key.
   * @author Sébastien Binda
   */
  static DOT_CHAR_REPLACEMENT = '_____'

  /**
   * Format keys of a PluginParameter type MAP to remove dot caracters
   * @param {*} parameterConf
   * @param {*} parameterMeta
   * @param {*} forInit
   */
  static formatMapParameterKeys(parameterMeta, parameterConf, forInit) {
    const formatedParameterConf = Object.assign({})
    forEach(keys(parameterConf), (key) => {
      if (!forInit && key.includes(PluginFormUtils.DOT_CHAR_REPLACEMENT)) {
        formatedParameterConf[replace(key, new RegExp(PluginFormUtils.DOT_CHAR_REPLACEMENT, 'g'), '.')] = parameterConf[key]
      } else if (forInit && key.includes('.')) {
        formatedParameterConf[replace(key, new RegExp('\\.', 'g'), PluginFormUtils.DOT_CHAR_REPLACEMENT)] = parameterConf[key]
      } else {
        formatedParameterConf[key] = parameterConf[key]
      }
    })
    return formatedParameterConf
  }

  /**
   * Build a complex plugin parameter structure
   * @param {*} name
   * @param {*} value
   * @param {*} dynamic
   * @param {*} dynamicsValues
   */
  static createComplexParameterConf(name, value = undefined, dynamic = false, dynamicsValues = []) {
    return {
      dynamic,
      dynamicsValues,
      name,
      value,
    }
  }

  /**
   * Creates a new parameter configuration object for the given parameterMetadata
   * @param {*} parameterMetadata
   * @param {*} complex
   */
  static createNewParameterConf(parameterMetadata, complex = true) {
    const parameterConf = complex ? PluginFormUtils.createComplexParameterConf(parameterMetadata.name) : {}
    if (parameterMetadata.parameters) {
      forEach(parameterMetadata.parameters, (innerParameterMetadata) => {
        parameterConf.value = PluginFormUtils.createNewParameterConf(innerParameterMetadata, false)
      })
    }
    return parameterConf
  }

  /**
   * Format a PluginParameter configuration
   * @param {*} parameterConfValue
   * @param {*} parameterMeta
   * @param {*} forInit
   */
  static formatParameterConf(parameterConfValue, parameterMeta, forInit) {
    let formatedConf = parameterConfValue || undefined
    // If the parameter to format is a MAP parameter format keys
    if (parameterMeta.paramType === CommonDomain.PluginParameterTypes.MAP) {
      formatedConf = PluginFormUtils.formatMapParameterKeys(parameterMeta, parameterConfValue, forInit)
    }

    // check for other parameters.
    // If the parameter is a parameterized one, then the parameters are the parameters of the subParameter (parameterized)
    if (!parameterMeta.parameterizedSubTypes) {
      forEach(parameterMeta.parameters, (p) => {
        formatedConf[p.name] = PluginFormUtils.formatParameterConf(
          parameterConfValue && parameterConfValue[p.name] ? parameterConfValue[p.name] : undefined,
          p,
          forInit,
        )
      })
    }
    return formatedConf
  }

  /**
   * Format a PluginConfiguration for initialisation or for submition.
   * Initialization mode : If forInit parameter is true, missing parameters in configuration are initialized.
   * Submition mode : If forInit parameter is false, only parameter with value defined are returned
   * @param {*} pluginConfiguration
   * @param {*} pluginMetaData
   * @param {*} forInit
   */
  static formatPluginConf(pluginConfiguration, pluginMetaData, forInit = false) {
    const formatedConf = cloneDeep(omit(pluginConfiguration, ['parameters']))
    if (pluginMetaData.parameters) {
      formatedConf.parameters = []
      forEach(pluginMetaData.parameters, (p) => {
        const parameterConf = find(pluginConfiguration.parameters, { name: p.name })
        if (parameterConf && (parameterConf.value || parameterConf.dynamic === true)) {
          // For both initialization && submition, if a value is specified set the parameterConf with the given value
          const param = cloneDeep(parameterConf)
          param.value = PluginFormUtils.formatParameterConf(parameterConf.value, p, forInit)
          formatedConf.parameters.push(param)
        } else if (forInit) {
          // For initialization, we need to create all parameters in configuration
          formatedConf.parameters.push(PluginFormUtils.createNewParameterConf(p))
        } else {
          // For submition, no need to add missing parameters in the conf.
        }
      })
    }
    return formatedConf
  }

  /**
   * Format a PluginConfigration before Redux form initilialization
   * @param {*} pluginConfiguration
   * @param {*} pluginMetaData
   */
  static formatPluginConfForReduxFormInit(pluginConfiguration, pluginMetaData) {
    return PluginFormUtils.formatPluginConf(pluginConfiguration, pluginMetaData, true)
  }
  /**
   * Format a PluginConfiguration before Redux form submit
   * @param {*} pluginConfiguration
   * @param {*} pluginMetaData
   */
  static formatPluginConfForReduxFormSubmit(pluginConfiguration, pluginMetaData) {
    return PluginFormUtils.formatPluginConf(pluginConfiguration, pluginMetaData, false)
  }
}

export default PluginFormUtils
