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
import flatten from 'lodash/flatten'
import uniq from 'lodash/uniq'
import filter from 'lodash/filter'
import get from 'lodash/get'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import { DamDomain } from '@regardsoss/domain'
import { modulesManager } from '@regardsoss/modules'

const getModuleToProcess = (module) => module.content.type === modulesManager.VisibleModuleTypes.SEARCH_GRAPH ? module.content.conf.searchResult : module.content.conf

const getAttr = (attributeName, attributes) => find(attributes, (attribute) => attribute.content.jsonPath === attributeName)

const getAttributeWhenInvalid = (attribute, isInvalid) => {
  if (isInvalid) {
    return get(attribute, 'content', null)
  }
  return null
}

const getInvalidAttr = (attributeName, attributes) => {
  const correspondingAttr = getAttr(attributeName, attributes)
  const isIndexed = get(correspondingAttr, 'content.indexed', false)
  return getAttributeWhenInvalid(correspondingAttr, !isIndexed)
}

const getInvalidAttrOnFacet = (attributeName, attributes) => {
  const correspondingAttr = getAttr(attributeName, attributes)
  const isIndexed = get(correspondingAttr, 'content.indexed', false)
  const type = get(correspondingAttr, 'content.type')
  const facetNotWorkingType = DamDomain.AttributeModelController.MODEL_ATTR_TYPES_FACET_NOT_WORKING.includes(type)
  return getAttributeWhenInvalid(correspondingAttr, !isIndexed || facetNotWorkingType)
}

const buildFiltersErrors = (facetsConf, attributes) => map(facetsConf, (facetConf) => getInvalidAttrOnFacet(facetConf.attributes[0].name, attributes)).filter((v) => !!v)

const buildCriteriasErrors = (criteriasConf, attributes) => map(criteriasConf, (criteriaConf) => {
  const searchField = get(criteriaConf, 'conf.attributes.searchField')
  if (!searchField) {
    const lowerBound = get(criteriaConf, 'conf.attributes.lowerBound')
    const upperBound = get(criteriaConf, 'conf.attributes.upperBound')
    if (lowerBound && upperBound) {
      return [getInvalidAttr(lowerBound, attributes), getInvalidAttr(upperBound, attributes)].filter((v) => !!v)
    }
    const firstField = get(criteriaConf, 'conf.attributes.firstField')
    const secondField = get(criteriaConf, 'conf.attributes.secondField')
    if (firstField && secondField) {
      return [getInvalidAttr(firstField, attributes), getInvalidAttr(secondField, attributes)].filter((v) => !!v)
    }
  } else {
    return getInvalidAttr(searchField, attributes)
  }
  return null
}).filter((v) => !!v)

const buildCriteriasGroupErrors = (criteriasGroupConf, attributes) => map(criteriasGroupConf, (criteriaGroupConf) => {
  const criteriasError = uniq(flatten(buildCriteriasErrors(criteriaGroupConf.criteria, attributes)))
  if (!isEmpty(criteriasError)) {
    return {
      title: criteriaGroupConf.title,
      criteriaAttribute: criteriasError,
    }
  }
  return null
}).filter((v) => !!v)

const buildSearchConfErrorsObject = (modules, attributes) => map(modules, (mod) => {
  const moduleToProcess = getModuleToProcess(mod)
  const criteriasGroup = buildCriteriasGroupErrors(moduleToProcess.criteriaGroups, attributes)
  const filters = uniq(buildFiltersErrors(moduleToProcess.facets.list, attributes))
  let errorConf = {}
  if (!isEmpty(criteriasGroup)) {
    errorConf = {
      ...errorConf,
      criteriasGroup,
    }
  }
  if (!isEmpty(filters)) {
    errorConf = {
      ...errorConf,
      filters,
    }
  }
  if (!isEmpty(criteriasGroup) || !isEmpty(filters)) {
    errorConf = {
      ...errorConf,
      title: mod.content.page.title,
    }
  }
  return errorConf
}).filter((v) => !isEmpty(v))

const checkModulesConfiguration = (modules, attributes) => {
  const searchModules = filter(modules, (mod) => mod.content.type === modulesManager.VisibleModuleTypes.SEARCH_RESULTS
    || mod.content.type === modulesManager.VisibleModuleTypes.SEARCH_GRAPH)
  return buildSearchConfErrorsObject(searchModules, attributes)
}

export default {
  checkModulesConfiguration,
}
