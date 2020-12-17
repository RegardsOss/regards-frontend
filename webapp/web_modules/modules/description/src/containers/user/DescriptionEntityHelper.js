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
import get from 'lodash/get'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import isString from 'lodash/isString'
import root from 'window-or-global'
import reduce from 'lodash/reduce'
import {
  CatalogDomain, CommonDomain, DamDomain, UIDomain,
} from '@regardsoss/domain'
import { StringComparison } from '@regardsoss/form-utils'
import { getTypeRender } from '@regardsoss/attributes-common'
import { BROWSING_SECTIONS_ENUM } from '../../domain/BrowsingSections'

/**
 * Helper to pack entity and tags, given module configuration, for displaying in description module
 * @author Raphaël Mechali
 */
export class DescriptionEntityHelper {
  /**
   * Fetched model attribute models map by model name (buffer avoiding to re-fetch known data)
   * Each map entry contains the following fields:
   * modelAttributes: model attributes map, where elements are matching DataManagementShapes.AttributeModel
   * failed: has model attributes fetching failed
   */
  static FETCHED_MODELS_MAP = { }

  /**
   * Builds simple loading model for entity as parameter
   * @param {*} entity entity
   * @return {*} built loading model for entity, matching DescriptionState.DescriptionEntity
   */
  static buildLoadingModel(entity) {
    return {
      entity,
      loading: true,
      modelRetrievalFailed: false,
      invalid: false,
      selectedTreeEntry: {
        section: BROWSING_SECTIONS_ENUM.PARAMETERS,
        child: null,
      },
      displayModel: {
        attributesGroups: [],
        descriptionFiles: [],
        quicklookFiles: [],
        otherFiles: [],
        wordTags: [],
        couplingTags: [],
        linkedEntities: [],
        linkedDocuments: [],
      },
    }
  }

  /**
   * Converts model attributes into a simple attributes map
   * @param {*} modelAttributes map of model attributes by ID. Each map entry matches DataManagementShapes.ModelAttribute shape
   * @return {*} map of model attributes by ID where each entry match DataManagementShapes.AttributeModel
   */
  static toSimpleAttributesMap(modelAttributes = {}) {
    return reduce(modelAttributes, (acc, { content: { attribute } }) => ({
      ...acc,
      [attribute.id]: {
        content: {
          ...attribute,
        },
      },
    }), {})
  }

  /**
   * Resolves description entity for model as parameter (usually a loading description entity)
   * @param {*} moduleConfiguration module configuration matching ModuleConfiguration shape
   * @param {*} descriptionEntity description entity model matching DescriptionState.DescriptionEntity
   * @param {*} uiSettings matching UIShapes.UISettings
   * @param {function} fetchEntity function to fetch an entity: (id) => Promise
   * @param {function} fetchModelAttributes function to fetch model attributes on model name: (name) => Promise
   * @param {string} accessToken when there is one
   * @param {string} projectName current project (tenant) name
   * @param {*} descriptionUpdateGroupId promise group ID, that must be returned for concurrency management
   * @return {Promise} entity resolution promise, that returns an object like {descriptionEntity: {*}, descriptionUpdateGroupId}
   */
  static resolveDescriptionEntity(
    moduleConfiguration, descriptionEntity, uiSettings,
    fetchEntity, fetchModelAttributes, accessToken, projectName,
    descriptionUpdateGroupId) {
    const { entity: { content: { tags, model: modelName } } } = descriptionEntity
    // 1 - resolve all tags (apply tags filter from configuration)
    return new Promise(resolve => Promise.all(tags
      .map(tag => DescriptionEntityHelper.resolveEntityTag(tag, fetchEntity))).then((resolvedTags) => {
      // 2 - Retrieve or fetch model (prepare functions with local parameters)
      /**
       * Resolves with found model attributes or failure
       * @param {*} attributes map of resolved attributes, matching AttributeModelList
       * @param {boolean} modelRetrievalFailed has restrieval failed?
       */
      function resolveModelAttributes(modelAttributes = {}, modelRetrievalFailed = true) {
        // store model attributes
        DescriptionEntityHelper.FETCHED_MODELS_MAP[modelName] = {
          modelAttributes,
          failed: false,
        }
        // resolve entity display model
        resolve({
          descriptionEntity: DescriptionEntityHelper.buildFullDescriptionEntity(
            uiSettings, moduleConfiguration, modelAttributes, descriptionEntity,
            resolvedTags, accessToken, projectName, modelRetrievalFailed),
          descriptionUpdateGroupId,
        })
      }
      const bufferingMapEntry = DescriptionEntityHelper.FETCHED_MODELS_MAP[modelName]
      if (bufferingMapEntry) {
        // 2.1 - Locally buffered, skip fetching model
        resolveModelAttributes(bufferingMapEntry.modelAttributes, bufferingMapEntry.failed)
      } else {
      // 2.2 - Locally unknown, fetch model
        fetchModelAttributes(modelName)
          .then(({ payload, meta }) => {
            const fetchedModelAttributes = get(payload, 'entities.modelattribute')
            resolveModelAttributes(DescriptionEntityHelper.toSimpleAttributesMap(fetchedModelAttributes), meta.status >= 400)
          }).catch(resolveModelAttributes)
      }
    }))
  }

