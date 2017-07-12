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
import EntityGeoProperties from './EntityGeoProperties'
import { ObjectLinkedFile } from './ObjectLinkedFile'
import URL from '../common/URL'

export const CatalogEntityTypes = {
  DATASET: 'DATASET',
  COLLECTION: 'COLLECTION',
  DATAOBJECT: 'DATA',
  DOCUMENT: 'DOCUMENT',
}

/**
 * Entity definition for all catalog entities like datasets, dataobjects, collections or documents.
 * @author Sébastien Binda
 */
const CatalogEntity = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    ipId: PropTypes.string.isRequired,
    sipId: PropTypes.string,
    label: PropTypes.string.isRequired,
    entityType: PropTypes.oneOf(values(CatalogEntityTypes)).isRequired,
    files: PropTypes.arrayOf(ObjectLinkedFile),
    geometry: EntityGeoProperties,
    properties: PropTypes.object,
    tags: PropTypes.arrayOf(PropTypes.string),
    // description file for collections and datasets only
    descriptionFile: PropTypes.shape({
      // URL: external URL file (cannot be present at same time than type)
      url: URL,
      // type: MIME type for internal file (cannot be present at same time than URL)
      type: PropTypes.string, // cannot specify it better with MIME types as we use extended notations, text/markdown for instance
    }),
  }),
})

export default CatalogEntity
