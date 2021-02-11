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

/**
 * List of plugin types available for configuration in every ingest processing chain
 */
const AcquisitionProcessingChainPluginTypes = {
  VALIDATION: 'fr.cnes.regards.modules.acquisition.plugins.IValidationPlugin',
  SCAN: 'fr.cnes.regards.modules.acquisition.plugins.IScanPlugin',
  PRODUCT: 'fr.cnes.regards.modules.acquisition.plugins.IProductPlugin',
  GENERATE_SIP: 'fr.cnes.regards.modules.acquisition.plugins.ISipGenerationPlugin',
  POST_PROCESSING: 'fr.cnes.regards.modules.acquisition.plugins.ISipPostProcessingPlugin',
}

export default AcquisitionProcessingChainPluginTypes
