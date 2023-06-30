/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import BasicPageableActions from '../pageable/BasicPageableActions'

/**
 * Actions that are pageable and expose 'info' field (same level than page metadata)
 */
class BasicInfosPageableActions extends BasicPageableActions {
  constructor(options) {
    super(options)
    // rename actions to get correct logs
    this.ENTITY_LIST_REQUEST = `${options.namespace}/INFOS_PAGEABLE_LIST_REQUEST`
    this.ENTITY_LIST_SUCCESS = `${options.namespace}/INFOS_PAGEABLE_LIST_SUCCESS`
    this.ENTITY_LIST_FAILURE = `${options.namespace}/INFOS_PAGEABLE_LIST_FAILURE`
  }

  /**
    * Normalizes action payload as page or list payload
    * @param json JS object parsed from JSON result
    * @return normalized content
    */
  normalizeEntitiesPagePayload(json) {
    return {
      // let parent provide its content
      ...super.normalizeEntitiesPagePayload(json),
      // add info
      info: json.info,
    }
  }
}

export default BasicInfosPageableActions
