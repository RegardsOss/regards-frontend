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
 */
import { AIP_FILE, AIP_FILE_ARRAY } from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * Actions to fetchs AIP file(s)
 * @author Léo Mieulet
 */
class AIPFileActions extends BasicListActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.STORAGE}/data-file/aip/{id}`,
      schemaTypes: {
        ENTITY: AIP_FILE,
        ENTITY_ARRAY: AIP_FILE_ARRAY,
      },
    })
  }

  /**
   * Return an action that fetch all AIP files related to provided AIP id
   */
  fetchAIPFiles(aipId) {
    return this.fetchEntityList({ id: aipId })
  }
}

export default AIPFileActions
