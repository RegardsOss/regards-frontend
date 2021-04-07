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
import get from 'lodash/get'
import { browserHistory } from 'react-router'
import { UIDomain, CatalogDomain, DamDomain } from '@regardsoss/domain'
import isEmpty from 'lodash/isEmpty'
import { CriterionBuilder } from '../../../definitions/CriterionBuilder'

/**
 * Helper to export / restore results context to / from URL / local storage
 * @author Raphaël Mechali
 */
export class ContextStorageHelper {
  /** The local storage key for context storage */
  static LOCAL_STORAGE_KEY = 'resultsContext'

  /**
   * Builds a tag from its searchKey: when tag is an URN, build unresolved tag model. Build simple word tag otherwise
   * @param {string} searchKey tag search key
   * @return {*} tag, matching ResultsContext.TagCriterion shape
   */
  static buildTagFrom(searchKey) {
    return CatalogDomain.TagsHelper.isURNTag(searchKey)
      ? CriterionBuilder.buildUnresolvedEntityTagCriterion(searchKey)
      : CriterionBuilder.buildWordTagCriterion(searchKey)
  }

  /**
   * module parameters serialization management. Each parameter defines:
   * - name: parameter name in URL / local storage state
   * - toParameterValue: Value to push for parameter  (recovered in resultsContext)
   * resultsContext: value: * => string (optional)
   * - fromParameterValue: resultsContext, value => resultsContextDiff
   */
  static MODULE_URL_PARAMETERS = [
    // selected tab
    {
      name: 't',
      toParameterValue: (resultsContext) => resultsContext.selectedTab,
      fromParameterValue: (resultsContext, selectedTab) => ({ selectedTab }),
    }, { // main results entities type
      name: 'rt',
      toParameterValue: (resultsContext) => resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].selectedType,
      fromParameterValue: (resultsContext, selectedType) => ({
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: { selectedType },
        },
      }),
    }, { // main results toponym businessId
      name: 'rtp',
      toParameterValue: (resultsContext) => {
        const { search: { enabled }, criteria: { toponymCriteria } } = resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]
        return enabled && toponymCriteria.length // serialize with short field names
          ? JSON.stringify(toponymCriteria.map(({ requestParameters }) => ({
            r: requestParameters,
          }))) : null
      },
      fromParameterValue: (resultsContext, serializedState) => {
        const { search: { enabled } } = resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]
        return {
          tabs: {
            [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
              criteria: {
                toponymCriteria: enabled ? JSON.parse(serializedState).map(({ r }) => ({
                  requestParameters: r,
                })) : [],
              },
            },
          },
        }
      },
    }, { // main results display mode
      name: 'rd',
      toParameterValue: (resultsContext) => {
        const resultsTab = resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]
        return resultsTab.types[resultsTab.selectedType].selectedMode
      },
      fromParameterValue: (resultsContext, selectedMode) => {
        const resultsTabType = get(resultsContext, `tabs.${UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS}.selectedType`, DamDomain.ENTITY_TYPES_ENUM.DATA)
        return {
          tabs: {
            [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
              types: {
                [resultsTabType]: { selectedMode },
              },
            },
          },
        }
      },
    }, { // main results user filters
      name: 'rf',
      toParameterValue: (resultsContext) => {
        const resultsTab = resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]
        const { tagsFiltering } = resultsTab.criteria
        // optional filter tag
        return tagsFiltering.length ? tagsFiltering[0].searchKey : null
      },
      fromParameterValue: (resultsContext, searchKey) => ({
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
            criteria: {
              tagsFiltering: [ContextStorageHelper.buildTagFrom(searchKey)],
            },
          },
        },
      }),
    }, { // main tab: Search pane Open state
      name: 'mso',
      toParameterValue: (resultsContext) => {
        const { search: { enabled, open } } = resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]
        return enabled && open ? open.toString() : null
      },
      fromParameterValue: (resultsContext) => {
        const { search: { enabled } } = resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]
        return {
          tabs: {
            [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
              search: {
                open: enabled, // true when present, no need to read it from URL. Prevent opening it when disabled by configuration
              },
            },
          },
        }
      },
    }, { // main tab: Search State
      name: 'mss',
      toParameterValue: (resultsContext) => {
        const { search: { enabled }, criteria: { searchCriteria } } = resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]
        return enabled && searchCriteria.length // serialize with short field names
          ? JSON.stringify(searchCriteria.map(({ pluginInstanceId, state, requestParameters }) => ({
            i: pluginInstanceId,
            s: state,
            r: requestParameters,
          }))) : null
      },
      fromParameterValue: (resultsContext, serializedState) => {
        const { search: { enabled } } = resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]
        return {
          tabs: {
            [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
              criteria: {
                searchCriteria: enabled ? JSON.parse(serializedState).map(({ i, s, r }) => ({
                  pluginInstanceId: i,
                  state: s,
                  requestParameters: r,
                })) : [],
              },
            },
          },
        }
      },
    }, {
      name: 'mmv',
      toParameterValue: (resultsContext) => {
        const resultsTab = resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]
        return resultsTab.types[resultsTab.selectedType].modes[UIDomain.RESULTS_VIEW_MODES_ENUM.MAP].viewMode
      },
      fromParameterValue: (resultsContext, viewMode) => {
        const resultsTab = resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]
        return {
          tabs: {
            [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
              types: {
                [resultsTab.selectedType]: {
                  modes: {
                    [UIDomain.RESULTS_VIEW_MODES_ENUM.MAP]: {
                      viewMode,
                    },
                  },
                },
              },
            },
          },
        }
      },
    }, { // entity description state
      name: 'eds',
      toParameterValue: (resultsContext) => {
        const { descriptionPath, selectedIndex } = resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]
        if (!descriptionPath.length || selectedIndex >= descriptionPath.length || !descriptionPath[selectedIndex].selectedTreeEntry) return null
        const { selectedTreeEntry: { section, child } } = descriptionPath[selectedIndex]
        return `${section}${child || child === 0 ? `,${child}` : ''}`
      },
      fromParameterValue: (resultsContext, eds) => {
        const split = eds.split(',')
        return {
          tabs: {
            [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
              unresolvedTreeEntry: {
                section: split[0],
                child: split.length === 2 && !Number.isNaN(split[1]) ? Number(split[1]) : null,
              },
            },
          },
        }
      },
    }, { // description entity
      name: 'd',
      toParameterValue: (resultsContext) => {
        const { descriptionPath, selectedIndex } = resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]
        // optional description path
        return descriptionPath.length ? descriptionPath[selectedIndex].entity.content.id : null
      },
      fromParameterValue: (resultsContext, entityID) => ({
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: {
            unresolvedRootEntityId: entityID, // store it for later restoration
            descriptionPath: [],
            selectedIndex: 0,
          },
        },
      }),
    }, { // tag view main tag
      name: 'st',
      toParameterValue: (resultsContext) => {
        const tagsTab = resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]
        const { contextTags } = tagsTab.criteria
        // view is hidden when there is no context tag
        return contextTags.length ? contextTags[0].searchKey : null
      },
      fromParameterValue: (resultsContext, searchKey) => ({
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
            criteria: { // restore context tag
              contextTags: [ContextStorageHelper.buildTagFrom(searchKey)],
            },
          },
        },
      }),
    }, { // tag view display mode
      name: 'td',
      toParameterValue: (resultsContext) => {
        const tagsTab = resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]
        const { contextTags } = tagsTab.criteria
        // view is hidden when there is no context tag (do no append in URL when hidden)
        return contextTags.length ? tagsTab.types[tagsTab.selectedType].selectedMode : null
      },
      fromParameterValue: (resultsContext, selectedMode) => ({
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
            types: {
              [DamDomain.ENTITY_TYPES_ENUM.DATA]: { selectedMode },
            },
          },
        },
      }),
    }, { // tag view user filter
      name: 'tf',
      toParameterValue: (resultsContext) => {
        const tagsTab = resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]
        const { contextTags, tagsFiltering } = tagsTab.criteria
        // user filtering tag, when view is visible (has context tag)
        return contextTags.length && tagsFiltering.length ? tagsFiltering[0].searchKey : null
      },
      fromParameterValue: (resultsContext, searchKey) => ({
        tabs: {
          [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: {
            criteria: { // restore as user tag
              tagsFiltering: [ContextStorageHelper.buildTagFrom(searchKey)],
            },
          },
        },
      }),
    }, { // Unactive static parameters
      name: 'usp',
      toParameterValue: (resultsContext) => CriterionBuilder.buildUnactiveStaticCriterionString(resultsContext),
      fromParameterValue: (resultsContext, unactiveStaticParametersAsString) => CriterionBuilder.buildUnactiveStaticCriterion(resultsContext, unactiveStaticParametersAsString),
    },
  ]

  /**
   *  This static parameter describes requests attributes statically provided to search context
   */
  static STATIC_PARAMETERS = {
    name: 'sp',
    toParameterValue: (resultsContext) => CriterionBuilder.buildStaticCriterionString(resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].criteria.staticParameters),
    fromParameterValue: (resultsContext, staticParameters) => ({
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: { criteria: { staticParameters: CriterionBuilder.buildStaticCriterion(staticParameters) } },
      },
    }),
  }

  /**
   * @param {*} query current browser query
   * @return {boolean} true when there is are results context parameters in URL, false otherwise
   */
  static hasURLResultsParameters(query) {
    return ContextStorageHelper.MODULE_URL_PARAMETERS.find(({ name }) => !isEmpty(query[name]))
  }

  /**
   * @return the list of dynamic and static parameters
   */
  static getAllParameters() {
    return [ContextStorageHelper.STATIC_PARAMETERS, ...ContextStorageHelper.MODULE_URL_PARAMETERS]
  }

  /**
   * Restores, when possible, applying context from adequate source (URL or local storage). Marks all
   * entities <em>unresolved</em>
   * @param {*} initContext int context or empty object, to be completed here
   * @return {*} restored results context (may be initial one if no source could be found)
   */
  static restore(initContext, project, moduleContextualKey) {
    const { query } = browserHistory.getCurrentLocation()
    // A - find resolution source (map holding saved values)
    let resolutionSource = {
      ...query, // URL: preferred (shared URL cases)
    }
    if (!ContextStorageHelper.hasURLResultsParameters(query)) {
      // when no DYNAMIC URL parameter, restore from local storage if there is some
      const stored = UIDomain.LocalStorageData.getData(UIDomain.APPLICATIONS_ENUM.USER, project, moduleContextualKey, ContextStorageHelper.LOCAL_STORAGE_KEY)
      if (stored) {
        resolutionSource = {
          ...resolutionSource, // any static parameter from query
          ...JSON.parse(stored), // dynamic data
        }
      }
    }
    // B.1 - Resolve static parameter
    const contextWithStaticParams = UIDomain.ResultsContextHelper.deepMerge(initContext,
      ContextStorageHelper.STATIC_PARAMETERS.fromParameterValue(initContext,
        resolutionSource[ContextStorageHelper.STATIC_PARAMETERS.name]))

    // B.2 - Resolve dynamic parameters
    return ContextStorageHelper.MODULE_URL_PARAMETERS.reduce(
      (previousContext, { name, fromParameterValue }) => {
        const parameterValue = resolutionSource[name]
        return isEmpty(parameterValue)
          ? previousContext
          : UIDomain.ResultsContextHelper.deepMerge(previousContext, fromParameterValue(previousContext, parameterValue))
      }, contextWithStaticParams)
  }

  /**
   * Builds query parameters for results context as parameter
   * @param {*} resultsContext results context
   * @param {*} currentQuery current query, to report parameters that are not handled by search-results module
   * @return {*} query parameters built for context
   */
  static buildURLQuery(resultsContext, currentQuery) {
    const contextQuery = { ...currentQuery }
    ContextStorageHelper.getAllParameters().forEach(({ name, toParameterValue }) => {
      const parameterValue = toParameterValue(resultsContext)
      if (isEmpty(parameterValue)) {
        delete contextQuery[name]
      } else {
        contextQuery[name] = parameterValue
      }
    })
    return contextQuery
  }

  /**
   * Builds object to be stored
   * @param {*} resultsContext results context
   **/
  static buildStorageObject(resultsContext) {
    return ContextStorageHelper.MODULE_URL_PARAMETERS.reduce((acc, { name, toParameterValue }) => {
      const parameterValue = toParameterValue(resultsContext)
      return isEmpty(parameterValue) ? acc : {
        ...acc,
        [name]: parameterValue,
      }
    }, {})
  }

  /**
   * Updates browser URL, to match new results context
   * @param {*} resultsContext new results context (ignored when incomplete)
   */
  static store(resultsContext, project, moduleContextualKey) {
    if (UIDomain.ResultsContextHelper.isFullContext(resultsContext)) {
      const { pathname, query: currentQuery } = browserHistory.getCurrentLocation()
      // 1 - Update query (required to delete now useless fields)
      browserHistory.replace({ pathname, query: ContextStorageHelper.buildURLQuery(resultsContext, currentQuery) })
      // 2 - Store a minimal version of the query (where)
      const toSave = JSON.stringify(ContextStorageHelper.buildStorageObject(resultsContext))
      UIDomain.LocalStorageData.saveData(UIDomain.APPLICATIONS_ENUM.USER, project, moduleContextualKey,
        ContextStorageHelper.LOCAL_STORAGE_KEY, toSave)
    }
  }

  static getModuleContextId(moduleId) {
    const { query: { sp: staticProperties } } = browserHistory.getCurrentLocation()
    let result = moduleId
    if (staticProperties) {
      result = `${moduleId}/${staticProperties}`
    }
    return result
  }
}
