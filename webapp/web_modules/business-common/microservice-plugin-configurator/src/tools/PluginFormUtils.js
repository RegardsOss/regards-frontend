/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import filter from 'lodash/filter'
import cloneDeep from 'lodash/cloneDeep'
import keys from 'lodash/keys'
import find from 'lodash/find'
import forEach from 'lodash/forEach'
import omit from 'lodash/omit'
import replace from 'lodash/replace'
import isNil from 'lodash/isNil'
import { CommonDomain } from '@regardsoss/domain'

class PluginFormUtils {
  /**
   * Tools created to handle pluginConfiguration formating to handle special caracters '.' as key in Redux Field names.
   * It is possible to have dots in Field names in case of RenderMapField where user choose the key.
   * @author Sébastien Binda
   */
  static DOT_CHAR_REPLACEMENT = '_____'

  static initNewConfiguration(pluginMetaData) {
    return {
      active: true,
      pluginId: pluginMetaData.pluginId,
      pluginClassName: pluginMetaData.pluginClassName,
      version: pluginMetaData.version,
      priorityOrder: 1,
      parameters: [],
    }
  }

  /**
   * Format keys of a PluginParameter type MAP to remove dot caracters
   * @param {*} parameterConf
   * @param {*} parameterMeta
   * @param {*} forInit
   */
  static formatMapParameterKeys(parameterMeta, parameterConf, forInit) {
    const formatedParameterConf = {}
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
   * @param {*} type
   * @param {*} value
   */
  static createComplexParameterConf(name, type, value = undefined) {
    return {
      name,
      type,
      value,
    }
  }

  /**
   * Creates a new parameter configuration object for the given parameterMetadata
   * @param {*} parameterMetadata
   * @param {*} complex only roots parameters are considered as complex
   */
  static createNewParameterConf(parameterMetadata, complex = true) {
    switch (parameterMetadata.type) {
      case CommonDomain.PluginParameterTypes.POJO: {
        if (parameterMetadata.unconfigurable) {
          return {}
        }
        const parameterConf = complex ? PluginFormUtils.createComplexParameterConf(parameterMetadata.name, parameterMetadata.type, {}) : {}
        if (parameterMetadata.parameters.length > 0) {
          forEach(parameterMetadata.parameters, (innerParameterMetadata) => {
            parameterConf.value[innerParameterMetadata.name] = PluginFormUtils.createNewParameterConf(innerParameterMetadata, false)
          })
        }
        return parameterConf
      }
      case CommonDomain.PluginParameterTypes.STRING:
      case CommonDomain.PluginParameterTypes.BYTE:
      case CommonDomain.PluginParameterTypes.SHORT:
      case CommonDomain.PluginParameterTypes.INTEGER:
      case CommonDomain.PluginParameterTypes.LONG:
      case CommonDomain.PluginParameterTypes.FLOAT:
      case CommonDomain.PluginParameterTypes.DOUBLE:
      case CommonDomain.PluginParameterTypes.BOOLEAN: {
        if (parameterMetadata.unconfigurable) {
          return ''
        }
        let defaultValue = ''
        if (parameterMetadata.type === CommonDomain.PluginParameterTypes.BOOLEAN) {
          defaultValue = parameterMetadata.defaultValue === 'true'
        }
        return complex ? PluginFormUtils.createComplexParameterConf(parameterMetadata.name, parameterMetadata.type, defaultValue) : undefined
      }
      case CommonDomain.PluginParameterTypes.COLLECTION:
        return parameterMetadata.unconfigurable || !complex ? [] : PluginFormUtils.createComplexParameterConf(parameterMetadata.name, parameterMetadata.type, [])
      case CommonDomain.PluginParameterTypes.PLUGIN:
      case CommonDomain.PluginParameterTypes.MAP:
        if (parameterMetadata.unconfigurable) {
          return {}
        }
        return parameterMetadata.unconfigurable || !complex ? {} : PluginFormUtils.createComplexParameterConf(parameterMetadata.name, parameterMetadata.type, {})
      default:
        throw new Error('Unexpected type of parameter')
    }
  }

  /**
   * Format a PluginParameter configuration
   * @param {*} parameterConfValue
   * @param {*} parameterMeta
   * @param {*} forInit
   */
  static formatParameterConf(parameterConfValue, parameterMetaData, forInit) {
    if (parameterMetaData.unconfigurable) {
      return undefined
    }
    let formatedConf = !isNil(parameterConfValue) ? parameterConfValue : undefined
    // If the parameter to format is a MAP parameter format keys
    if (parameterMetaData.type === CommonDomain.PluginParameterTypes.MAP) {
      formatedConf = PluginFormUtils.formatMapParameterKeys(parameterMetaData, parameterConfValue, forInit)
    }

    // check for other parameters.
    // If the parameter is a parameterized one, then the parameters are the parameters of the subParameter (parameterized)
    if (!parameterMetaData.parameterizedSubTypes) {
      forEach(parameterMetaData.parameters, (p) => {
        formatedConf[p.name] = PluginFormUtils.formatParameterConf(
          parameterConfValue && !isNil(parameterConfValue[p.name]) ? parameterConfValue[p.name] : undefined,
          p,
          forInit,
        )
      })
    }
    return formatedConf
  }

  static formatPluginParameterConf(parameterConf, parameterMetaData, forInit = false) {
    if (!parameterMetaData) {
      // Only remove null values from parameters
      return isNil(parameterConf.value) && !parameterConf.dynamic ? null : parameterConf
    }
    if (parameterMetaData.unconfigurable) {
      return null
    }
    if (parameterConf && ((!isNil(parameterConf.value) && parameterConf.value !== parameterMetaData.defaultValue) || parameterConf.dynamic)) {
      // For both initialization && submition, if a value is specified set the parameterConf with the given value or if not, set with default value
      const formatedParamterConf = cloneDeep(parameterConf)
      formatedParamterConf.value = PluginFormUtils.formatParameterConf(parameterConf.value, parameterMetaData, forInit)
      return formatedParamterConf
    } if (parameterConf && !isNil(parameterConf.pluginConfiguration)) {
      // Handle plugin values
      const formatedParamterConf = cloneDeep(parameterConf)
      formatedParamterConf.value = parameterConf.pluginConfiguration.id
      return formatedParamterConf
    } if (forInit) {
      // For initialization, we need to create all parameters in configuration
      return PluginFormUtils.createNewParameterConf(parameterMetaData)
    }
    // For submition, no need to add missing parameters in the conf.
    return null
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
    if (pluginConfiguration) {
      const formatedConf = cloneDeep(omit(pluginConfiguration, ['parameters']))
      let configurableParameters = pluginConfiguration.parameters
      if (pluginMetaData && pluginMetaData.parameters) {
        formatedConf.parameters = []
        configurableParameters = filter(pluginConfiguration.parameters, (p) => find(pluginMetaData.parameters, { unconfigurable: false }))
        formatedConf.parameters = PluginFormUtils.formatPluginConfParameters(configurableParameters, pluginMetaData, forInit)
      } else {
        formatedConf.parameters = PluginFormUtils.formatPluginConfParameters(configurableParameters, null, forInit)
      }

      return formatedConf
    }
    return pluginConfiguration
  }

  static formatPluginConfParameters(parameters, pluginMetaData, forInit) {
    const parametersWithoutEmpty = []
    forEach(parameters, (p) => {
      const parameterMetaData = pluginMetaData ? find(pluginMetaData.parameters, { name: p.name }) : null
      const formatedParameter = PluginFormUtils.formatPluginParameterConf(p, parameterMetaData, forInit)
      if (formatedParameter !== null) {
        if (forInit || (formatedParameter.dynamic || (formatedParameter.value !== null && formatedParameter.value.length !== 0))) {
          parametersWithoutEmpty.push(formatedParameter)
        }
      }
    })
    return parametersWithoutEmpty
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
