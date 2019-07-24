/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Return default props for input of a redux-form field
 * @author Sébastien Binda
 */
const getInputFieldProps = (name, value) => ({
  name,
  value,
  onBlur: () => { },
  onChange: () => { },
  onDragStart: () => { },
  onDrop: () => { },
  onFocus: () => { },
})

const getMetaFieldProps = (error, invalid) => ({
  active: true,
  asyncValidating: true,
  autofilled: true,
  dirty: false,
  dispatch: () => { },
  error,
  form: '',
  invalid: !!invalid,
  pristine: true,
  submitting: false,
  submitFailed: false,
  touched: false,
  valid: !error,
  visited: true,
})

export default {
  getInputFieldProps,
  getMetaFieldProps,
}
