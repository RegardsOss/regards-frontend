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
import { PluginConfigurationContent } from '../rs-common/Plugin/PluginConfiguration'
import { DatasetContent } from '../rs-dam/Dataset'

export const SearchEngineConfigurationContent = PropTypes.shape({
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  configuration: PluginConfigurationContent.isRequired,
  datasetUrn: PropTypes.string,
  dataset: DatasetContent,
})

export const SearchEngineConfiguration = PropTypes.shape({
  content: SearchEngineConfigurationContent.isRequired,
})
export const SearchEngineConfigurationList = PropTypes.objectOf(SearchEngineConfiguration)
