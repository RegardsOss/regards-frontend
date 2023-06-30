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
import { Schema, arrayOf } from 'normalizr'
import { PLUGIN_PARAMETER_ARRAY } from './PluginParameter'

export const AdminPluginConfigurationSchemaConfiguration = {
  entityKey: 'businessId',
  normalizrKey: 'pluginConfiguration',
}

// Read more about Normalizr: https://github.com/paularmstrong/normalizr
export const PLUGIN_CONFIGURATION = new Schema(AdminPluginConfigurationSchemaConfiguration.normalizrKey, {
  idAttribute: (entity) => entity.content[AdminPluginConfigurationSchemaConfiguration.entityKey],
})
// Specify relationships between different entities
PLUGIN_CONFIGURATION.define({
  parameters: PLUGIN_PARAMETER_ARRAY,
})
export const PLUGIN_CONFIGURATION_ARRAY = arrayOf(PLUGIN_CONFIGURATION)
