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
import get from 'lodash/get'
import find from 'lodash/find'
import { getToponymLabel } from './ToponymHints'

/**
   * Used in toponym criterion & toponym search bar to determine error state of the field
   * @param {*} toponyms
   * @param {*} currentLocale // either fr or en
   * @param {*} toponymFilterText // field text entered by user
   */
export const isToponymFound = (toponyms, currentLocale, toponymFilterText) => find(toponyms, (toponym) => getToponymLabel(toponym, currentLocale).includes(toponymFilterText))

/**
   * Get toponym businessId when a toponym is selected
   * Used in toponym criterion & toponym search bar in map view
   * @param {*} toponyms
   * @param {*} currentLocale // either fr or en
   * @param {*} toponymFilterText // field text entered by user
   */
export const getSelectedToponymBusinessId = (toponyms, currentLocale, toponymFilterText) => get(find(toponyms, (toponym) => getToponymLabel(toponym, currentLocale) === toponymFilterText), 'content.businessId')
