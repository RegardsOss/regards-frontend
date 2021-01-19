/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { HateOASLink } from '../rs-common'

/**
 * Describes an AIP Entity shape and related sub objects
 * @author Simon MILHAU
 */
export const AIPEntityContent = PropTypes.shape({
  content: PropTypes.shape({
    aip: AIP,
    aipId: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    checksum: PropTypes.string.isRequired,
    creationDate: PropTypes.string,
    id: PropTypes.number,
    lastUpdate: PropTypes.string,
    providerId: PropTypes.string.isRequired,
    session: PropTypes.string.isRequired,
    sessionOwner: PropTypes.string.isRequired,
    state: PropTypes.string,
    storages: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
})

export const AIPEntity = PropTypes.shape({
  content: AIPEntityContent.isRequired,
  links: PropTypes.arrayOf(HateOASLink),
})