  /**
   * Resolves an entity tag through a promise
   * @param {string} tag
   * @param {function} fetchEntity function to an entity, like (id) => Promise
   * @return {Promise} resolution promise, that provides an entity (without content / links)
   */
  static resolveEntityTag(tag, fetchEntity) {
    if (CatalogDomain.TagsHelper.isURNTag(tag)) {
      // 1 - resolve entity or fallback on null value
      return new Promise((resolve) => {
        // 1.a - is it in known entities list
        fetchEntity(tag)
          .then(({ payload }) => {
            if (payload.error || !payload.content || !payload.content.id) { // retrieval failure
              resolve(null) // failed silently
            }
            // No resolution error: is it a model refused by configuration?
            return STATIC_CONF.ENTITY_DESCRIPTION.TAGS.MODEL_NAME_FILTERS.some(exclusionPattern => exclusionPattern.test(payload.content.model))
              ? resolve(null) // yes: resolve none
              : resolve(payload) // no: return retrieved entity
          })
          .catch(() => resolve(null)) // failed with network error
      })
    }
    // 2 - simple word, immediately resolved
    return new Promise(resolve => resolve(tag))
  }

  /**
   * Packs entity with
   * @param {*} uiSettings matching UIShapes.UISettings
   * @param {*} moduleConfiguration module configuration matching ModuleConfiguration shape
   * @param {*} attributes model attributes map as DataManagementShapes.AttributeModelList
   * @param {*} descriptionEntity description entity model matching DescriptionState.DescriptionEntity
   * @param {string|*} tags resolved tags, containing either word tags or elements matching CatalogShapes.Entity
   * @param {string} accessToken when there is one
   * @param {string} projectName current project (tenant) name
   * @param {boolean} modelRetrievalFailed has model retrieval failed?
   * @return {*} build display model, matching DescriptionState.DescriptionEntity shape
   */
  static buildFullDescriptionEntity(
    uiSettings, moduleConfiguration, attributes, descriptionEntity,
    tags, accessToken, projectName, modelRetrievalFailed) {
    const { entity, displayModel: initialDisplayModel } = descriptionEntity
    const typeConfiguration = moduleConfiguration[
      UIDomain.isDocumentEntity(uiSettings, entity)
        ? UIDomain.PSEUDO_TYPES_ENUM.DOCUMENT // use document pseudo type configuration
        : entity.content.entityType // use entity type configuration
    ]
    const hasValidConfiguration = get(typeConfiguration, 'showDescription', false)
    return {
      ...descriptionEntity,
      loading: false,
      invalid: !hasValidConfiguration,
      modelRetrievalFailed,
      displayModel: hasValidConfiguration ? {
        // compile to display model when configuration is valid
        attributesGroups: DescriptionEntityHelper.filterAndConvertGroups(typeConfiguration, attributes, entity),
        descriptionFiles: DescriptionEntityHelper.packDescriptionFiles(typeConfiguration, attributes, entity, accessToken, projectName),
        otherFiles: DescriptionEntityHelper.packOtherFiles(entity, accessToken, projectName),
        // pack images (thumbnail and quicklook files) in corresponding fields
        ...DescriptionEntityHelper.packPictures(typeConfiguration, uiSettings.primaryQuicklookGroup, entity, accessToken, projectName),
        // packs tags in corresponding fields
        ...DescriptionEntityHelper.splitAndSortTags(uiSettings, typeConfiguration, tags),
      } : initialDisplayModel, // default to initial display model
    }
  }

