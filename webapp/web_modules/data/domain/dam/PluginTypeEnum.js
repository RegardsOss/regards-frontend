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
import values from 'lodash/values'

/**
 * @author Sébastien Binda
 */
export const PluginTypeEnum = {
  CONNECTION: 'fr.cnes.regards.modules.dam.domain.datasources.plugins.IConnectionPlugin',
  DB_CONNECTION: 'fr.cnes.regards.modules.dam.domain.datasources.plugins.IDBConnectionPlugin',
  COMPUTED_ATTR: 'fr.cnes.regards.modules.model.domain.IComputedAttribute',
  DATASOURCE: 'fr.cnes.regards.modules.dam.domain.datasources.plugins.IDataSourcePlugin',
  DB_DATASOURCE: 'fr.cnes.regards.modules.dam.domain.datasources.plugins.IDBDataSourcePlugin',
  AIP_DATASOURCE: 'fr.cnes.regards.modules.dam.domain.datasources.plugins.IAipDataSourcePlugin',
  DATA_OBJECT_ACCESS_FILTER: 'fr.cnes.regards.modules.dam.domain.dataaccess.accessright.plugins.IDataObjectAccessFilterPlugin',
}

export const PluginTypeEnumValues = values(PluginTypeEnum)
