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
import { LAYOUT, LAYOUT_ARRAY } from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * Redux store Actions for Layout entities
 * @author Sébastien binda
 */
class LayoutInstanceActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-ui-layout-management/layout',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.IMSERVICES.ACCESS_INSTANCE}/layouts`,
      entityPathVariable: 'applicationId',
      schemaTypes: {
        ENTITY: LAYOUT,
        ENTITY_ARRAY: LAYOUT_ARRAY,
      },
    })
  }
}

const instance = new LayoutInstanceActions()
export default instance
