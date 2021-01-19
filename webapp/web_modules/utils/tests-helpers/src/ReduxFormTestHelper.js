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

/**
 * Return default props for input of a redux-form field
 * @author Sébastien Binda
 */
function getInputFieldProps(name, value) {
  return {
    name,
    value,
    onBlur: () => { },
    onChange: () => { },
    onDragStart: () => { },
    onDrop: () => { },
    onFocus: () => { },
  }
}

function getMetaFieldProps(error = undefined, invalid = false) {
  return {
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
  }
}

/**
 *
 * @param {*} initialValue
 * @param {*} name
 * @return {*} partially filled redux mock (fill as required...)
 */
function getFieldsProps(initialValue = [], name = 'anything') {
  return (new class FieldsStub {
    name = name

    currentValue = [...initialValue]

    forEach = () => {}

    get = (index) => this.currentValue[index]

    insert = () => {}

    getAll = () => this.currentValue

    length = this.currentValue.length

    map = (f) => this.currentValue.map((member, index) => f(member, index, this))

    move = () => {}

    pop = () => this.currentValue.slice(0, -1)

    push = (e) => {
      this.currentValue.push(e)
    }

    remove = (i) => {
      this.currentValue = this.currentValue.filter((v, vI) => vI !== i)
    }

    removeAll = () => {}

    shift = () => this.currentValue.slice(1)

    splice = () => {}

    swap = () => {}

    unshift = () => {}

    reduce = () => {}
  }())
}

export default {
  getInputFieldProps,
  getMetaFieldProps,
  getFieldsProps,
}
