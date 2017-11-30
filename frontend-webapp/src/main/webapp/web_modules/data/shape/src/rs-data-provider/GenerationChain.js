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
import { PluginConfigurationContent } from '../rs-common/Plugin/PluginConfiguration'
import { MetaProductContent } from './MetaProduct'

/**
 * Describes a basket shape and related sub objects
 * @author Raphaël Mechali
 */

/** A dated selection item shape */
const GenerationChainContent = PropTypes.shape({
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  running: PropTypes.bool,
  lastDateActivation: PropTypes.string,
  periodicity: PropTypes.number.isRequired,
  metaProduct: MetaProductContent.isrequired,
  dataSetIpId: PropTypes.string.isRequired,
  session: PropTypes.string,
  comment: PropTypes.string,
  scanAcquisitionPluginConf: PluginConfigurationContent.isRequired,
  checkAcquisitionPluginConf: PluginConfigurationContent.isRequired,
  generateSipPluginConf: PluginConfigurationContent.isRequired,
  postProcessSipPluginConf: PluginConfigurationContent.isRequired,
})

const GenerationChain = PropTypes.shape({
  content: GenerationChainContent,
})
const GenerationChainList = PropTypes.objectOf(GenerationChain)
const GenerationChainArray = PropTypes.arrayOf(GenerationChain)

module.exports = {
  GenerationChainList,
  GenerationChainArray,
  GenerationChainContent,
  GenerationChain,
}
