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
import { DATASOURCE_PLUGIN_TYPE_ENUM } from '@regardsoss/domain/dam'

/** Available database related datasources plugins */
const DB_DATASOURCE_PUGINS = [
  DATASOURCE_PLUGIN_TYPE_ENUM.DB_ORACLE,
  DATASOURCE_PLUGIN_TYPE_ENUM.DB_POSTGRES,
  DATASOURCE_PLUGIN_TYPE_ENUM.DB_POSTGRES_SINGLE_TABLE,
]

export class EditionHelper {
  static getDatasourcePluginType(datasource) {
    let type = ''
    if (datasource.content.pluginId === DATASOURCE_PLUGIN_TYPE_ENUM.AIP) {
      type = 'aip'
    } else if (datasource.content.pluginId === DATASOURCE_PLUGIN_TYPE_ENUM.FEATURE) {
      type = 'feature'
    } else if (datasource.content.pluginId === DATASOURCE_PLUGIN_TYPE_ENUM.OPENSEARCH) {
      type = 'opensearch'
    } else if (DB_DATASOURCE_PUGINS.includes(datasource.content.pluginId)) {
      type = 'db'
    } else {
      throw new Error('Datasource Plugin type not recognized :', datasource.content.pluginId)
    }

    return type
  }
}

export default EditionHelper
