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
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { isURNTag, TagTypes } from '@regardsoss/domain/catalog'

/**
 * A stackable search tag, displayed in top breadcrumb, with its type, label and key data
 */
class Tag {
  /** Tag values separator in local URL parameter */
  static TAG_VALUES_SEPARATOR = ','

  /**
   * Returns the tags parameter value
   * @param {*} tags tags list
   * @return exportable parameter value
   */
  static toURLParameterValue(tags) {
    return tags.map(({ searchKey }) => searchKey).join(Tag.TAG_VALUES_SEPARATOR)
  }

  /**
   * Parses tags from parameter value and returns the current tags list
   * @param {*} parameterValue search tags parameter value
   * @return {[string]} parsed parameters from URL parameter value
   */
  static fromURLParameterValue(parameterValue) {
    const definedParameter = parameterValue || ''
    return !definedParameter.length ? [] : definedParameter.split(Tag.TAG_VALUES_SEPARATOR)
  }

  /**
   * Returns a tag value resolution promise
   * @param {*} dispatchSearchEntity dispatch search entity (required for )
   * @param {*} tagValue tag value
   */
  static getTagPromise(dispatchSearchEntity, tagValue) {
    return isURNTag(tagValue)
      // 1 - An entity tag: resolve through fetching
      ? dispatchSearchEntity(tagValue).then(({ payload }) => {
        const { entityType, id, label } = get(payload, 'content', {})
        if (payload.error || !id) {
          throw new Error('Fetching entity failed')
        }
        return new Tag(entityType, label, id)
      }) // 2 - a word tag: return immediately resolved promise
      : new Promise((resolve, reject) => {
        resolve(new Tag(TagTypes.WORD, tagValue, tagValue))
      })
  }

  /**
   * Converts a description callback tag value into a local Tag model
   * @param {type: {TagTypes}, data: {string | Entity}} descriptionTag description callback value tag
   * @return {Tag} local Tag data
   */
  static fromDescriptionTag({ type, data }) {
    switch (type) {
      case TagTypes.WORD:
        // data is a simple word
        return new Tag(type, data, data)
      default:
        // data is an entity
        return new Tag(type, data.content.label, data.content.id)
    }
  }

  /**
   * Returns the innermost selected dataset IP ID if any
   * @param {*} tags tags
   * @return found tag or null
   */
  static getSearchedDatasetTag(tags) {
    return tags.reduce((acc, tag) => tag.isDataset() ? tag : acc, null)
  }

  /**
   * Constructor
   * @param {TagTypes} type
   * @param {string} label
   * @param {string} searchKey
   */
  constructor(type, label, searchKey) {
    this.type = type
    this.label = label
    this.searchKey = searchKey
  }

  /**
   * Is this tag a dataset tag?
   * @return {boolean} is this tag a dataset tag?
   */
  isDataset() {
    return this.type === ENTITY_TYPES_ENUM.DATASET
  }

  equal(otherTag) {
    return this.type === otherTag.type && this.searchKey === otherTag.searchKey
  }
}

module.exports = {
  Tag,
}
