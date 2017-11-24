/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Describes a basket shape and related sub objects
 * @author Raphaël Mechali
 */

/** A dated selection item shape */
const BasketDatedItemsSelection = PropTypes.shape({
  objectsCount: PropTypes.number.isRequired,
  filesCount: PropTypes.number.isRequired,
  filesSize: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired, // should be an UTC date
  openSearchRequest: PropTypes.string,
})


/** A dataset selection shape, containing dated selection items */
const BasketDatasetSelection = PropTypes.shape({
  id: PropTypes.number.isRequired,
  datasetIpid: PropTypes.string.isRequired,
  datasetLabel: PropTypes.string.isRequired,
  objectsCount: PropTypes.number.isRequired,
  filesCount: PropTypes.number.isRequired,
  filesSize: PropTypes.number.isRequired,
  itemsSelections: PropTypes.arrayOf(BasketDatedItemsSelection).isRequired,
})

/** The basket shape */
const Basket = PropTypes.shape({
  id: PropTypes.number.isRequired,
  datasetSelections: PropTypes.arrayOf(BasketDatasetSelection),
})

module.exports = {
  BasketDatedItemsSelection,
  BasketDatasetSelection,
  Basket,
}
