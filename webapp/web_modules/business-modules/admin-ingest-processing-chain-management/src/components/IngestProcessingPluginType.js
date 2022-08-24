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
 * List of plugin types available for configuration in every ingest processing chain
 */
const ingestPluginTypes = {
  PRE_PROCESSING: 'fr.cnes.regards.modules.ingest.domain.plugin.ISipPreprocessing',
  VALIDATION: 'fr.cnes.regards.modules.ingest.domain.plugin.ISipValidation',
  GENERATION: 'fr.cnes.regards.modules.ingest.domain.plugin.IAipGeneration',
  STORAGE_METADATA_UPDATE: 'fr.cnes.regards.modules.ingest.domain.plugin.IAIPStorageMetadataUpdate',
  TAG: 'fr.cnes.regards.modules.ingest.domain.plugin.IAipTagging',
  POST_PROCESSING: 'fr.cnes.regards.modules.ingest.domain.plugin.ISipPostprocessing',
}

export default ingestPluginTypes
