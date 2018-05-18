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
 **/
import last from 'lodash/last'
import { BasicSelector } from '@regardsoss/store-utils'

export class DescriptionLevelSelectors extends BasicSelector {
  getCurrentDescriptionPath(state) {
    return this.uncombineStore(state).currentDescriptionPath
  }

  getShownEntity(state) {
    const path = this.getCurrentDescriptionPath(state)
    return path && path.length ? last(path) : null
  }

  getCurrentTab(state) {
    return this.uncombineStore(state).tab
  }
}

export default function getDescriptionLevelSelectors(storePath) {
  return new DescriptionLevelSelectors(storePath)
}
