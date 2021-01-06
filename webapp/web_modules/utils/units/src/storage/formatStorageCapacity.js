/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { units } from './StorageUnit'

/**
 * Export function to format storage capacity. Warning: when using this method, make sure your context contains storage units
 * keys
 *
 * @author Raphaël Mechali
 */

/** Units considered small (no digits displayed) */
const SMALL_UNITS = [units.BIT.symbol, units.BYTE.symbol]

/** Big units format options (not for bits and bytes) */
const BIG_UNITS_FORMAT_OPTIONS = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}

/** Small units format options (bits and bytes) */
const SMALL_UNITS_FORMAT_OPTIONS = {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}

/**
 *
 * @param {function} formatMessage method to format a storage message
 * @param {function} formatNumber method to format a number
 * @param {StorageCapacity} capacity to format (optional)
 * @param {*} formatOptions options to format number (defaults to SMALL_UNITS_FORMAT_OPTIONS or BIG_UNITS_FORMAT_OPTIONS
 * when not provided)
 * @return {string} localized storage capacity message
 */
export default function formatStorageCapacity(formatMessage, formatNumber, capacity, formatOptions) {
  let id = 'storage.capacity.monitoring.capacity.unknown'
  const values = {}
  if (capacity && isNumber(capacity.value) && capacity.unit) {
    id = 'storage.capacity.monitoring.capacity'
    // unit
    values.unitLabel = formatMessage({ id: capacity.unit.messageKey })
    // value: By preference, use (A) API user formatOptions or (B) small unit format (no digit) or (C) big units format
    values.valueLabel = formatNumber(capacity.value,
      formatOptions || (SMALL_UNITS.includes(capacity.unit.symbol) ? SMALL_UNITS_FORMAT_OPTIONS : BIG_UNITS_FORMAT_OPTIONS),
    )
  }
  return formatMessage({ id }, values)
}
