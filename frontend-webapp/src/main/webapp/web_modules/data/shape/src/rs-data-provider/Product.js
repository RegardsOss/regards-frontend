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
import AcquisitionProcessingChain from './AcquisitionProcessingChain'
import AcquisitionFile from './AcquisitionFile'

/**
 * Describes a Product shape and related sub objects
 * @author Sébastien Binda
 */

/** A dated selection item shape */
const ProductContent = PropTypes.shape({
  id: PropTypes.number.isRequired,
  ipId: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  sipState: PropTypes.string,
  productName: PropTypes.string.isRequired,
  processingChain: AcquisitionProcessingChain.AcquisitionProcessingChainContent,
  fileList: AcquisitionFile.AcquisitionFileArray,
})

const Product = PropTypes.shape({
  content: ProductContent,
})
const ProductList = PropTypes.objectOf(Product)
const ProductArray = PropTypes.arrayOf(Product)

module.exports = {
  ProductList,
  ProductArray,
  ProductContent,
  Product,
}
