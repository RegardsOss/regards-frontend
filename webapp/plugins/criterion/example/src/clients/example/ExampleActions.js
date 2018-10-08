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

/**
 * Some example Redux actions builder class
 * @author Raphaël Mechali
 */
export default class ExampleActions {
  /**
   * Constructor
   * @param {string} namespace actions namespace used to make sure ONLY ONE REDUCER will handle this action
   */
  constructor(namespace) {
    this.DO_SOMETHING = `${namespace}/DO_SOMETHING`
  }

  /**
   * @param {string} something some parameter for action (for example needs)
   * @return {*} redux action to dispatch
   */
  doSomething(something) {
    return {
      type: this.DO_SOMETHING,
      todo: something,
    }
  }
}
