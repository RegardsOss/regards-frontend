/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

export class EditionHelper {
  static getDatasourcePluginType(datasource) {
    let type = ''
    if (datasource.content.pluginClassName === DATASOURCE_PLUGIN_TYPE_ENUM.AIP) {
      type = 'aip'
    } else if (datasource.content.pluginClassName === DATASOURCE_PLUGIN_TYPE_ENUM.OPENSEARCH) {
      type = 'opensearch'
    } else if (datasource.content.interfaceNames.includes(DATASOURCE_PLUGIN_TYPE_ENUM.DB)) {
      type = 'db'
    } else {
      throw new Error('Datasource Plugin type not recognized :', datasource.content.pluginClassName)
    }

    return type
  }
}

export default EditionHelper
