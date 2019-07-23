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
import get from 'lodash/get'
import { CatalogDomain, DamDomain, UIDomain } from '@regardsoss/domain'
import { CriterionBuilder } from '../../../definitions/CriterionBuilder'
import { PresentationHelper } from './PresentationHelper'

/**
 * Helper to create initial results context from module configuration
 *
 * @author Raphaël Mechali
 */
export class ContextInitializationHelper {
  /** View entities type by preference order */
  static INITIAL_TYPE_PREFERENCE = [
    DamDomain.ENTITY_TYPES_ENUM.DATASET,
    DamDomain.ENTITY_TYPES_ENUM.DOCUMENT,
    DamDomain.ENTITY_TYPES_ENUM.DATA]

  /**
   * Builds default state for mode as parameter
   * @param {*} modeConfiguration configuration for mode, as defined in ModuleConfiguration shapes
   * @param {type} type from ENTITIES_TYPE_ENUM
   * @param {string} mode mode, from RESULTS_VIEW_MODES_ENUM
   * @param {*} attributeModels attributes found on server (respects DataManagementShapes.AttributeModelList shapes)
   * @return modeState field for parent type state
   */
  static buildDefaultModeState(modeConfiguration, type, mode, attributeModels) {
    if (modeConfiguration.enabled) {
      // compute selection allowed statuses:
      const modeState = {
        enabled: true,
        enableSelection: UIDomain.ResultsContextConstants.allowSelection(type, mode),
        presentationModels: PresentationHelper.buildPresentationModels(attributeModels, modeConfiguration.attributes, type, mode),
      }
      // specifities for by view types
      switch (mode) {
        case UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE:
          // store initial presentation model states
          modeState.initialPresentationModels = modeState.presentationModels
          break
        case UIDomain.RESULTS_VIEW_MODES_ENUM.MAP:
          // report map configuration and initial values
          modeState.backgroundLayer = modeConfiguration.backgroundLayer
          modeState.selectionMode = UIDomain.MAP_SELECTION_MODES_ENUM.PICK_ON_CLICK
          modeState.splitPosition = null
          break
        // nothing to do for other modes
        case UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK:
        default:
      }
      return modeState
    }
    return mode === UIDomain.RESULTS_VIEW_MODES_ENUM.MAP
      ? UIDomain.ResultsContextConstants.DISABLED_MAP_VIEW_MODE_STATE // specific mode with mandatory properties for map
      : UIDomain.ResultsContextConstants.DISABLED_VIEW_MODE_STATE
  }

  /**
   * Converts sorting criteria from configuration as parameter
   * @param {[*]} sortConfigurationField optional sort field. Must respect AccessShapes.AttributeListConfigurationModel
   * @param {*} attributeModels attributes found on server (respects DataManagementShapes.AttributeModelList shapes)
   * @return {[*}} converted criteria
   */
  static buildSortingCriteria(sortConfigurationField = [], attributeModels) {
    return sortConfigurationField
      .map(({ attributes }) => {
      // A - recover attribute JSON path
        const attrPath = get(attributes, '[0].name', null)
        // B - build it using helper (that will return null if no attribute is found)
        return CriterionBuilder.buildSortCriterion(
          DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(attrPath, attributeModels))
      })
      .filter(crit => !!crit) // clear non converted elements
  }

  /**
   * Converts facets state from facets configuration as parameter
   * @param {*} facetsConfiguration facets configuration (see module shape)
   * @param {*} attributeModels attributes found on server (respects DataManagementShapes.AttributeModelList shapes)
   * @return {[*]} facets initial state with unexisting facets filtered
   */
  static buildFacetsState(facetsConfiguration, attributeModels) {
    // 1 - convert all facets
    const convertedFacets = facetsConfiguration.list.reduce((acc, { label, attributes }) => {
      // resolve facet attribute (nota: facets can only have one attribute in configuration)
      const attribute = DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(attributes[0].name, attributeModels)
      // rebuild when found, filter facet otherwise
      return attribute ? [...acc, {
        facetLabels: label,
        attribute,
        requestParameters: { [CatalogDomain.CatalogSearchQueryHelper.FACETS_PARAMETER_NAME]: attributes[0].name },
      }] : acc
    }, [])
    // 2 - convert state
    const facetsAllowed = facetsConfiguration.enabled && convertedFacets.length > 0
    return {
      allowed: facetsAllowed,
      enabled: facetsAllowed && facetsConfiguration.initiallyEnabled,
      list: convertedFacets,
    }
  }

