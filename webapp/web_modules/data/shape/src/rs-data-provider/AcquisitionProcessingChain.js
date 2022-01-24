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
import { DataProviderDomain, IngestDomain } from '@regardsoss/domain'
import { PluginConfigurationContent } from '../rs-common/Plugin/PluginConfiguration'
import { AcquisitionFileInfoContent } from './AcquisitionFileInfo'

/**
 * Describes a AcquisitionProcessingChain shape and related sub objects
 * @author Sébastien Binda
 */

/** A dated selection item shape */
export const AcquisitionProcessingChainContent = PropTypes.shape({
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
  mode: PropTypes.oneOf(DataProviderDomain.AcquisitionProcessingChainModes).isRequired,
  versioningMode: PropTypes.oneOf(IngestDomain.VERSIONING_MODES).isRequired,
  productsStored: PropTypes.bool.isRequired,
  locked: PropTypes.bool,
  lastDateActivation: PropTypes.string,
  periodicity: PropTypes.string,
  ingestChain: PropTypes.string.isRequired,
  fileInfos: PropTypes.arrayOf(AcquisitionFileInfoContent),
  validationPluginConf: PluginConfigurationContent.isRequired,
  productPluginConf: PluginConfigurationContent.isRequired,
  generateSipPluginConf: PluginConfigurationContent.isRequired,
  postProcessSipPluginConf: PluginConfigurationContent,
})

export const AcquisitionProcessingChain = PropTypes.shape({
  content: AcquisitionProcessingChainContent,
})
export const AcquisitionProcessingChainList = PropTypes.objectOf(AcquisitionProcessingChain)
export const AcquisitionProcessingChainArray = PropTypes.arrayOf(AcquisitionProcessingChain)
