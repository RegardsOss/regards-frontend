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
import some from 'lodash/some'
import find from 'lodash/find'
import get from 'lodash/get'
import { IDBDatasourceParamsEnum } from '@regardsoss/domain/dam'
import { PluginConfParamsUtils } from '@regardsoss/domain/common'

const { findParam } = PluginConfParamsUtils

export class DBDatasourceHelpers {
  /**
   * Returns
   * - false if we are not editing a datasource
   * - false if the AttributeMapping.nameDS match a TableAttribute name
   * - true otherwise, which means that AttributeMapping.nameDS is a query SQL and not a TableAttribute name
   * @param modelAttributeName
   * @returns {boolean}
   */
  static getIsEditingSQL(modelAttributeName, currentDatasource, tableAttributeList, isEditing) {
    if (isEditing) {
      const attributesMapping = get(findParam(currentDatasource, IDBDatasourceParamsEnum.MAPPING), 'value', [])
      const currentAttributeMapping = find(attributesMapping, (attributeMapping) => attributeMapping.name === modelAttributeName)
      if (currentAttributeMapping) {
        return !some(tableAttributeList, (tableAttribute) => currentAttributeMapping.nameDS === tableAttribute.name)
      }
    }
    return false
  }
}

export default DBDatasourceHelpers
