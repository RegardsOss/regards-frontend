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
import AcquisitionfileInfo from './AcquisitionFileInfo'
/**
 * Describes a AcquisitionFile shape and related sub objects
 * @author Sébastien Binda
 */

/** A dated selection item shape */
const AcquisitionFileContent = PropTypes.shape({
  id: PropTypes.number.isRequired,
  state: PropTypes.string,
  filePath: PropTypes.string.isRequired,
  error: PropTypes.string,
  acqDate: PropTypes.string,
  fileInfo: AcquisitionfileInfo.AcquisitionFileInfoContent,
  checksum: PropTypes.string,
  checksumAlgorithm: PropTypes.string,
})

const AcquisitionFile = PropTypes.shape({
  content: AcquisitionFileContent,
})
const AcquisitionFileList = PropTypes.objectOf(AcquisitionFile)
const AcquisitionFileArray = PropTypes.arrayOf(AcquisitionFile)

module.exports = {
  AcquisitionFileList,
  AcquisitionFileArray,
  AcquisitionFileContent,
  AcquisitionFile,
}
