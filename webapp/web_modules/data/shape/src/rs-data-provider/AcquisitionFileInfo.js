/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CommonDomain } from '@regardsoss/domain'
import { PluginConfigurationContent } from '../rs-common/Plugin/PluginConfiguration'

/**
 * Describes a AcquisitionFileInfo shape and related sub objects
 * @author Sébastien Binda
 */

/** A dated selection item shape */
export const AcquisitionFileInfoContent = PropTypes.shape({
  id: PropTypes.number.isRequired,
  mandatory: PropTypes.bool.isRequired,
  scanPlugin: PluginConfigurationContent.isRequired,
  lastModificationDate: PropTypes.string,
  mimeType: PropTypes.string.isRequired,
  dataType: PropTypes.oneOf(CommonDomain.DATA_TYPES),
  comment: PropTypes.string,
})

export const AcquisitionFileInfo = PropTypes.shape({
  content: AcquisitionFileInfoContent,
})
export const AcquisitionFileInfoList = PropTypes.objectOf(AcquisitionFileInfo)
export const AcquisitionFileInfoArray = PropTypes.arrayOf(AcquisitionFileInfo)
