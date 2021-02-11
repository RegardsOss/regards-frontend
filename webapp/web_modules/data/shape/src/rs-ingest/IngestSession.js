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

/**
 * Describes a SIP shape and related sub objects
 * @author Maxime Bouveron
 */

/** A dated selection item shape */
export const IngestSessionContent = PropTypes.shape({
  id: PropTypes.string.isRequired,
  lastActivationDate: PropTypes.string.isRequired,
  sipsCount: PropTypes.number.isRequired,
  indexedSipsCount: PropTypes.number.isRequired,
  storedSipsCount: PropTypes.number.isRequired,
  generatedSipsCount: PropTypes.number.isRequired,
  errorSipsCount: PropTypes.number.isRequired,
})

export const IngestSession = PropTypes.shape({
  content: IngestSessionContent,
})
export const IngestSessionList = PropTypes.objectOf(IngestSession)
export const IngestSessionArray = PropTypes.arrayOf(IngestSession)