  /**
    * Extracts available attributes groups from configuration and model attributes then provide runtime group shapes their current value and render
    * @param {DescriptionConfiguration} typeConfiguration configuration for entity type
    * @param {*} attributes model attributes map as DataManagementShapes.AttributeModelList
    * @param {*} entity matching CatalogShapes.Entity
    * @return [*] filtered groups array containing resolved attributes and thumbnail configuration for
    * child component
    */
  static filterAndConvertGroups(typeConfiguration, attributes, entity) {
    // for each group: convert and filter attributes. If at least one can be retrieved, keep the group, remove it otherwise
    return typeConfiguration.groups.reduce((acc, { showTitle, title, elements }, index) => {
      // 1 - retain attributes that can be found in model attributes list
      const convertedElements = DescriptionEntityHelper.filterAndConvertElements(elements, typeConfiguration.hideEmptyAttributes, attributes, entity)
      if (convertedElements.length) { // that group has available attributes for current model, show it
        return [...acc, {
          key: `group.${index}`,
          showTitle,
          title,
          elements: convertedElements,
        }]
      }
      return acc // this group has no available attribute for current model, hide it
    }, [])
  }

  /**
   * Converts and filter group rows: when attributes could be retrieve, provided elements resolved for runtime. Filter them otherwise
   * @param {*} elements group rows, from module configuration
    * @param {boolean} hideEmptyAttributes should hide empty value attributes?
   * @param {*} attributes model attributes map as DataManagementShapes.AttributeModelList
   * @param {*} entity matching CatalogShapes.Entity
   * @return {[*]} filtered group elements as an array of NavigationTree.AttributeGroup
   */
  static filterAndConvertElements(elements, hideEmptyAttributes, attributes, entity) {
    return elements.reduce((acc, element, index) => {
      const convertedElement = DescriptionEntityHelper.filterOrConvertElement(element, hideEmptyAttributes, attributes, entity, index)
      return convertedElement
        ? [...acc, convertedElement] // some attributes in that group row could be retrieved, retain it
        : acc // no attribute in that group row could be retrieve, remove it
    }, [])
  }


  /**
   * Filters or convert a single group row: when some attributes can be retrieved,
   *  converts the element into runtime displayable attributes row. Filters the row otherwise
   * @param {*} element group row, from module configuration
   * @param {boolean} hideEmptyAttributes should hide empty value attributes?
   * @param {*} attributes model attributes map as DataManagementShapes.AttributeModelList
   * @param {*} entity matching CatalogShapes.Entity
   * @param {number} index group row index (used to build key)
   * @return {*} A displayable row as NavigationTree.DisplayableGroupRow
   */
  static filterOrConvertElement({ label, attributes: confAttributes }, hideEmptyAttributes, attributes, entity, index) {
    // A - retrieve all attributes and their render data
    const convertedAttributes = confAttributes.reduce((acc, { name, renderer }) => {
      const model = DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(name, attributes)
      // 1- retrieve attribute model
      if (model) {
        // attribute model is part of the current entity model
        const {
          content: {
            type, jsonPath, precision, unit,
          },
        } = model
        // 2. retrieve value
        const value = DamDomain.AttributeModelController.getEntityAttributeValue(entity, jsonPath)
        // Return that value displayer if, by configuration, empty values should be shown OR if its value is not empty
        const isEmptyValue = isNil(value) || ((isString(value) || isArray(value)) && isEmpty(value))
        if (!hideEmptyAttributes || !isEmptyValue) {
          // both model and value OK, return render-ready attribute
          return [...acc, {
            key: jsonPath,
            render: {
              Constructor: getTypeRender(type, renderer),
              props: {
                value: DamDomain.AttributeModelController.getEntityAttributeValue(entity, jsonPath),
                precision,
                unit,
              },
            },
          }]
        }
        // other cases: that attribute value should not be shown
      }
      // filter that attribute as it has no available model
      return acc
    }, [])
    return convertedAttributes.length ? {
      key: `element.${index}`,
      label,
      displayedAttributes: convertedAttributes,
    } : null
  }

