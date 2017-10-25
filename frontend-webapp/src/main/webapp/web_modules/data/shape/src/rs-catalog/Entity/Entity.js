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
import { ENTITY_TYPES } from '@regardsoss/domain/dam'
import { OBJECT_LINKED_FILE_TYPES } from '@regardsoss/domain/catalog'
import EntityGeoProperties from './EntityGeoProperties'
import { ObjectLinkedFile } from './ObjectLinkedFile'
import URL from '../../rs-common/URL'

/**
 * Catalog entity definitions
 * @author Raphaël Mechali
 */

/* Entity files attribute as key: file type, value: file array */
const entityFiles = PropTypes.shape(OBJECT_LINKED_FILE_TYPES.reduce((acc, fileType) => ({
  ...acc,
  [fileType]: PropTypes.arrayOf(ObjectLinkedFile),
}), {}))

/** Fields of an entity (for re-use) */
const entityFields = {
  id: PropTypes.number,
  ipId: PropTypes.string.isRequired,
  sipId: PropTypes.string,
  label: PropTypes.string.isRequired,
  entityType: PropTypes.oneOf(ENTITY_TYPES).isRequired,
  files: entityFiles.isRequired,
  geometry: EntityGeoProperties,
  properties: PropTypes.object,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  // description file for collections and datasets only
  descriptionFile: PropTypes.shape({
    // URL: external URL file (cannot be present at same time than type)
    url: URL,
    // type: MIME type for internal file (cannot be present at same time than URL)
    type: PropTypes.string, // cannot specify it better with MIME types as we use extended notations, text/markdown for instance
  }),
}

/**
 * Entity definition for all catalog entities like datasets, dataobjects, collections or documents.
 * @author Sébastien Binda
 */
const Entity = PropTypes.shape({
  content: PropTypes.shape(entityFields).isRequired,
})

const EntityList = PropTypes.objectOf(Entity)

export default {
  entityFields,
  Entity,
  EntityList,
}
