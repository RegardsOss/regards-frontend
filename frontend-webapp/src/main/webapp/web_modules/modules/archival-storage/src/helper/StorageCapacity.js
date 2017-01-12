import * as StorageUnit from './StorageUnit'

/**
 * A storage capacity (like 8Mo, 36 Gio...)
 */
export class StorageCapacity {

  constructor(value = 0, unit) {
    this.value = value
    this.unit = unit
  }

  convert(newUnit) {
    const valueInNU = this.value * (this.unit.toBits / newUnit.toBits)
    return new StorageCapacity(valueInNU, newUnit)
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
