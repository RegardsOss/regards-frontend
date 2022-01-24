/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'criterion.attribute.hint.type.DOUBLE': 'Number',
  'criterion.attribute.hint.type.DOUBLE_ARRAY': 'Number array',
  'criterion.attribute.hint.type.DOUBLE_INTERVAL': 'Number range',
  'criterion.attribute.hint.type.INTEGER': 'Number',
  'criterion.attribute.hint.type.INTEGER_ARRAY': 'Number array',
  'criterion.attribute.hint.type.INTEGER_INTERVAL': 'Number range',
  'criterion.attribute.hint.type.LONG': 'Number',
  'criterion.attribute.hint.type.LONG_ARRAY': 'Number array',
  'criterion.attribute.hint.type.LONG_INTERVAL': 'Number range',
  'criterion.attribute.hint.type.STRING': 'Text',
  'criterion.attribute.hint.type.STRING_ARRAY': 'Texts array',
  'criterion.attribute.hint.type.URL': 'URL',
  // bounds state
  'criterion.attribute.bounds.not.existing': '{typeText}...',
  'criterion.attribute.bounds.loading': '{typeText}... (computing min/max)',
  'criterion.attribute.bounds.error': '{typeText}...',
  'criterion.attribute.bounds.none': '{typeText}...',
  // With bound values
  'criterion.attribute.bounds.lower.bound.none': '{typeText}...',
  'criterion.attribute.bounds.lower.bound.value': ' ≥ {lowerBoundText} ...',
  'criterion.attribute.bounds.upper.bound.none': '{typeText}...',
  'criterion.attribute.bounds.upper.bound.value': ' ≤ {upperBoundText} ...',
  'criterion.attribute.bounds.range.min.infinity.bound': ']-∞',
  'criterion.attribute.bounds.range.inclusive.min.bound': '[{lowerBoundText}',
  'criterion.attribute.bounds.range.max.infinity.bound': '+∞[',
  'criterion.attribute.bounds.range.inclusive.max.bound': '{upperBoundText}]',
  'criterion.attribute.bounds.range.values': '{rangeMin}; {rangeMax} ...',
  // Tooltip with bounds
  'criterion.attribute.tooltip.no.bound': '{typeText}...',
  'criterion.attribute.tooltip.valueable.with.bounds': '{typeText} in {range}',
  'criterion.attribute.tooltip.valueable.without.bound': '{typeText}: undefined value in current results',
}

export default messages
