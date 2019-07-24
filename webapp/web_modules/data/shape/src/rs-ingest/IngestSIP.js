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
import PropertiesShape from '../rs-common/IP'

/**
 * Describes a SIP shape and related sub objects
 * @author Maxime Bouveron
 */

export const Session = PropTypes.shape({
  id: PropTypes.string.isRequired,
  lastActivationDate: PropTypes.string,
  sipsCount: PropTypes.number,
  indexedSipsCount: PropTypes.number,
  storedSipsCount: PropTypes.number,
  generatedSipsCount: PropTypes.number,
  errorSipsCount: PropTypes.number,
  deletedSipsCount: PropTypes.number,
})

export const IngestSIPContent = PropTypes.shape({
  id: PropTypes.number.isRequired,
  sipId: PropTypes.string.isRequired,
  providerId: PropTypes.string.isRequired,
  owner: PropTypes.string,
  version: PropTypes.number,
  state: PropTypes.string,
  checksum: PropTypes.string.isRequired,
  sip: PropTypes.shape({
    ipType: PropTypes.string,
    id: PropTypes.string.isRequired,
    geometry: PropTypes.any,
    properties: PropertiesShape,
    type: PropTypes.string,
  }),
  ingestDate: PropTypes.string,
  processing: PropTypes.string,
  session: Session,
})

export const IngestSIP = PropTypes.shape({
  content: IngestSIPContent,
})
export const IngestSIPList = PropTypes.objectOf(IngestSIP)
export const IngestSIPArray = PropTypes.arrayOf(IngestSIP)
