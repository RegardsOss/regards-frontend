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
import isNil from 'lodash/isNil'

/**
 * Helper for handling criteria rows  in cells
 * @author Raphaël Mechali
 */
export class CriteriaRowsHelper {
  /**
   * @param {*} criteriaRow matching CriteriaEditableRow
   * @return {boolean} true when row stands for a group
   */
  static isGroup(criteriaRow) {
    return isNil(criteriaRow.criterionIndex)
  }

  /**
   * @param {*} criteriaRow matching CriteriaEditableRow
   * @return {boolean} true when row stands for a criterion
   */
  static isCriterion(criteriaRow) {
    return !CriteriaRowsHelper.isGroup(criteriaRow)
  }
}
