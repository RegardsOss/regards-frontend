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
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import reduce from 'lodash/reduce'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import { CatalogDomain, DamDomain, UIDomain } from '@regardsoss/domain'
import { CriterionBuilder } from '../../../definitions/CriterionBuilder'
import { PresentationHelper } from './PresentationHelper'

/**
 * Helper to create initial results context from module configuration
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
export class ContextInitializationHelper {
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
        enableSelection: UIDomain.ResultsContextConstants.allowSelection(type),
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
          modeState.mapEngine = modeConfiguration.mapEngine || UIDomain.MAP_ENGINE_ENUM.CESIUM
          modeState.layers = modeConfiguration.layers || []
          modeState.mapSelectionMode = UIDomain.MAP_SELECTION_MODES_ENUM.PICK_ON_CLICK
          modeState.viewMode = modeConfiguration.initialViewMode || UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D
          modeState.splitPosition = null
          modeState.itemOfInterest = null
          modeState.zoomToFeature = null
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
      .filter((crit) => !!crit) // clear non converted elements
  }

  /**
   * Converts facets state from facets configuration as parameter
   * @param {*} configuration facets configuration (see module shape)
   * @param {*} attributeModels attributes found on server (respects DataManagementShapes.AttributeModelList shapes)
   * @return {{enabled: boolean, list: [*]}} facets initial state with unexisting facets filtered
   */
  static buildFacetsState(configuration, attributeModels) {
    // 1 - convert all facets
    const facetsConfiguration = configuration.facets || { // default state for working
      enabledFor: {
        [DamDomain.ENTITY_TYPES_ENUM.DATA]: false,
        [DamDomain.ENTITY_TYPES_ENUM.DATASET]: false,
      },
      initiallyEnabled: false,
      list: [],
    }
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
    return {
      enabled: facetsConfiguration.initiallyEnabled,
      list: convertedFacets,
    }
  }

  /**
   * Builds default state for entity type as parameter
   * @param {*} configuration module configuration, matching ModuleConfiguration shape
   * @param {*} attributeModels attributes found on server (respects DataManagementShapes.AttributeModelList shapes)
   * @param {string} type view entities type, from ENTITY_TYPES_ENUM
   * @return modeState field
   */
  static buildDefaultTypeState(configuration, attributeModels, type) {
    const typeConfiguration = get(configuration, `viewsGroups.${type}`, {})
    // is view type enabled (type enabled and at least one view mode enabled)
    const enabled = typeConfiguration.enabled && UIDomain.RESULTS_VIEW_MODES.some((mode) => get(typeConfiguration, `views.${mode}.enabled`, false))
    if (enabled) {
      // resolve facets
      const facetsAllowed = get(configuration, `facets.enabledFor.${type}`, false)
      // Resolve sorting
      const initialSorting = ContextInitializationHelper.buildSortingCriteria(typeConfiguration.sorting, attributeModels)
      // return initial state for type
      return {
        enabled: true,
        enableDownload: !!typeConfiguration.enableDownload,
        enableRefresh: !!typeConfiguration.enableRefresh,
        enableServices: !!typeConfiguration.enableServices && UIDomain.ResultsContextConstants.allowServices(type),
        enableSorting: UIDomain.ResultsContextConstants.allowSorting(type),
        enableSearchEntity: UIDomain.ResultsContextConstants.allowNavigateTo(type),
        initialSorting,
        isInInitialSorting: true,
        selectedMode: typeConfiguration.initialMode || UIDomain.ResultsContextConstants.DEFAULT_VIEW_MODE,
        label: typeConfiguration.tabTitle, // label when provided in configuration
        facetsAllowed,
        criteria: {
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
   * Builds restrictions criteria from configuration
   * @param {*} restrictions matching ModuleConfiguration.RestrictionsConfiguration
   * @return {[*]} built criteria for configured restrictions
   */
  static buildConfigurationCriteria(restrictions) {
    const restrictionCriteria = []
    // 1 - Restrictions on data
    const { openSearchRequest = '', lastVersionOnly = false } = get(restrictions, 'onData', {})
    if (lastVersionOnly) {
      restrictionCriteria.push({
        requestParameters: {
          [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]: new CatalogDomain.OpenSearchQueryParameter(
            CatalogDomain.OpenSearchQuery.SAPN.last, true).toQueryString(),
        },
      })
    }
    if (!isEmpty(openSearchRequest)) {
      restrictionCriteria.push({
        requestParameters: {
          [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]: openSearchRequest,
        },
      })
    }
    // 2 - Restrictions on datasets
    // Dataset ID / models restrictions
    const { type, selection } = get(restrictions, 'byDataset', {})
    switch (type) {
      case UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_DATASETS:
        restrictionCriteria.push({
          requestParameters: {
            [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]: new CatalogDomain.OpenSearchQueryParameter(
              CatalogDomain.OpenSearchQuery.SAPN.tags,
              CatalogDomain.OpenSearchQueryParameter.toStrictStringEqual(selection)).toQueryString(),
          },
        })
        break
      case UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.SELECTED_MODELS:
        restrictionCriteria.push({
          requestParameters: {
            [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]: new CatalogDomain.OpenSearchQueryParameter(
              CatalogDomain.OpenSearchQuery.DATASET_MODEL_NAMES_PARAM,
              CatalogDomain.OpenSearchQueryParameter.toStrictStringEqual(selection)).toQueryString(),
          },
        })
        break
      default: // no restriction: do nothing
    }
    return restrictionCriteria
  }

  /**
   * Builds initial search state based on criteria groups
   * @param {number} moduleId module ID
   * @param {string} tabType tab type from UIDomain.RESULTS_TABS_ENUM
   * @param {[*]} criteriaGroups criteria groups
   * @param {*} attributeModels attributes found on server (respects DataManagementShapes.AttributeModelList shapes)
   */
  static buildSearchState(moduleId, tabType, criteriaGroups = [], attributeModels) {
    // convert each group when at least one criterion is active and has valid configuration...
    const groups = criteriaGroups.reduce((accGroups, { showTitle, title, criteria: confCriteria }, groupIndex) => {
      // convert each criterion that is active and has valid configuration
      const criteria = confCriteria.reduce((accCrit, { label, pluginId, conf }, criterionIndex) => {
        const confAttributes = get(conf, 'attributes', {})
        // resolve all attributes
        const attributes = reduce(confAttributes, (accAttributes, attrPath, attrKey) => {
          if (isNil(accAttributes)) {
            return null // there were a previously missing attribute
          }
          const resolvedAttribute = DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(attrPath, attributeModels)
          return resolvedAttribute ? {
            ...accAttributes,
            [attrKey]: resolvedAttribute.content,
          } : null // set acc to null when first missing attribute is encountered
        }, {})

        // if all attributes where resolved, append criterion with configuration
        return isNil(attributes) ? accCrit : [
          ...accCrit, {
            pluginId,
            // build instance ID on module ID, tab type, group index and criterion index to make sure its unique. Append also
            // attributes and plugin type from configuration to ensure restoring state only when configuration has not been updated
            pluginInstanceId: `[${moduleId}/${tabType}/${pluginId}][${map(attributes, (attr) => attr.jsonPath).join('/')}][${groupIndex}:${criterionIndex}]`,
            label,
            conf: { attributes },
          }]
      }, [])
      return criteria.length ? [...accGroups, {
        showTitle,
        title,
        criteria,
      }] : accGroups
    }, [])

    return {
      enabled: groups.length > 0,
      open: false,
      groups,
    }
  }

  /**
   * Builds default state based on module configuration
   * @param {number} moduleId module ID
   * @param {*} configuration module configuration matching ModuleConfiguration shape
   * @param {*} attributeModels attributes found on server (respects DataManagementShapes.AttributeModelList shapes)
   * @return {*} default results context state
   */
  static buildDefaultResultsContext(moduleId, configuration, attributeModels) {
    // 1 - Build default state for data (as it is common to both main results and results tag view)
    const dataType = ContextInitializationHelper.buildDefaultTypeState(configuration, attributeModels, DamDomain.ENTITY_TYPES_ENUM.DATA)
    // 2 - Compute initial facets state
    const facets = ContextInitializationHelper.buildFacetsState(configuration, attributeModels)
    // 4 - complete default state to provide data and dataset type in results views
    const defaultContext = {
      ...UIDomain.ResultsContextConstants.DEFAULT_RESULTS_CONTEXT,
      tabs: {
        ...UIDomain.ResultsContextConstants.DEFAULT_RESULTS_CONTEXT.tabs,
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          ...UIDomain.ResultsContextConstants.DEFAULT_RESULTS_CONTEXT.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS],
          facets,
          search: ContextInitializationHelper.buildSearchState(moduleId, UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS, configuration.criteriaGroups, attributeModels),
          criteria: {
            ...UIDomain.ResultsContextConstants.DEFAULT_RESULTS_CONTEXT.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].criteria,
            configurationRestrictions: ContextInitializationHelper.buildConfigurationCriteria(configuration.restrictions),
            requestFacets: facets.enabled ? facets.list : [],
          },
          types: {
            [DamDomain.ENTITY_TYPES_ENUM.DATA]: dataType,
            [DamDomain.ENTITY_TYPES_ENUM.DATASET]: ContextInitializationHelper.buildDefaultTypeState(
              configuration, attributeModels, DamDomain.ENTITY_TYPES_ENUM.DATASET),
          },
        },
        [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
          ...UIDomain.ResultsContextConstants.DEFAULT_RESULTS_CONTEXT.tabs[UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS],
          facets,
          search: ContextInitializationHelper.buildSearchState(moduleId, UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS, configuration.criteriaGroups, attributeModels),
          criteria: {
            ...UIDomain.ResultsContextConstants.DEFAULT_RESULTS_CONTEXT.tabs[UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS].criteria,
            requestFacets: facets.enabled ? facets.list : [],
          },
          types: {
            [DamDomain.ENTITY_TYPES_ENUM.DATA]: dataType,
            [DamDomain.ENTITY_TYPES_ENUM.DATASET]: UIDomain.ResultsContextConstants.DISABLED_TYPE_STATE,
          },
        },
      },
    }
    // update initial type in results tags
    UIDomain.RESULTS_LIST_TABS.forEach((tabType) => {
      const resultTab = defaultContext.tabs[tabType]
      // algorithm: keep the first enable type by preference order or default to DATA
      resultTab.selectedType = UIDomain.ResultsContextConstants.RESULTS_INITIAL_TYPE_PREFERENCE.find(
        (type) => resultTab.types[type].enabled) || DamDomain.ENTITY_TYPES_ENUM.DATA
    })
    return defaultContext
  }
}
