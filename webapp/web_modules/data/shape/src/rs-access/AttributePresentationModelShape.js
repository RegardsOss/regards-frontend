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
import { AttributeModel } from '../rs-dam/AttributeModel'

/**
 * An attribute / attribute group presentation model shape (used to tranfer presentation data around attributes between
 * components)
 * data, betwen the SearchResultsContainer and the corresponding component)
 * @author Raphaël Mechali
 */
const AttributePresentationModel = PropTypes.shape({
  // The key used to refer to this model
  key: PropTypes.string.isRequired,
  // Label
  label: PropTypes.string.isRequired,
  // list (maybe a single element) of attributes to show in this column
  attributes: PropTypes.arrayOf(AttributeModel).isRequired,
  // enable sorting on column?
  enableSorting: PropTypes.bool.isRequired,
  // Is that attribute currently used for sorting? Note: string value, to allow any custom type of sorting
  sortOrder: PropTypes.string,
  // Optional sort index when in multi sorting
  sortIndex: PropTypes.number,
  // optional order in presentation from configuration
  order: PropTypes.number,
})

const AttributePresentationModelArray = PropTypes.arrayOf(AttributePresentationModel)

module.exports = {
  AttributePresentationModel,
  AttributePresentationModelArray,
}
