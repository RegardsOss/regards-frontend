/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

const METADATA_ACCESS_ENUM = {
  // Access allowed to dataset and all dataobjects in it
  DATASET_AND_OBJECT_ACCESS: 'FULL_ACCESS',
  // Access allowed to datastet but not to dataobjects in it
  DATASET_ACCESS: 'RESTRICTED_ACCESS',
  // Access allowed to dataset and custom for dataobjects. Cutsom means that access are calculated by a plugin
  CUSTOM_ACCESS: 'CUSTOM_ACCESS',
  // No access allowed to dataset neather dataobjets
  NO_ACCESS: 'NO_ACCESS',
}

const DATA_ACCESS_ENUM = {
  // Access allowed to files of dataobjects
  AUTHORIZED: 'INHERITED_ACCESS',
  // Access denied to files of dataobjets
  REFUSED: 'NO_ACCESS',
}

export default {
  METADATA_ACCESS_ENUM,
  DATA_ACCESS_ENUM,
}
