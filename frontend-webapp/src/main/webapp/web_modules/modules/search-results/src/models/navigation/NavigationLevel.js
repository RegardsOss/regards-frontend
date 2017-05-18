/**
* LICENSE_PLACEHOLDER
**/
import flatten from 'lodash/flatten'
import { getDatasetIpIdParameter, getSearchTagParameter } from '../../definitions/query/QueriesHelper'

export default class NavigationLevel {

  static LevelTypes = {
    ROOT: 'root',
    SEARCH_TAG: 'search.tag',
    DATASET: 'dataset',
  }

  /**
   * Builds a dataset level
   * @param {*} datasetIpId dataset IP ID
   * @param {*} datasetLabel  dataset label
   */
  static buildDatasetLevel(datasetIpId, datasetLabel) {
    return new NavigationLevel(NavigationLevel.LevelTypes.DATASET, datasetLabel, getDatasetIpIdParameter(datasetIpId), datasetIpId)
  }

  /**
   * Builds a search tag level
   * @param {*} searchTag searchtag
   */
  static buildSearchTagLevel(searchTag) {
    return new NavigationLevel(NavigationLevel.LevelTypes.SEARCH_TAG, searchTag, getSearchTagParameter(searchTag), searchTag)
  }

  /**
   * Builds root level
   * @param {*} rootLabel root level label
   */
  static buildRootLevel(rootLabel) {
    return new NavigationLevel(NavigationLevel.LevelTypes.ROOT, rootLabel)
  }

  /**
   * Returns level by level type
   * @param {*} levels levels array
   * @param {*} levelType  level type
   * @return found level or undefined
   */
  static getLevel(levels, levelType) {
    return levels.find(({ levelType: currentLevelType }) => currentLevelType === levelType)
  }

  /**
   * Returns dataset level
   * @param {*} levels levels array
   * @return found level or undefined
   */
  static getDatasetLevel = levels => NavigationLevel.getLevel(levels, NavigationLevel.LevelTypes.DATASET)

  /**
   * Returns dataset level
   * @param {*} levels levels array
   * @return found level or undefined
   */
  static getSearchTagLevel = levels => NavigationLevel.getLevel(levels, NavigationLevel.LevelTypes.SEARCH_TAG)


  /**
   * Returns query parameters from current levels
   * @param levels navigation level array
   * @return parameters to apply in query for the current navigation context
   */
  static getQueryParameters = levels => flatten(levels.map(({ searchParameters }) => searchParameters))

  /**
   * Constructor
   * @param {string} levelType level type from LevelTypes
   * @param {string} label label
   * @param {array} searchParameters search parameters array for this level (or empty array)
   * @param {string} levelValue opional level value
   */
  constructor(levelType, label, searchParameters = [], levelValue = '') {
    this.levelType = levelType
    this.label = label
    this.searchParameters = searchParameters
    this.levelValue = levelValue
  }


}

