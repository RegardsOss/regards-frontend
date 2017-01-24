/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'


export const bitsScale = 'bits' // exported for tests
export const bytesScale = 'bytes' // exported for tests
export const bitsSIPrefixScale = 'bits.si.prefix' // exported for tests
export const bytesSIPrefixScale = 'bytes.si.prefix' // exported for tests

export const allUnitScales = [bitsScale, bytesScale, bitsSIPrefixScale, bytesSIPrefixScale]

/**
 * A storagae unit (o, Ko, Mo...)
 */
export class StorageUnit {

  /**
   * constructor
   * @param scaleFamilies scale families
   * @param symbol unit symbol, like b, o, Mb, Go
   * @param toBits factor for conversion to bits value
   */
  constructor(scaleFamilies, symbol, toBits) {
    this.scaleFamilies = scaleFamilies
    this.symbol = symbol
    this.toBits = toBits
  }

}

const scalesSteps = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

/**
 * Builds all units from kilo, mega... to zetta, yotta for the given scale
 * @scaleFamily scale family
 * @param scaleFamilies scale families
 * @param suffix units suffix for that scale (example: 'o' for Ko, Mo,...)
 * @param stepFactor numerical factor to next unit in scale
 * @param initBitValue of bits considered in that unit
 */
function buildAllScaleUnits(scaleFamilies, suffix, stepFactor, initBitValue = 1) {
  let currentScaleStep = initBitValue
  return scalesSteps.map((stepPrefix) => {
    currentScaleStep *= stepFactor
    return new StorageUnit(scaleFamilies, stepPrefix + suffix, currentScaleStep)
  })
}

/** All available units for storage */
export const allUnits = [// bit
  new StorageUnit([bitsScale, bitsSIPrefixScale], 'b', 1), // byte
  new StorageUnit([bytesScale, bytesSIPrefixScale], 'o', 8), // bit units
  ...buildAllScaleUnits([bitsScale], 'b', 10 ** 3), // bit units with SI prefix
  ...buildAllScaleUnits([bitsSIPrefixScale], 'ib', 2 ** 10), // octet units
  ...buildAllScaleUnits([bytesScale], 'o', 10 ** 3, 8), // octet units with SI prefix
  ...buildAllScaleUnits([bytesSIPrefixScale], 'io', 2 ** 10, 8)] // exported for tests

/**
 * Finds a matching unit from text
 * @return found unit, undefined if none
 */
export function findMatchingUnit(unitText) {
  return allUnits.find(unit => unit.symbol.toLowerCase() === unitText.toLowerCase())
}

/**
 * Returns a partition of all units for the scale unit family as parameter. returns it ordered from the smallest unit to the biggest one
 * @param unitScale unit scale Family like bits, bytes, bytes with SI prefix...
 * @return units partition, ordered
 */
export function getOrderedUnitsInScale(unitScale) {
  // pre : units have been ordered, within a same unit scale family, from small to big in allUnits array
  // verified by corresponding test
  // post: units are still ordered from small to big in returned partition
  return allUnits.filter(unit => unit.scaleFamilies.includes(unitScale))
}

export const UnitScaleShape = React.PropTypes.oneOf(allUnitScales).isRequired
