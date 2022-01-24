/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Shapes related with Complex search endpoint
 * @author Raphaël Mechali
 */

export const ComplexSearchRequest = PropTypes.shape({
  engineType: PropTypes.string.isRequired,
  datasetUrn: PropTypes.string, // optional dataset restriction
  entityIdsToInclude: PropTypes.arrayOf(PropTypes.string),
  entityIdsToExclude: PropTypes.arrayOf(PropTypes.string),
  searchParameters: PropTypes.objectOf(PropTypes.any),
  searchDateLimit: PropTypes.string,
})

/**
 * Complex search endpoint body
 */
export const ComplexSearchBody = PropTypes.shape({
  page: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  requests: PropTypes.arrayOf(ComplexSearchRequest).isRequired,
})
