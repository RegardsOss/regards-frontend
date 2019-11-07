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
import { AIP } from './AIP'
import { AIPEntityIngestMetadata } from './AIPEntityIngestMetadata'
import { SIPEntity } from './SIPEntity'

/**
 * Describes an AIP Entity shape and related sub objects
 * @author Simon MILHAU
 */

export const AIPEntityContent = PropTypes.shape({
  content: {
    id: PropTypes.number,
    aipId: PropTypes.string,
    state: PropTypes.string,
    sip: SIPEntity,
    aip: AIP,
    ingestMetadata: AIPEntityIngestMetadata,
    providerId: PropTypes.string.isRequired,
    tags: PropTypes.array,
    creationDate: PropTypes.string,
    lastUpdate: PropTypes.string,
  },
})

export const AIPEntity = PropTypes.shape({
  content: PropTypes.arrayOf(AIPEntityContent).isRequired,
  links: PropTypes.array,
})
