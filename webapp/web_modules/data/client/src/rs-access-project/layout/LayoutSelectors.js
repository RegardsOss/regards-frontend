/*
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
 */
import find from 'lodash/find'
import get from 'lodash/get'
import { UIDomain } from '@regardsoss/domain'
import { BasicPageableSelectors } from '@regardsoss/store-utils'
import { createSelector } from 'reselect'

const EMPTY_ARRAY = []

class LayoutSelectors extends BasicPageableSelectors {
  /**
   * @param state redux state
   * @return user layout
   */
  getUserLayout = (state) => this.getById(state, UIDomain.APPLICATIONS_ENUM.USER)

  /**
   * @param state redux state
   * @return dynamic container
   */
  getDynamicContainer = createSelector(
    [(state) => this.getUserLayout(state)],
    (userLayout) => {
      const allContainers = get(userLayout, 'content.layout.containers', EMPTY_ARRAY)
      return find(allContainers, ({ dynamicContent = false, id }) => dynamicContent)
    })

  /**
   * @param state redux state
   * @return dynamic container
   */
  getDynamicContainerId = createSelector(
    [(state) => this.getDynamicContainer(state)],
    (dynamicContainer) => get(dynamicContainer, 'id'))
}

/**
 * Store selector to access layout entities.
 *
 * To use this selector, you need to pass a parameter : <storePath>.
 *
 * storePath : Array<String>, example :  ['common','enitites'].
 * With this example, all projects will be stored in the subpart 'common.entities' of the global
 * application store.
 * @param storePath selectors store path, leave empty for default client selectors
 * @author Sébastien Binda
 */
export default (storePath = ['user', 'layout']) => new LayoutSelectors(storePath)
