/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Description control related properties (grouped to avoid many properties in every object of the search graph module)
 * @author Raphaël Mechali
 */
export const DescriptionProperties = PropTypes.shape({
  showDescriptionOption: PropTypes.bool.isRequired, // when true, description option should be shown
  isDescriptionAvailableFor: PropTypes.func.isRequired, // (entityType) => (boolean) Should description be shown for entity type as parameter
  onShowDescription: PropTypes.func.isRequired, // (entity) => () Callback to show description
})
