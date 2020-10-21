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
import isNil from 'lodash/isNil'
import { DamDomain } from '@regardsoss/domain'
import { NumberValueRender, DateValueRender } from '@regardsoss/components'

/**
 * Helper to format bounds messages according with attribute type and bounds state
 * Note: It may be used to format any attribute, even those without bound
 * @author Raphaël Mechali
 */

/** Bound type */
export const BOUND_TYPE = {
  // Values should be above this bound
  LOWER_BOUND: 'LOWER_BOUND',
  // Values should be below this bound
  UPPER_BOUND: 'UPPER_BOUND',
  // This bound may be any of the ones above
  ANY_BOUND: 'ANY_BOUND',
  // This bound should not display range hints
  NONE: 'NONE',
}

/**
 * Returns text for attribute type
 */
export function getTypeText(intl, attribute) {
  return intl.formatMessage({ id: `criterion.attribute.hint.type.${attribute.type}` })
}

/**
 * Format state from bounds: returns a value when bounds are unexisting, in error, loading or loaded empty for current bound type
 * Note: bounds messages are included by the root criteria container
 * @param {*} intl intl context (holds format* methods from intl context)
 * @param {*} attribute an AttributeModelWithBounds
 * @return {string} message to show if bounds are in a specific state
 */
export function formatBoundsStateHint(intl, attribute) {
  const { boundsInformation } = attribute
  const { formatMessage } = intl
  if (!boundsInformation.exists) {
    return formatMessage({ id: 'criterion.attribute.bounds.not.existing' }, { typeText: getTypeText(intl, attribute) })
  }
  if (boundsInformation.loading) {
    return formatMessage({ id: 'criterion.attribute.bounds.loading' }, { typeText: getTypeText(intl, attribute) })
  }
  if (boundsInformation.error) {
    return formatMessage({ id: 'criterion.attribute.bounds.error' }, { typeText: getTypeText(intl, attribute) })
  }
  if (isNil(boundsInformation.lowerBound) && isNil(boundsInformation.upperBound)) {
    return formatMessage({ id: 'criterion.attribute.bounds.none' }, { typeText: getTypeText(intl, attribute) })
  }
  return null
}

/**
 * Formats a bound value
 * Pre: value is not null nor empty
 * @param {*} intl intl context (holds format* methods from intl context)
 * @param {*} attribute an AttributeModelWithBounds
 * @param {string|number} value bound value
 * @return {string} bound value text
 * @throws Error when formatting failed
 */
export function formatBoundValue(intl, attribute, value) {
  let formattedValue = null
  switch (attribute.type) {
    case DamDomain.MODEL_ATTR_TYPES.DOUBLE:
    case DamDomain.MODEL_ATTR_TYPES.INTEGER:
    case DamDomain.MODEL_ATTR_TYPES.LONG:
      // Delegate onto number value render
      formattedValue = NumberValueRender.formatValue(intl, value, attribute.precision, attribute.unit)
      break
    case DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601:
      formattedValue = DateValueRender.getFormattedDate(value, DateValueRender.DEFAULT_FORMATTERS.dateWithSeconds, intl.formatMessage)
      break
    default: // no fallback for default
  }
  if (formattedValue) {
    return formattedValue
  }
  throw new Error(`Attribute ${attribute.name} should have no bound as its type is ${attribute.type}`)
}

/**
 * Formats lower bound attribute field hint text
 * Pre: bounds exists and are loaded without error. At least one bound value is defined
 * @param {*} intl intl context (holds format* methods from intl context)
 * @param {*} attribute an AttributeModelWithBounds
 * @return {string} formatted bound hint text
 */
export function formatLowerBoundHintText(intl, attribute) {
  const { formatMessage } = intl
  const { boundsInformation: { lowerBound } } = attribute
  if (isNil(lowerBound)) {
    return formatMessage({ id: 'criterion.attribute.bounds.lower.bound.none' }, { typeText: getTypeText(intl, attribute) })
  }
  return formatMessage({ id: 'criterion.attribute.bounds.lower.bound.value' }, {
    lowerBoundText: formatBoundValue(intl, attribute, lowerBound),
  })
}

/**
 * Formats lower bound attribute field hint text
 * Pre: bounds exists and are loaded without error. At least one bound value is defined
 * @param {*} intl intl context (holds format* methods from intl context)
 * @param {*} attribute an AttributeModelWithBounds
 * @return {string} formatted bound hint text
 */
