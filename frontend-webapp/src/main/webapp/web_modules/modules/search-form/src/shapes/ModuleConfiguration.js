/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessShapes } from '@regardsoss/shape'
import DatasetsConfShape from './DatasetsConfShape'
/**
 * Form entity description
 * @author Sébastien binda
 */
const ModuleConfiguration = PropTypes.shape({
  conf: PropTypes.shape({
    // Search form datasets configuration
    datasets: DatasetsConfShape,
    // Search form Layout configuration
    layout: AccessShapes.ContainerContent,
    // Search form criterion configuration
    criterion: PropTypes.arrayOf(PropTypes.shape({
      pluginId: PropTypes.number.isRequired,
      container: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
      // conf.attributes holds, by plugin attribute name, the attribute ID OR key (for standard attributes)
      conf: PropTypes.shape({
        attributes: PropTypes.objectOf(PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ])).isRequired,
      }).isRequired,
    })),
    // Does search form render for preview or for full use
    preview: PropTypes.bool,

    // Save a search-result configuration
    searchResult: PropTypes.object,
  }),
})

export default ModuleConfiguration
