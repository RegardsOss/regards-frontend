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
import { PluginConf, AttributeConfiguration, AttributesRegroupementConfiguration, Container } from '@regardsoss/model'
import DatasetsConfShape from './datasets/DatasetsConfShape'
/**
 * Form entity description
 * @author Sébastien binda
 */
const ModuleConfiguration = PropTypes.shape({
  conf: PropTypes.shape({
    // Search form datasets configuration
    datasets: DatasetsConfShape,
    // Search form Layout configuration
    layout: Container,
    // Search form criterion configuration
    criterion: PropTypes.arrayOf(PluginConf),
    // Search form resultType configuration
    resultType: PropTypes.string,
    // Search form attributes configuration
    attributes: PropTypes.arrayOf(AttributeConfiguration),
    // Search form attributes regroupements configuration
    attributesRegroupements: PropTypes.arrayOf(AttributesRegroupementConfiguration),
    // Search results dataset attributes configuration
    datasetAttributes: PropTypes.arrayOf(AttributeConfiguration),
    // Does search form render for preview or for full use
    preview: PropTypes.bool,
    // should enable facettes?
    enableFacettes: PropTypes.bool,
  }),
})

export default ModuleConfiguration
