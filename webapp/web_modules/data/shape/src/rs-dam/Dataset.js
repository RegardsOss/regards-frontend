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
import { PluginConfigurationContent } from '../rs-common/Plugin/PluginConfiguration'
import { ModelContent } from './Model'

const DatasetContent = PropTypes.shape({
  id: PropTypes.number,
  ipId: PropTypes.string,
  creationDate: PropTypes.string,
  lastUpdate: PropTypes.string,
  label: PropTypes.string.isRequired,
  subsetting: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  model: ModelContent.isRequired,
  dataModel: PropTypes.number.isRequired,
  plgConfDataSource: PluginConfigurationContent,
  descriptionFile: PropTypes.shape({
    url: PropTypes.string,
    type: PropTypes.string,
  }),
  properties: PropTypes.any,
  quotations: PropTypes.any,
  groups: PropTypes.any,
  score: PropTypes.number,
  entityType: PropTypes.string,
})

const Dataset = PropTypes.shape({
  content: DatasetContent.isRequired,
})

const DatasetList = PropTypes.objectOf(Dataset)


module.exports = {
  Dataset,
  DatasetContent,
  DatasetList,
}
