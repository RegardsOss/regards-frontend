import * as StorageUnit from './StorageUnit'

/**
 * A storage capacity (like 8Mo, 36 Gio...)
 */
export class StorageCapacity {

  constructor(value = 0, unit) {
    this.value = value
    this.unit = unit
  }

  /**
   * Converts into (returns a new object)
   * @param newUnit new unit
   * @return Capacity in new unit (new object)
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
   * @return Capacity in new unit (new object)
   */
  scaleAndConvert(unitsScale) {
    // pre: units are ordered from smallest to biggest
    // algorithm: find X [unit] where X >= 1 or on lowest unit
    // impl: keep previous converted until the lowest unit, recompute only when previous converted does not match the conditions
    const availableUnits = StorageUnit.getOrderedUnitsInScale(unitsScale)
    availableUnits.reverse()
    // eslint-disable-next-line no-confusing-arrow
    return availableUnits.reduce((previousConverted, unit) =>
      previousConverted && previousConverted.value >= 1
        ? previousConverted
        : this.convert(unit)
      , null)
  }
}

export function capacityFromValue(textValue) {
  // 1 - extract the value and unit text from provided text
  const parsingExpression = /^\s*([0-9]+\.?[0-9]*)\s*(\w+)\s*$/i
  const matched = textValue.match(parsingExpression)
  if (!matched || matched.length < 3) {
    // text is not matching expecting format
    console.error('Could not parse unit and value in storage information: ', textValue)
    return null
  }

  // 2 - convert value
  console.info(matched)
  const valueText = matched[1] // value: first matching group
  const value = Number(valueText)
  if (Number.isNaN(value)) {
    console.error('Cannot extract a numeric value from parsed value ', valueText)
    return null
  }

  // 3 - convert unit
  const unitText = matched[2] // unit: second matching group
  const unit = StorageUnit.findMatchingUnit(unitText)
  if (!unit) {
    // found no matching unit
    console.error('No matching unit for unit text: ', unitText)
    return null
  }

  return new StorageCapacity(value, unit)
}
