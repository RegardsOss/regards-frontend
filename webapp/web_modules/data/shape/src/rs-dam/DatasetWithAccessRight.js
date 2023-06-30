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
import { DatasetContent } from './Dataset'
import { AccessRightContent } from './AccessRight'

/**
 * Shape for DatasetWithAccessRight entities
 * @author Sébastien Binda
 */
export const DatasetWithAccessRightContent = PropTypes.shape({
  dataset: DatasetContent,
  accessRight: AccessRightContent,
})

export const DatasetWithAccessRight = PropTypes.shape({
  content: DatasetWithAccessRightContent.isRequired,
})

export const DatasetWithAccessRightList = PropTypes.objectOf(DatasetWithAccessRight)
