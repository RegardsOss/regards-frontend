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
import AcquisitionProcessingChain from './AcquisitionProcessingChain'
import AcquisitionProcessingChainMonitor from './AcquisitionProcessingChainMonitor'
import AcquisitionFileInfo from './AcquisitionFileInfo'
import Product from './Product'
import AcquisitionFile from './AcquisitionFile'

/**
 * @author Sébastien Binda
 */
module.exports = {
  ...AcquisitionProcessingChain,
  ...AcquisitionProcessingChainMonitor,
  ...AcquisitionFileInfo,
  ...Product,
  ...AcquisitionFile,
}
