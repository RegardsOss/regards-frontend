/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Describes Ingest Metadatas in the AIPEntity
 * @author Simon MILHAU
 */
export const AIPEntityIngestMetadataStorages = PropTypes.shape({
  pluginBusinessId: PropTypes.string.isRequired,
  storePath: PropTypes.string.isRequired,
  targetTypes: PropTypes.arrayOf(PropTypes.string),
})

export const AIPEntityIngestMetadata = PropTypes.shape({
  ingestMetadata: PropTypes.shape({
    sessionOwner: PropTypes.string.isRequired,
    session: PropTypes.string.isRequired,
    ingestChain: PropTypes.string.isRequired,
    storages: PropTypes.arrayOf(PropTypes.string),
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
})
