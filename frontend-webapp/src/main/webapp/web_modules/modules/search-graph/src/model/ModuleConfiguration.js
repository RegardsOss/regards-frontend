/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AttributeConfiguration, AttributesRegroupementConfiguration } from '@regardsoss/model'
/**
 * form configuration
 */
const ModuleConfiguration = PropTypes.shape({
  // name of collection model, ordered by level for graph navigation
  graphLevels: PropTypes.arrayOf(PropTypes.string),
  // array of attributes to display on datasets in graph
  graphDatasetAttributes: PropTypes.arrayOf(AttributeConfiguration),
  // [Result form module] Default Target of results
  resultType: PropTypes.string,
  // [Result form module] Search form attributes configuration
  attributes: PropTypes.arrayOf(AttributeConfiguration),
  // [Result form module] Search form attributes regroupements configuration
  attributesRegroupements: PropTypes.arrayOf(AttributesRegroupementConfiguration),
  // [Result form module] should enable facettes?
  enableFacettes: PropTypes.bool,
})

export default ModuleConfiguration
