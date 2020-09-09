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
 */
import { LINK_PROCESSING_DATASET, LINK_PROCESSING_DATASET_ARRAY } from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * Actions to get Processing metadata information
 * @author Théo Lasserre
 */
class LinkProcessingDatasetActions extends BasicListActions {
    constructor(namespace) {
        super({
            namespace,
            entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.PROCESSING}/linkprocessdataset`,
            entityPathVariable: 'datasetIpId',
            schemaTypes: {
                ENTITY: LINK_PROCESSING_DATASET,
                ENTITY_ARRAY: LINK_PROCESSING_DATASET_ARRAY,
            },
        })
    }
}

export default LinkProcessingDatasetActions