  /**
   * Converts entity files into common description file data elements
   * @param {*} entity entity
   * @param {*} fileDataType file data
   * @param {string} accessToken when there is one
   * @param {string} projectName current project (tenant) name
   * @return {[*]} converted files matching DescriptionState.FileData
   */
  static toFileData(entity, fileDataType, accessToken, projectName) {
    const uriOriginParam = `&origin=${root.location.protocol}//${root.location.host}`
    return get(entity.content, `files.${fileDataType}`, []).map(dataFile => ({
      label: dataFile.filename,
      available: DamDomain.DataFileController.isAvailableNow(dataFile),
      // append token / project when data file is not a reference. Also add this location to bypass cross domain issues
      uri: `${DamDomain.DataFileController.getFileURI(dataFile, accessToken, projectName)}${dataFile.reference ? '' : uriOriginParam}`,
    }))
  }

  /**
   * Packs thumbnail and quicklooks files for display model when it should be displayed
   * @param {*} typeConfiguration entity type configuration (see ModuleConfiguration.DescriptionConfiguration)
   * @param {string} primaryQLGroupKey primary quicklooks group key
   * @param {*} entity matching CatalogShapes.Entity
   * @param {*} attributes model attributes map as DataManagementShapes.AttributeModelList
   * @param {string} accessToken when there is one
   * @param {string} projectName current project (tenant) name
   * @return {{thumbnail: *, quicklookFiles: [*]}} entity picture file fields: thumbnail as DataManagementShapes.DataFile
   * and quicklookFiles as an array of UIShapes.QuicklookDefinition
   */
  static packPictures(typeConfiguration, primaryQuicklookGroup, entity, accessToken, projectName) {
    // Compute quicklook
    const quicklookFiles = UIDomain.QuicklookHelper.getQuicklooksIn(entity, primaryQuicklookGroup, accessToken, projectName)
    let thumbnailFile = null
    if (typeConfiguration.showThumbnail) {
      // A - try to find a direct thumbnail file
      thumbnailFile = UIDomain.ThumbnailHelper.getThumbnail(
        get(entity, `content.files.${CommonDomain.DATA_TYPES_ENUM.THUMBNAIL}`), accessToken, projectName)
      if (!thumbnailFile) {
        // B - Fallback onto a quicklook
        thumbnailFile = UIDomain.ThumbnailHelper.getQuicklookFallback(quicklookFiles)
      }
    }
    return {
      thumbnail: thumbnailFile ? {
        label: thumbnailFile.filename,
        available: true, // selected file is always available
        uri: thumbnailFile.uri,
      } : null,
      quicklookFiles,
    }
  }

  /**
   * Packs description files to show for the entity and configuration as parameter
   * @param {*} typeConfiguration entity type configuration (see ModuleConfiguration.DescriptionConfiguration)
   * @param {*} entity matching CatalogShapes.Entity
   * @param {*} attributes model attributes map as DataManagementShapes.AttributeModelList
   * @param {string} accessToken when there is one
   * @param {string} projectName current project (tenant) name
   * @return [*] array of description files as NavigationTree.DescriptionFile
   */
  static packDescriptionFiles(typeConfiguration, attributes, entity, accessToken, projectName) {
    return [
      // map attributes configured as description files (single attribute configurations)
      ...typeConfiguration.attributeToDescriptionFiles.map(({ attributes: [attribute] }) => {
        // 1 - retrieve attribute model
        const model = DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(attribute.name, attributes)
        if (model) {
          const { content: { type, jsonPath } } = model
          // 2 - check it is (still) an URL attribute
          if (type === DamDomain.MODEL_ATTR_TYPES.URL) {
            // 3 - retrieve its value in current entity
            const attributeValue = DamDomain.AttributeModelController.getEntityAttributeValue(entity, jsonPath)
            if (attributeValue) {
              // 4 - Bundle as a NavigationTree.DescriptionFile
              const { uri, name } = DamDomain.URLAttributeHelper.parseURIValue(attributeValue)
              return {
                label: name,
                available: true,
                uri: DamDomain.DataFileController.getURI(uri, true, accessToken, projectName),
              }
            }
          }
          return null
        }
        return null // cannot be resolved
      }).filter(f => !!f),
      // map entity native description files
      ...DescriptionEntityHelper.toFileData(entity, CommonDomain.DATA_TYPES_ENUM.DESCRIPTION, accessToken, projectName),
    ]
  }

