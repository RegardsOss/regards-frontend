/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import transform from 'lodash/transform'
import has from 'lodash/has'
import includes from 'lodash/includes'
import reduce from 'lodash/reduce'
import keys from 'lodash/keys'
import pickBy from 'lodash/pickBy'
import split from 'lodash/split'
import values from 'lodash/values'
import { STEP_SUB_TYPES_ENUM } from './stepSubTypes'

const removeKeyFirstElement = (properties) => reduce(keys(properties), (acc, propertyKey) => {
  const newPropertyName = propertyKey.substr(propertyKey.indexOf('.') + 1, propertyKey.length)
  acc[newPropertyName] = properties[propertyKey]
  return acc
}, {})

export const computeSessionStep = (sessionStep, stepSubType, requestProperties = {}) => {
  let workerProperties = sessionStep.properties
  if (stepSubType === STEP_SUB_TYPES_ENUM.WORKERS) {
    workerProperties = removeKeyFirstElement(sessionStep.properties)
  }
  const newSessionStepProperties = reduce(keys(workerProperties), (acc, propertyKey) => {
    const workerNameOrProperty = split(propertyKey, '.')[0]
    if (includes(values(requestProperties), workerNameOrProperty)) {
      // Simple property
      acc[workerNameOrProperty] = workerProperties[propertyKey]
    } else if (!includes(values(requestProperties), workerNameOrProperty) && !has(acc, workerNameOrProperty)) {
      // Worker properties
      const joinedProperties = pickBy(sessionStep.properties, (value, key) => includes(key, workerNameOrProperty))
      acc[workerNameOrProperty] = transform(joinedProperties, (res, value, key) => {
        res[key.substr(key.lastIndexOf('.') + 1, key.length)] = value
      })
    }
    return acc
  }, {})
  return {
    ...sessionStep,
    properties: newSessionStepProperties,
  }
}
