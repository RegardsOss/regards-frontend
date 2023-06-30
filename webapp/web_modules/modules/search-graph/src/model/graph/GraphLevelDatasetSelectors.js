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
import get from 'lodash/get'
import includes from 'lodash/includes'
import keys from 'lodash/keys'
import memoize from 'lodash/memoize'
import omitBy from 'lodash/omitBy'
import some from 'lodash/some'
import { createSelector } from 'reselect'
import { BasicPartitionSelectors } from '@regardsoss/store-utils'
import { REDUCER_PATH } from './GraphLevelDatasetReducers'
import graphLevelCollectionsSelectors from './GraphLevelCollectionSelectors'

/**
 * Selector for level datasets in partitions
 */
class GraphLevelDatasetSelectors extends BasicPartitionSelectors {
  getDatasets(state, partitionKey) {
    const data = this.getData(state, partitionKey)
    return data && data.items ? data.items : {}
  }
}

const instance = new GraphLevelDatasetSelectors(['modules.search-graph', REDUCER_PATH])
export default instance

/**
 * Builds a predicate on a dataset, which returns true if it tags at least one collection in the given list
 *
 * @param {Object} collections An object of collections mapped by their ID
 * @returns {Function} Returns the built predicate
 * @author Xavier-Alexandre Brochard
 */
const tagsACollectionIn = (collections) => (dataset) => {
  const collectionIds = keys(collections)
  const tags = get(dataset, 'content.tags')
  return some(tags, (tag) => includes(collectionIds, tag))
}

/**
 * Builds a selector retrieving the datasets in the store located under [partitionKey].
 * The found datasets are then filtered in order to keep the terminal ones.
 * Terminal datasets are those which do not tag a collection at current level.
 *
 * @param {String} partitionKey Key in the redux store for current graph level
 * @returns {Function} Returns the built selector
 * @see https://thor.si.c-s.fr/gf/project/regards/tracker/?action=TrackerItemEdit&tracker_item_id=161595
 * @author Xavier-Alexandre Brochard
 */
const getTerminalDatasetsNotMemoized = (partitionKey) => createSelector(
  [(state) => instance.getDatasets(state, partitionKey), (state) => graphLevelCollectionsSelectors.getCollections(state, partitionKey)],
  (datasets, collections) => omitBy(datasets, tagsACollectionIn(collections)),
)

/**
 * Since [getTerminalDatasets] is a pure function (it only builds a selector), we can safely cache (by [partitionKey]) its results
 */
export const getTerminalDatasets = memoize(getTerminalDatasetsNotMemoized)
