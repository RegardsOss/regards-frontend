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
import { AttributeModel, AttributeConfiguration, AttributesRegroupementConfiguration } from '@regardsoss/model'
/**
 * Form entity description
 * @author Sébastien binda
 */
const Form = PropTypes.shape({
  // Default Target of results
  resultType: PropTypes.string,
  // Search form attributes configuration
  attributes: PropTypes.arrayOf(AttributeConfiguration),
  // Search form attributes regroupements configuration
  attributesRegroupements: PropTypes.arrayOf(AttributesRegroupementConfiguration),
  // Search results dataset attributes configuration
  datasetAttributes: PropTypes.arrayOf(AttributeConfiguration),
  // Special configuration given if the module is not load as a independent module
  selectableAttributes: PropTypes.objectOf(AttributeModel),
  // should enable facettes?
  enableFacettes: PropTypes.bool,
  // For modules using the single dataset capacity (hide the datasets configuration in admin)
  hideDatasetsConfiguration: PropTypes.bool,
  // display datasets?
  displayDatasets: PropTypes.bool,
  // Initial single dataset ipId
  singleDatasetIpId: PropTypes.string,
  // Initial search query
  searchQuery: PropTypes.string,
  // Fixed breadcrumb depending on search current context.
  breadcrumbInitialContextLabel: PropTypes.string,
})

export default Form
