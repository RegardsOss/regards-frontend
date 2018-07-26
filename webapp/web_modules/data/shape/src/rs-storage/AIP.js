/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import PropertiesShape from './../rs-common/IP'
/**
 * Describes an AIP shape and related sub objects
 * @author Léo Mieulet
 */

export const AIPContent = PropTypes.shape({
  id: PropTypes.string.isRequired,
  ipType: PropTypes.string,
  geometry: PropTypes.any,
  sipId: PropTypes.string.isRequired,
  state: PropTypes.string,
  type: PropTypes.string,
  properties: PropertiesShape,
})

export const AIP = PropTypes.shape({
  content: AIPContent,
})
export const AIPList = PropTypes.objectOf(AIP)
export const AIPArray = PropTypes.arrayOf(AIP)
