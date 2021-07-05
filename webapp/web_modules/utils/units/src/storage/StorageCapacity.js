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
import isNumber from 'lodash/isNumber'
import { StorageUnitScale } from './StorageUnitScale'

/**
 * A storage capacity (like 8Mo, 36 Gio...)
 * @author Raphaël Mechali
 */
export class StorageCapacity {
  /**
   * Constructor
   * @param {number} value
   * @param {StorageUnit} unit
   */
  constructor(value = 0, unit) {
    this.value = value
    this.unit = unit
  }

  /**
   * Converts into (returns a new object)
   * @param {StorageUnit} newUnit new unit
   * @return {StorageCapacity} StorageCapacity in new unit (new object)
   */
  convert(newUnit) {
    const valueInNU = this.value * (this.unit.toBits / newUnit.toBits)
    return new StorageCapacity(valueInNU, newUnit)
  }

  /**
   * Scales this capacity into unit scale as parameter, attempting to find the first unit where the capacity has an integer part. ie. the returned
   * capacity uses [unit m] in unitsScale where:
   * Y [unit m+1] <= 1 <= X [unit m] <= Z [unit m-1]
   * @param unitsScale a unit scale like bits, bytes... see StorageUnit file
   * @return {StorageCapacity} capacity in new unit (new object)
   */
  scaleAndConvert(unitsScale) {
    // pre: units are ordered from smallest to biggest
    // algorithm: find X [unit] where X >= 1 or on lowest unit
    // impl: keep previous converted until the lowest unit, recompute only when previous converted does not match the conditions
    const availableUnits = unitsScale.units
    return availableUnits.reduceRight((previousConverted, unit) => previousConverted && previousConverted.value >= 1 ? previousConverted : this.convert(unit), null)
  }

  /**
   * Performs binariy arithmetic operation between this and other as parameter
   * @param {number|StorageCapacity} other other operand
   * @param {function} binaryOperator operator to apply
   * @returns {StorageCapacity} new instance
   */
  doArithmeticOperation(binaryOperator, other) {
    if (isNumber(other)) {
      return new StorageCapacity(binaryOperator(this.value, other), this.unit)
    }
    if (other instanceof StorageCapacity) {
      const converted = other.convert(this.unit)
      return new StorageCapacity(binaryOperator(this.value, converted.value), this.unit)
    }
    throw new Error(`Unsupported value parameter type: ${typeof other} (value: ${other})`)
  }

  /**
   * Add an other value to this capacity
   * @param {number|StorageCapacity} other other value
   * @returns {StorageCapacity}, new instance
   */
  add(other) {
    return this.doArithmeticOperation((a, b) => a + b, other)
  }

  /**
   * Subtract an other value to this capacity
   * @param {number|StorageCapacity} other other value
   * @returns {StorageCapacity}, new instance
   */
  subtract(other) {
    return this.doArithmeticOperation((a, b) => a - b, other)
  }

  /**
   * Multiply by an other value
   * @param {number|StorageCapacity} other  other value
   * @returns {StorageCapacity}, new instance
   */
  multiply(other) {
    return this.doArithmeticOperation((a, b) => a * b, other)
  }

  /**
   * Divide by an other value
   * @param {number|StorageCapacity} other other value
   * @returns {StorageCapacity}, new instance
   */
  divide(other) {
    return this.doArithmeticOperation((a, b) => a / b, other)
  }

  /**
   * Parses capacity from value
   * @param {string} textValue text value
   * @returns {StorageCapacity | null} null if text cannot get parsed
   */
  static fromValue(textValue) {
    // 1 - extract the value and unit text from provided text
    const parsingExpression = /^\s*([0-9]+\.?[0-9]*)\s*(\w+)\s*$/i
    const matched = textValue.match(parsingExpression)
    if (!matched || matched.length < 3) {
      // text is not matching expecting format
      return null
    }
    // 2 - convert value
    const value = Number(matched[1])
    // 3 - convert unit
    const unit = StorageUnitScale.getMatchingUnit(matched[2])
    return unit && !Number.isNaN(value) ? new StorageCapacity(value, unit) : null
  }
}
export const StorageCapacityShape = PropTypes.instanceOf(StorageCapacity)
