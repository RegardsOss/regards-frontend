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
 * Describes attributes bounds as they are tranferred by the server
 * @author Raphaël Mechali
 */

export const AttributeBoundsContent = PropTypes.shape({
  propertyName: PropTypes.string.isRequired,
  lowerBound: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  upperBound: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
})

export const AttributeBounds = PropTypes.shape({
  content: AttributeBoundsContent.isRequired,
})

export const AttributeBoundsMap = PropTypes.objectOf(AttributeBounds)
