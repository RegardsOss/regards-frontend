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
import { StorageUnit, units } from './StorageUnit'

/**
 * Defines storage unit scales
 * @author Raphaël Mechali
 */
export class StorageUnitScale {
  /**
   * constructor
   * @param id scale ID, as used for internationalization
   * @param initialUnit initial unit (wears initial bits count value and following units suffix)
   * @param scaleSuffix scale suffix
   * @param stepFactor factor from one unit to next
   * @param parsingRegexp possible scale suffixes regular expression
   */
  constructor(id, initialUnit, scaleSuffix, stepFactor, parsingRegexp) {
    this.id = id
    this.parsingRegexp = parsingRegexp
    this.units = this.buildUnits(initialUnit, stepFactor, scaleSuffix)
  }

  buildUnits(initialUnit, stepFactor, scaleSuffix) {
    // create all scale units
    const lastLetter = initialUnit.symbol[initialUnit.symbol.length - 1]
    const useLowerCase = lastLetter === lastLetter.toLowerCase()
    let currentScaleStep = initialUnit.toBits
    return [new StorageUnit(initialUnit.symbol, initialUnit.toBits, this)].concat(StorageUnitScale.scalesSteps.map((stepPrefix) => {
      currentScaleStep *= stepFactor
      const unitPrefix = useLowerCase ? stepPrefix.toLowerCase() : stepPrefix.toUpperCase()
      return new StorageUnit(unitPrefix + scaleSuffix, currentScaleStep, this)
    }))
  }

  /**
   * Finds the matching unit or returns null
   * @param text text
   * @returns {StorageUnit | null} found unit
   */
  findUnit(text) {
    const matched = this.parsingRegexp.reduce((prevMatched, regexp) => prevMatched || text.trim().match(regexp), null)
    if (matched) {
      const foundPrefix = matched[1]
      if (!foundPrefix) {
        // no unit before, this is the first unit in scale (posible only for bits and bytes scales)
        return this.units[0]
      }
      // ignore case, as some regexp are ignoring it (or it is already verified)
      return this.units.find((unit) => unit.symbol.toLowerCase().startsWith(foundPrefix.toLowerCase())) || null
    }
    return null
  }

  /**
   * Returns matching unit for text or null
   * @param text text
   * @return {StorageUnitScale|null} found scale or null
   */
  static getMatchingUnit(text) {
    // search by last (more specific, to handle 'ib' before 'b')
    return StorageUnitScale.all.reduceRight((prevUnit, scale) => prevUnit || scale.findUnit(text), null)
  }

  /**
   * Returns key for scale message
   * @returns {string}
   */
  get messageKey() {
    return `storage.capacity.monitoring.units.scale.${this.id}`
  }
}

/** Scale steps (inner use only, to generate all units) **/
StorageUnitScale.scalesSteps = ['k', 'm', 'g', 't', 'p', 'e', 'z', 'y']
StorageUnitScale.bitsScale = new StorageUnitScale('bits', units.BIT, 'b', 10 ** 3, [
  /^\s*([a-zA-Z]?)b\s*$/, // FR and EN bit
  /^\s*([a-z]?)bit[s]?\s*$/i, // FR and EN scale name
])

// Bytes: parsed as both french octets 'o' and standard 'B' 'byte(s)'
StorageUnitScale.bytesScale = new StorageUnitScale('bytes', units.BYTE, 'B', 10 ** 3, [
  /^\s*([a-zA-Z]?)B\s*$/, // EN byte symbol
  /^\s*([a-z]?)o\s*$/i, // FR byte symbol
  /^\s*([a-z]?)bytes?\s*$/i, // EN bytes scale name
  /^\s*([a-z]?)octets?\s*$/i, // FR bytes scale name
])
StorageUnitScale.bitsSIPrefixScale = new StorageUnitScale('bits.si.prefix', units.BIT, 'ib', 2 ** 10, [
  /^\s*([a-z][A-Z]?)ib\s*$/, // FR and EN symbol
  /^\s*([a-z]?)ibits?\s*$/i, // FR and EN scale name
])
StorageUnitScale.bytesSIPrefixScale = new StorageUnitScale('bytes.si.prefix', units.BYTE, 'iB', 2 ** 10, [
  /^\s*([a-zA-Z]?)iB\s*$/, // EN symbol
  /^\s*([a-z]?)io\s*$/i, // FR symbol
  /^\s*([a-z]?)ibytes?\s*$/i, // EN ibytes scale name
  /^\s*([a-z]?)ioctets?\s*$/i, // FR ibytes scale name
])
// all units, ordered by less specific to more specific
StorageUnitScale.all = [StorageUnitScale.bitsScale, StorageUnitScale.bytesScale, StorageUnitScale.bitsSIPrefixScale, StorageUnitScale.bytesSIPrefixScale]
