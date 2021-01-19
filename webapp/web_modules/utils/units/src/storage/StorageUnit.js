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
 * A storagae unit (o, Ko, Mo...)
 * @author Raphaël Mechali
 */
export class StorageUnit {
  /**
   * constructor
   * @param symbol unit symbol, like b, B, mb, MB
   * @param toBits factor for conversion to bits value
   * @param scale unit parent scale
   */
  constructor(symbol, toBits, scale) {
    this.symbol = symbol
    this.toBits = toBits
    this.scale = scale
  }

  /**
   * Returns key for unit message
   * @returns {string}
   */
  get messageKey() {
    return `storage.capacity.monitoring.unit.${this.symbol}`
  }
}

export const BIT = new StorageUnit('b', 1)
export const BYTE = new StorageUnit('B', 8)
export const units = { BIT, BYTE }