  /**
   * Builds default state for entity type as parameter
   * @param {*} typeConfiguration configuration for type, as defined in ModuleConfiguration shapes
   * @param {*} attributeModels attributes found on server (respects DataManagementShapes.AttributeModelList shapes)
   * @param {string} type view entities type, from ENTITY_TYPES_ENUM
   * @return modeState field
   */
  static buildDefaultTypeState(typeConfiguration, attributeModels, type) {
    // is view type enabled (type enabled and at least one view mode enabled)
    const enabled = typeConfiguration.enabled && UIDomain.RESULTS_VIEW_MODES.some(mode => get(typeConfiguration, `views.${mode}.enabled`, false))
    if (enabled) {
      // resolve facets
      const facetsConfiguration = get(typeConfiguration, 'facets', { enabled: false, initiallyEnabled: false, list: [] })
      const facets = ContextInitializationHelper.buildFacetsState(facetsConfiguration, attributeModels)
      // Resolve sorting
      const initialSorting = ContextInitializationHelper.buildSortingCriteria(typeConfiguration.sorting, attributeModels)
      // return initial state for type
      return {
        enabled: true,
        enableDownload: !!typeConfiguration.enableDownload,
        enableServices: UIDomain.ResultsContextConstants.allowServices(type),
        enableSorting: UIDomain.ResultsContextConstants.allowSorting(type),
        enableSearchEntity: UIDomain.ResultsContextConstants.allowNavigateTo(type),
        initialSorting,
        isInInitialSorting: true,
        selectedMode: typeConfiguration.initialMode || UIDomain.ResultsContextConstants.DEFAULT_VIEW_MODE,
        label: typeConfiguration.tabTitle, // label when provided in configuration
        facets,
        criteria: {
          requestFacets: facets.enabled ? facets.list : [],
          sorting: initialSorting,
        },
        modes: UIDomain.RESULTS_VIEW_MODES.reduce((acc, mode) => ({
          ...acc,
          [mode]: ContextInitializationHelper.buildDefaultModeState(
            // report list configuration on table (only table is configured)
            get(typeConfiguration, `views.${mode === UIDomain.RESULTS_VIEW_MODES_ENUM.LIST ? UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE : mode}`, {}),
            type, mode, attributeModels),
        }), {}),
      }
    }
    return UIDomain.ResultsContextConstants.DISABLED_TYPE_STATE
  }

  /**
   * Builds default state based on module configuration
   * @param {*} configuration module configuration matching ModuleConfiguration shape
   * @param {*} attributeModels attributes found on server (respects DataManagementShapes.AttributeModelList shapes)
   * @return {*} default results context state
   */
  static buildDefaultResultsContext(configuration, attributeModels) {
    // 1 - Build default state for data (as it is common to both main results and results tag view)
    const dataType = ContextInitializationHelper.buildDefaultTypeState(
      get(configuration, `viewsGroups.${DamDomain.ENTITY_TYPES_ENUM.DATA}`, {}), attributeModels, DamDomain.ENTITY_TYPES_ENUM.DATA)
    // 2 - complete default state to provide data and dataset type in results views
    return {
      ...UIDomain.ResultsContextConstants.DEFAULT_RESULTS_CONTEXT,
      tabs: {
        ...UIDomain.ResultsContextConstants.DEFAULT_RESULTS_CONTEXT.tabs,
        [UIDomain.ResultsContextConstants.TABS_ENUM.MAIN_RESULTS]: {
          ...UIDomain.ResultsContextConstants.DEFAULT_RESULTS_CONTEXT.tabs[UIDomain.ResultsContextConstants.TABS_ENUM.MAIN_RESULTS],
          types: {
            [DamDomain.ENTITY_TYPES_ENUM.DATA]: dataType,
            [DamDomain.ENTITY_TYPES_ENUM.DATASET]: ContextInitializationHelper.buildDefaultTypeState(
              get(configuration, `viewsGroups.${DamDomain.ENTITY_TYPES_ENUM.DATASET}`, {}), attributeModels, DamDomain.ENTITY_TYPES_ENUM.DATASET),
          },
        },
        [UIDomain.ResultsContextConstants.TABS_ENUM.TAG_RESULTS]: {
          ...UIDomain.ResultsContextConstants.DEFAULT_RESULTS_CONTEXT.tabs[UIDomain.ResultsContextConstants.TABS_ENUM.TAG_RESULTS],
          types: {
            [DamDomain.ENTITY_TYPES_ENUM.DATA]: dataType,
          },
        },
      },
    }
  }
}
