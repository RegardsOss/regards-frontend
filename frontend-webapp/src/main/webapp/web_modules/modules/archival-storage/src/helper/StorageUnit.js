
export const bitsScale = 'bits'
export const bytesScale = 'bytes'
export const bitsSIPrefixScale = 'bits.si.prefix.scale'
export const bytesSIPrefixScale = 'bytes.si.prefix.scale'
export const unitScales = [bitsScale, bytesScale, bitsSIPrefixScale, bytesSIPrefixScale]


/**
 * A storagae unit (o, Ko, Mo...)
 */
export class StorageUnit {

  /**
   * constructor
   * @param symbol unit symbol, like b, o, Mb, Go
   * @param toBits factor for conversion to bits value
   */
  constructor(scaleFamily, symbol, toBits) {
    this.scaleFamily = scaleFamily
    this.symbol = symbol
    this.toBits = toBits
  }

}

const scalesSteps = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']


/**
 * Builds all units from kilo, mega... to zetta, yotta for the given scale
 * @scaleFamily scale family
 * @param suffix units suffix for that scale (example: 'o' for Ko, Mo,...)
 * @param stepFactor numerical factor to next unit in scale
 * @param number of bits considered in that unit
 */
function buildAllScaleUnits(scaleFamily, suffix, stepFactor, initBitValue = 1) {
  let currentScaleStep = initBitValue
  return scalesSteps.map((stepPrefix) => {
    currentScaleStep *= stepFactor
    return new StorageUnit(scaleFamily, stepPrefix + suffix, currentScaleStep)
  })
}

/** All available units for storage */
const allUnits = [
  // bit
  new StorageUnit(bitsScale, 'b', 1),
  // byte
  new StorageUnit(bytesScale, 'o', 8),
  // bit units
  ...buildAllScaleUnits(bitsScale, 'b', 10 ** 3),
  // bit units with SI prefix
  ...buildAllScaleUnits(bitsSIPrefixScale, 'ib', 2 ** 10),
  // octet units
  ...buildAllScaleUnits(bytesScale, 'o', 10 ** 3, 8),
  // octet units with SI prefix
  ...buildAllScaleUnits(bytesSIPrefixScale, 'io', 2 ** 10, 8),
]

/**
 * Finds a matching unit from text
 * @return found unit, undefined if none
 */
export function findMatchingUnit(unitText) {
  return allUnits.find(unit => unit.symbol.toLowerCase() === unitText.toLowerCase())
}
