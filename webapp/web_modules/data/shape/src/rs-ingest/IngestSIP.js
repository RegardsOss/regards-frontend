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
import PropertiesShape from '../rs-common/IP'
import { EntityGeoProperties } from '../rs-catalog'

/**
 * Describes a SIP shape and related sub objects
 * @author Maxime Bouveron
 * @author Sébastien Binda
 */

export const Storage = PropTypes.shape({
  pluginBusinessId: PropTypes.string.isRequired,
  storePath: PropTypes.string.isRequired,
  targetTypes: PropTypes.arrayOf(PropTypes.string),
})

export const IngestSIPContent = PropTypes.shape({
  id: PropTypes.number.isRequired,
  sipId: PropTypes.string.isRequired,
  providerId: PropTypes.string.isRequired,
  session: PropTypes.string.isRequired,
  sessionOwner: PropTypes.string.isRequired,
  creationDate: PropTypes.string,
  lastUpdate: PropTypes.string,
  owner: PropTypes.string,
  version: PropTypes.number,
  state: PropTypes.string,
  checksum: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  ingestChain: PropTypes.string.isRequired,
  storages: PropTypes.arrayOf(Storage),
  sip: PropTypes.shape({
    ipType: PropTypes.string,
    id: PropTypes.string.isRequired,
    geometry: EntityGeoProperties,
    properties: PropertiesShape,
    type: PropTypes.string,
  }),
})

export const IngestSIP = PropTypes.shape({
  content: IngestSIPContent,
})
export const IngestSIPList = PropTypes.objectOf(IngestSIP)
export const IngestSIPArray = PropTypes.arrayOf(IngestSIP)
