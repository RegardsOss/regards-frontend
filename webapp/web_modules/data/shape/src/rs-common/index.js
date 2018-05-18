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

import PluginParameterContent from './Plugin/PluginParameter'
import { PluginMetaDataContent, PluginMetaData, PluginMetaDataList, PluginMetaDataArray } from './Plugin/PluginMetaData'
import { PluginConfiguration, PluginConfigurationContent, PluginConfigurationList, PluginConfigurationArray } from './Plugin/PluginConfiguration'
import PluginParameterType from './Plugin/PluginParameterType'

import getChainableTypeChecker from './ChainableTypeChecker'
import Percent from './Percent'
import URL from './URL'
import RangedNumber from './RangedNumber'
import LocationShape from './LocationShape'

module.exports = {
  PluginParameterContent,
  PluginMetaDataContent,
  PluginMetaData,
  PluginMetaDataList,
  PluginMetaDataArray,
  PluginConfiguration,
  PluginConfigurationContent,
  PluginConfigurationList,
  PluginConfigurationArray,

  PluginParameterType,

  // Common
  getChainableTypeChecker,

  URL,

  RangedNumber,
  Percent,
  LocationShape,
}
