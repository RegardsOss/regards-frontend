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
import values from 'lodash/values'
import { CatalogDomain } from '@regardsoss/domain'
import { DataManagementShapes, AccessShapes } from '@regardsoss/shape'
import { DISPLAY_MODE_VALUES } from '../definitions/DisplayModeEnum'
import DisplayModuleConf from './DisplayModuleConf'

/**
 * Form entity description
 * @author Sébastien binda
 */
const Form = PropTypes.shape({
  // Search form attributes configuration
  attributes: AccessShapes.AttributeConfigurationArray,
  // Search form attributes regroupements configuration
  attributesRegroupements: AccessShapes.AttributesGroupConfigurationArray,
  // Search results dataset attributes configuration
  datasetAttributes: AccessShapes.AttributeConfigurationArray,
  // Search results documents attributes configuration
  documentAttributes: AccessShapes.AttributeConfigurationArray,
  // Special configuration given if the module is not load as a independent module
  selectableAttributes: DataManagementShapes.AttributeModelList,

  // Initial context tags (will be automatically added to breadcumb, the first tag cannot be removed)
  initialContextTags: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(values(CatalogDomain.TagTypes)).isRequired,
    label: PropTypes.string.isRequired,
    searchKey: PropTypes.string.isRequired,
  })),

  // Initial search query
  searchQuery: PropTypes.string,

  // should enable facettes?
  enableFacettes: PropTypes.bool,
  // Display mode
  displayMode: PropTypes.oneOf(DISPLAY_MODE_VALUES),

  displayConf: DisplayModuleConf,
})

export default Form
