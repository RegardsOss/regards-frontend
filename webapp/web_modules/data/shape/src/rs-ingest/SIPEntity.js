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
import { IngestDomain } from '@regardsoss/domain'
import PropertiesShape from '../rs-common/IP'
import { HateOASLink } from '../rs-common'
import { EntityGeoProperties } from '../rs-catalog'

/**
 * Describes an SIP Entity shape and related sub objects
 * @author Simon MILHAU
 */
export const SIP = PropTypes.shape({
  sip: PropTypes.shape({
    ipType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    geometry: EntityGeoProperties,
    normalizedGeometry: EntityGeoProperties,
    properties: PropertiesShape,
    type: PropTypes.string,
  }),
})

export const SIPEntityContent = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.string.isRequired,
    sipId: PropTypes.string,
    version: PropTypes.number,
    state: IngestDomain.AIP_STATUS,
    checksum: PropTypes.string.isRequired,
    sip: SIP,
    sessionOwner: PropTypes.string.isRequired,
    session: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
    providerId: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    creationDate: PropTypes.string.isRequired,
    lastUpdate: PropTypes.string.isRequired,
    ipType: PropTypes.string.isRequired,
  }),
})

export const SIPEntity = PropTypes.shape({
  content: SIPEntityContent.isRequired,
  links: PropTypes.arrayOf(HateOASLink),
})
