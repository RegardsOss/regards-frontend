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

/**
 * Describes an AIP Entity shape and related sub objects
 * @author Simon MILHAU
 */
export const Request = PropTypes.shape({
  creationDate: PropTypes.string,
  dtype: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.number,
  providerId: PropTypes.string.isRequired,
  remoteStepDeadline: PropTypes.string,
  session: PropTypes.string,
  sessionOwner: PropTypes.string,
  state: PropTypes.string,
})

export const RequestEntity = PropTypes.shape({
  content: Request.isRequired,
  links: PropTypes.array,
})