export function formatUpperBoundHintText(intl, attribute) {
  const { formatMessage } = intl
  const { boundsInformation: { upperBound } } = attribute
  if (isNil(upperBound)) {
    return formatMessage({ id: 'criterion.attribute.bounds.upper.bound.none' }, { typeText: getTypeText(intl, attribute) })
  }
  return formatMessage({ id: 'criterion.attribute.bounds.upper.bound.value' }, {
    upperBoundText: formatBoundValue(intl, attribute, upperBound),
  })
}

/**
 * Formats lower bound attribute field hint text
 * Pre: bounds exists and are loaded without error. At least one bound value is defined
 * @param {*} intl intl context (holds format* methods from intl context)
 * @param {*} attribute an AttributeModelWithBounds
 * @return {string} formatted bound hint text
 */
export function formatAnyBoundHintText(intl, attribute) {
  const { formatMessage } = intl
  const { boundsInformation: { lowerBound, upperBound } } = attribute
  const rangeMin = isNil(lowerBound)
    // infinity
    ? formatMessage({ id: 'criterion.attribute.bounds.range.min.infinity.bound' })
    // bound available
    : formatMessage({ id: 'criterion.attribute.bounds.range.inclusive.min.bound' }, { lowerBoundText: formatBoundValue(intl, attribute, lowerBound) })
  const rangeMax = isNil(upperBound)
    // infinity
    ? formatMessage({ id: 'criterion.attribute.bounds.range.max.infinity.bound' })
    // bound available
    : formatMessage({ id: 'criterion.attribute.bounds.range.inclusive.max.bound' }, { upperBoundText: formatBoundValue(intl, attribute, upperBound) })
  return formatMessage({ id: 'criterion.attribute.bounds.range.values' }, { rangeMin, rangeMax })
}

/**
 * Main API to format the hint text
 * @param {*} intl intl context holding format* functions
 * @param {*} attribute an AttributeModelWithBounds
 * @param {string} boundType one of BOUND_TYPE values, according with current attribute use case
 * @return {string} text to show as criterion field hint
 */
export function formatHintText(intl, attribute, boundType = BOUND_TYPE.ANY_BOUND) {
  if (!intl || !intl.formatMessage) {
    throw new Error('Intl context is invalid. Check plugin context type (it must hold i18n context)')
  }

  // 1 - No bound: prevent any stateful label display
  if (boundType === BOUND_TYPE.NONE) {
    // Do not show loading and such for that bound type
    return intl.formatMessage({ id: 'criterion.attribute.bounds.upper.bound.none' }, { typeText: getTypeText(intl, attribute) })
  }

  // 2 - Are attribute bounds in a common state?
  const stateHintText = formatBoundsStateHint(intl, attribute)
  if (stateHintText) {
    // yes: return it as text
    return stateHintText
  }
  // 3 - Format bounds according with bound type
  switch (boundType) {
    case BOUND_TYPE.LOWER_BOUND:
      return formatLowerBoundHintText(intl, attribute)
    case BOUND_TYPE.UPPER_BOUND:
      return formatUpperBoundHintText(intl, attribute)
    case BOUND_TYPE.ANY_BOUND:
      return formatAnyBoundHintText(intl, attribute)
    case BOUND_TYPE.NONE:
      return intl.formatMessage({ id: 'criterion.attribute.bounds.upper.bound.none' }, { typeText: getTypeText(intl, attribute) })
    default:
      throw new Error(`Unknown bound type ${boundType}`)
  }
}

/**
 * Formats tooltip with all available values, according with the following cases:
 * A - The attribute is not valuable (not number nor date): Just the attribute type
 * B - The attribute is valuable and has one bound or more: [Type] in [b1,b2]...
 * C - The attribute is valuable but has no bound: [Type], not available for current results
 * @param {*} intl intl context holding format functions
 * @param {*} attribute an AttributeModelWithBounds
 * @return {string} text to show as criterion field tooltip
 */
export function formatTooltip(intl, attribute) {
  // A - Loading / error / unexisting bounds
  const { formatMessage } = intl
  const typeText = getTypeText(intl, attribute)
  const { boundsInformation } = attribute
  if (!boundsInformation.exists || boundsInformation.loading || boundsInformation.error) {
    return formatMessage({ id: 'criterion.attribute.tooltip.no.bound' }, { typeText })
  }

  // B - not it a specific case: if there is any bound, format the range then the full message
  if (!isNil(attribute.boundsInformation.lowerBound) || !isNil(attribute.boundsInformation.upperBound)) {
    const range = formatAnyBoundHintText(intl, attribute)
    return formatMessage({ id: 'criterion.attribute.tooltip.valueable.with.bounds' }, { typeText, range })
  }

  // C - Unboundable type
  return formatMessage({ id: 'criterion.attribute.tooltip.valueable.without.bound' }, { typeText })
}
