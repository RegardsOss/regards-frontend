/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ENTITY_TYPES } from '@regardsoss/domain/dam'
import { CommonDomain } from '@regardsoss/domain'
import EntityGeoProperties from './EntityGeoProperties'
import { DataFile } from '../../rs-dam/DataFile'

/**
 * Catalog entity definitions
 * @author Raphaël Mechali
 */

/* Entity files attribute as key: file type, value: file array */
export const entityFiles = PropTypes.shape(CommonDomain.DATA_TYPES.reduce((acc, fileType) => ({
  ...acc,
  [fileType]: PropTypes.arrayOf(DataFile),
}), {}))

/** Fields of an entity (for re-use) */
export const entityFields = {
  id: PropTypes.string.isRequired,
  version: PropTypes.number.isRequired,
  last: PropTypes.bool.isRequired,
  model: PropTypes.string.isRequired,
  providerId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  entityType: PropTypes.oneOf(ENTITY_TYPES).isRequired,
  files: entityFiles,
  properties: PropTypes.object,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  geometry: EntityGeoProperties,
  bbox: PropTypes.arrayOf(PropTypes.number),
  crs: PropTypes.string,
}

/**
 * Entity definition for all catalog entities like datasets, dataobjects, collections or documents.
 * @author Sébastien Binda
 */
export const Entity = PropTypes.shape({
  content: PropTypes.shape(entityFields).isRequired,
})

export const EntityList = PropTypes.objectOf(Entity)
