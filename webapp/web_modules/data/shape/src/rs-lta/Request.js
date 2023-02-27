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
import { LTADomain } from '@regardsoss/domain'
import EntityGeoProperties from '../rs-catalog/entity/EntityGeoProperties'

const LTAFileShape = PropTypes.shape({
  checksumMd5: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  mimeType: PropTypes.string.isRequired,
  type: PropTypes.oneOf(LTADomain.LTA_DATA_TYPES).isRequired,
  url: PropTypes.string.isRequired,
})

const ProductShape = PropTypes.shape({
  correlationId: PropTypes.string.isRequired,
  datatype: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(LTAFileShape).isRequired,
  geometry: EntityGeoProperties,
  tags: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  originUrn: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  properties: PropTypes.object,
  replaceMode: PropTypes.bool.isRequired,
  session: PropTypes.string,
  storePath: PropTypes.string,
})

/**
 * @author Théo Lasserre
 */
const RequestContent = PropTypes.shape({
  correlationId: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  status: PropTypes.oneOf(LTADomain.REQUEST_STATUS).isRequired,
  session: PropTypes.string.isRequired,
  statusDate: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  message: PropTypes.string,
  model: PropTypes.string.isRequired,
  product: ProductShape.isRequired,
  storePath: PropTypes.string.isRequired,
})

export const Request = PropTypes.shape({
  content: RequestContent,
})
