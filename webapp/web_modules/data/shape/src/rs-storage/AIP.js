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
/**
 * Describes an AIP shape and related sub objects
 * @author Léo Mieulet
 */

export const AIPContentWithStorages = PropTypes.shape({
  aip: PropTypes.shape({
    id: PropTypes.string.isRequired,
    ipType: PropTypes.string,
    geometry: PropTypes.any,
    sipId: PropTypes.string, // Not required as datasets, collections and documents are not produced by SIP sessions
    state: PropTypes.oneOf(IngestDomain.AIP_STATUS),
    type: PropTypes.string,
    properties: PropertiesShape,
  }).isRequired,
  dataStorageIds: PropTypes.arrayOf(PropTypes.number).isRequired,
})

export const AIPWithStorages = PropTypes.shape({
  content: AIPContentWithStorages,
})
export const AIPWithStoragesList = PropTypes.objectOf(AIPWithStorages)
export const AIPWithStoragesArray = PropTypes.arrayOf(AIPWithStorages)
