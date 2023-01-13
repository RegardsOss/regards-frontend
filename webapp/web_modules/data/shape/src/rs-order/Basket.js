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
 * Describes a basket shape and related sub objects
 * @author Raphaël Mechali
 */

/** Expresses a request for a dated selection */
export const BasketSelelectionRequest = PropTypes.shape({
  engineType: PropTypes.string.isRequired,
  datasetUrn: PropTypes.string, // optional dataset restriction
  entityIdsToInclude: PropTypes.arrayOf(PropTypes.string),
  entityIdsToExclude: PropTypes.arrayOf(PropTypes.string),
  // eslint-disable-next-line react/forbid-prop-types
  searchParameters: PropTypes.object,
  selectionDate: PropTypes.string.isRequired,
})

/** A dated selection item shape */
export const BasketDatedItemsSelection = PropTypes.shape({
  date: PropTypes.string.isRequired, // should be an UTC date
  filesCount: PropTypes.number.isRequired,
  objectsCount: PropTypes.number.isRequired,
  filesSize: PropTypes.number.isRequired,
  selectionRequest: BasketSelelectionRequest.isRequired,
})

/** A dataset processing selection shape */
export const BasketDatasetProcessingSelection = PropTypes.shape({
  processBusinessId: PropTypes.string.isRequired,
  parameters: PropTypes.objectOf(PropTypes.any).isRequired,
})

/** A dataset file selection shape */
export const BasketDatasetFileSelectionDescription = PropTypes.shape({
  fileTypes: PropTypes.arrayOf(PropTypes.string),
  fileNamePattern: PropTypes.string,
})

/** A dataset selection shape, containing dated selection items */
export const BasketDatasetSelection = PropTypes.shape({
  id: PropTypes.number.isRequired,
  datasetIpid: PropTypes.string.isRequired,
  datasetLabel: PropTypes.string.isRequired,
  objectsCount: PropTypes.number.isRequired,
  filesCount: PropTypes.number.isRequired,
  filesSize: PropTypes.number.isRequired,
  itemsSelections: PropTypes.arrayOf(BasketDatedItemsSelection).isRequired,
  process: BasketDatasetProcessingSelection,
  fileSelectionDescription: BasketDatasetFileSelectionDescription,
})

/** The basket shape */
export const Basket = PropTypes.shape({
  id: PropTypes.number.isRequired,
  datasetSelections: PropTypes.arrayOf(BasketDatasetSelection),
})
