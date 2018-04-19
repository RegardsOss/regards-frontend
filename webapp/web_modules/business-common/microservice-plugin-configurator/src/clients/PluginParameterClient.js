/*
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
 */
import { CommonClient } from '@regardsoss/client'

/**
 * Plugin configuration entities client.
 *
 * @author Sébastien Binda
 */
const REDUX_ACTION_CONF_NAMESPACE = 'common/plugin-parameter/pluginConfiguration'
const REDUX_ACTION_META_NAMESPACE = 'common/plugin-parameter/pluginMetadata'

const pluginParameterConfigurationActions = new CommonClient.PluginConfigurationActions(REDUX_ACTION_CONF_NAMESPACE)
const pluginParameterMetaDataActions = new CommonClient.PluginMetaDataActions(REDUX_ACTION_META_NAMESPACE)

module.exports = {
  pluginParameterConfigurationActions,
  pluginParameterMetaDataActions,
}