  /**
   * Packs entity other files and sorts them
   * @param {*} entity matching CatalogShapes.Entity
   * @param {string} accessToken when there is one
   * @param {string} projectName current project (tenant) name
   * @return {[*]} other files to display in description, as an array of DataManagementShapes.DataFile
   */
  static packOtherFiles(entity, accessToken, projectName) {
    // Files to show: documents or raw data files (in standard cases, an entity should not have both)
    return [
      ...DescriptionEntityHelper.toFileData(entity, CommonDomain.DATA_TYPES_ENUM.RAWDATA, accessToken, projectName),
      ...DescriptionEntityHelper.toFileData(entity, CommonDomain.DATA_TYPES_ENUM.DOCUMENT, accessToken, projectName),
      ...DescriptionEntityHelper.toFileData(entity, CommonDomain.DATA_TYPES_ENUM.OTHER, accessToken, projectName),
    ].sort((f1, f2) => StringComparison.compare(f1.label, f2.label))
  }

  /**
   * Splits and sorts tags (filters elements hidden by configuration)
   * @param {*} uiSettings matching UIShapes.UISettings
   * @param {*} typeConfiguration entity type configuration (see ModuleConfiguration.DescriptionConfiguration)
   * @param {string|*} tags resolved tags, containing either word tags or elements matching CatalogShapes.Entity
   * @return { wordTags: [string], couplingTags: [string], linkedEntities: [*], linkedDocuments: [*]} where linked entities
   * and documents match CatalogShape.Entity
   */
  static splitAndSortTags(uiSettings, typeConfiguration, tags) {
    const {
      showTags, showCoupling, showLinkedDocuments, showLinkedEntities,
    } = typeConfiguration
    const {
      wT: wordTags, cT: couplingTags, lE: linkedEntities, lD: linkedDocuments,
    } = tags.reduce((acc, resolvedTag) => {
      if (resolvedTag) {
        if (isString(resolvedTag)) {
          // 1 - simple word or coupling tag
          if (CatalogDomain.TagsHelper.isCouplingTag(resolvedTag)) {
            return showCoupling ? { ...acc, cT: [...acc.cT, resolvedTag] } : acc
          }
          return showTags ? { ...acc, wT: [...acc.wT, resolvedTag] } : acc
        }
        // 2 - An entity tag (document or any)
        // 2.a - Is it a pseudo type document?
        if (UIDomain.isDocumentEntity(uiSettings, resolvedTag)) {
          // yes (found in UI settings document models)
          return showLinkedDocuments ? { ...acc, lD: [...acc.lD, resolvedTag] } : acc
        }
        // no: any entity type
        return showLinkedEntities ? { ...acc, lE: [...acc.lE, resolvedTag] } : acc
      }
      return acc
    }, {
      wT: [], cT: [], lE: [], lD: [],
    })
    return {
      wordTags: wordTags.sort(StringComparison.compare),
      couplingTags: couplingTags.sort((cT1, cT2) => {
        const { label: l1 } = CatalogDomain.TagsHelper.parseCouplingTag(cT1)
        const { label: l2 } = CatalogDomain.TagsHelper.parseCouplingTag(cT2)
        return StringComparison.compare(l1, l2)
      }),
      linkedEntities: linkedEntities.sort((e1, e2) => StringComparison.compare(e1.content.label, e2.content.label)),
      linkedDocuments: linkedDocuments.sort((e1, e2) => StringComparison.compare(e1.content.label, e2.content.label)),
    }
  }
}
