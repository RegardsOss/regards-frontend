/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AcquisitionProcessingChainContent } from './AcquisitionProcessingChain'

/**
 * Describes a AcquisitionProcessingChain shape and related sub objects
 * @author Sébastien Binda
 */

/** A dated selection item shape */
const AcquisitionProcessingChainMonitorContent = PropTypes.shape({
  chain: AcquisitionProcessingChainContent.isRequired,
  nbFileErrors: PropTypes.number.isRequired,
  nbFiles: PropTypes.number.isRequired,
  nbFilesInProgress: PropTypes.number.isRequired,
  nbProductErrors: PropTypes.number.isRequired,
  nbProducts: PropTypes.number.isRequired,
  nbProductsInProgress: PropTypes.number.isRequired,
  nbProductAcquisitionJob: PropTypes.number.isRequired,
  nbSIPGenerationJobs: PropTypes.number.isRequired,
  nbSIPSubmissionJobs: PropTypes.number.isRequired,
})

const AcquisitionProcessingChainMonitor = PropTypes.shape({
  content: AcquisitionProcessingChainMonitorContent,
})
const AcquisitionProcessingChainMonitorList = PropTypes.objectOf(AcquisitionProcessingChainMonitor)
const AcquisitionProcessingChainMonitorArray = PropTypes.arrayOf(AcquisitionProcessingChainMonitor)

module.exports = {
  AcquisitionProcessingChainMonitorList,
  AcquisitionProcessingChainMonitorArray,
  AcquisitionProcessingChainMonitorContent,
  AcquisitionProcessingChainMonitor,
}
