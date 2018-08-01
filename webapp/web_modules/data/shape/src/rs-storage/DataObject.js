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
export const DataObjectContent = PropTypes.shape({
  algorithm: PropTypes.number.isRequired,
  checksum: PropTypes.string.isRequired,
  dataType: PropTypes.string.isRequired,
  failureCauses: PropTypes.arrayOf(PropTypes.string).isRequired,
  mimeType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  notYetStoredBy: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
  storageDirectory: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
})
export const DataObject = PropTypes.shape({
  content: DataObjectContent,
})
export const DataObjectList = PropTypes.objectOf(DataObject)
export const DataObjectArray = PropTypes.arrayOf(DataObject)
