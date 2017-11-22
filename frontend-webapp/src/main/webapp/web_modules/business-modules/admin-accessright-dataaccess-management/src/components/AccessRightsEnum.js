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

const METADATA_ACCESS_ENUM = {
  DATASET_AND_OBJECT_ACCESS: 'FULL_ACCESS',
  DATASET_ACCESS: 'RESTRICTED_ACCESS',
  NO_ACCESS: 'NO_ACCESS',
}

const DATA_ACCESS_ENUM = {
  AUTHORIZED: 'INHERITED_ACCESS',
  REFUSED: 'NO_ACCESS',
  AUTHORIZED_BY_PLUGIN: 'CUSTOM_ACCESS',
}

const QUALITY_LEVEL_ENUM = {
  ACCEPTED: 'ACCEPTED',
  ACCEPTED_WITH_WARNINGS: 'ACCEPTED_WITH_WARNINGS',
  REJECTED: 'REJECTED',
}

module.exports = {
  QUALITY_LEVEL_ENUM,
  METADATA_ACCESS_ENUM,
  DATA_ACCESS_ENUM,
}
