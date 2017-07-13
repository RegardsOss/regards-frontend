/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isUndefined from 'lodash/isUndefined'
import { SET_LOCALE } from './I18nActions'

// If navigator is not defined, set the locale to english
let navigator
if (isUndefined(navigator)) {
  navigator = { language: 'en' }
}

export default (state = {
  locale: navigator.language,
  messages: {},
}, action) => {
  switch (action.type) {
    // Running fetch plugins from server
    case SET_LOCALE:
      return Object.assign({}, state, { locale: action.locale })
    default:
      return state
  }
}
