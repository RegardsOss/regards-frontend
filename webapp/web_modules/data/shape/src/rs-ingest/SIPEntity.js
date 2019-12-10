/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AIPEntityIngestMetadata } from './AIPEntityIngestMetadata'

/**
 * Describes an SIP Entity shape and related sub objects
 * @author Simon MILHAU
 */
export const SIP = PropTypes.shape({
  sip: PropTypes.shape({
    ipType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    geometry: PropTypes.any,
    normalizedGeometry: PropTypes.any,
    properties: PropertiesShape,
    type: PropTypes.string,
  }),
})

export const SIPEntity = PropTypes.shape({
  sip: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sipId: PropTypes.string, // Not required as datasets, collections and documents are not produced by SIP sessions
    version: PropTypes.number.isRequired,
    state: IngestDomain.AIP_STATUS,
    checksum: PropTypes.string.isRequired,
    sip: PropTypes.oneOf(SIP),
    ingestMetadata: PropTypes.oneOf(AIPEntityIngestMetadata),
    providerId: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    creationDate: PropTypes.string.isRequired,
    lastUpdateDate: PropTypes.string.isRequired,
  }).isRequired,
})
