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
 * Plugins common english messages
 * @author Raphaël Mechali
 */

const messages = {
  // attribute type
  'criterion.attribute.hint.type.BOOLEAN': 'Boolean',
  'criterion.attribute.hint.type.DATE_ISO8601': 'Date',
  'criterion.attribute.hint.type.DATE_ARRAY': 'Date array',
  'criterion.attribute.hint.type.DATE_INTERVAL': 'Date range',
  'criterion.attribute.hint.type.DOUBLE': 'Floating',
  'criterion.attribute.hint.type.DOUBLE_ARRAY': 'Floating array',
  'criterion.attribute.hint.type.DOUBLE_INTERVAL': 'Floating range',
  'criterion.attribute.hint.type.INTEGER': 'Integer',
  'criterion.attribute.hint.type.INTEGER_ARRAY': 'Integer array',
  'criterion.attribute.hint.type.INTEGER_INTERVAL': 'Integer range',
  'criterion.attribute.hint.type.LONG': 'Integer',
  'criterion.attribute.hint.type.LONG_ARRAY': 'Integer array',
  'criterion.attribute.hint.type.LONG_INTERVAL': 'Integer range',
  'criterion.attribute.hint.type.STRING': 'Text',
  'criterion.attribute.hint.type.STRING_ARRAY': 'Texts array',
  'criterion.attribute.hint.type.URL': 'URL',
  // bounds state
  'criterion.attribute.bounds.not.existing': '{typeText}...',
  'criterion.attribute.bounds.loading': '{typeText}... (computing min/max)',
  'criterion.attribute.bounds.error': '{typeText}...',
  'criterion.attribute.bounds.none': '{typeText}... (no value)',
  // With bound values
  'criterion.attribute.bounds.lower.bound.none': '{typeText}...',
  'criterion.attribute.bounds.lower.bound.value': '{typeText} ≥ {lowerBoundText}...',
  'criterion.attribute.bounds.upper.bound.none': '{typeText}...',
  'criterion.attribute.bounds.upper.bound.value': '{typeText} ≤ {upperBoundText}...',
  'criterion.attribute.bounds.range.min.infinity.bound': ']-∞',
  'criterion.attribute.bounds.range.inclusive.min.bound': '[{lowerBoundText}',
  'criterion.attribute.bounds.range.max.infinity.bound': '+∞[',
  'criterion.attribute.bounds.range.inclusive.max.bound': '{upperBoundText}]',
  'criterion.attribute.bounds.range.values': '{typeText} in {rangeMin}; {rangeMax}...',
  'criterion.attribute.bounds.value.with.unit': '{value}{unit}',
  'criterion.attribute.bounds.value.date': '{date} {time}',
}

export default messages
