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
import { DataManagementShapes } from '@regardsoss/shape'

/**
 * Search results admin conf (adminForm.conf)
 * Used by other modules that depends on search-results
 * @author Léo Mieulet
 */
const AdminModuleConf = PropTypes.shape({
  // Data and datasets restricted attributes: when provided, use those instead of featching available ones
  selectableDataObjectsAttributes: DataManagementShapes.AttributeModelList,
  selectableDataSetsAttributes: DataManagementShapes.AttributeModelList,
  // Forbid documents displaying in module
  documentsForbidden: PropTypes.bool,
})

export default AdminModuleConf
