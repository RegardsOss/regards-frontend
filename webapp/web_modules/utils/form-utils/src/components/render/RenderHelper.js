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
import isString from 'lodash/isString'
/**
 * @author Sébastien Binda
 */

/**
 * Function to retrieve error message of a given field from redux-form.
 * @param touched
 * @param error
 * @param intl
 * @returns {*}
 */
const getErrorMessage = (touched, error, intl) => {
  let errorMessage = null
  if (touched && error) {
    if (isString(error)) {
      errorMessage = intl.formatMessage({ id: error })
    } else {
      errorMessage = intl.formatMessage({ id: error.key }, error.props)
    }
  }
  return errorMessage
}

export default {
  getErrorMessage,
}
