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
import size from 'lodash/size'
import values from 'lodash/values'
import { CatalogShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/components'
import { StringComparison } from '@regardsoss/form-utils'
import { DatasetAttributesArrayForGraph } from '../../shapes/DatasetAttributesForGraph'
import { DescriptionProperties } from '../../shapes/DescriptionProperties'
import DatasetItemContainer from '../../containers/user/DatasetItemContainer'
import CollectionItemContainer from '../../containers/user/CollectionItemContainer'
import GraphLevelLoadingDisplayer from './GraphLevelLoadingDisplayer'
import GraphLevelMessageDisplayer from './GraphLevelMessageDisplayer'

/**
* A collection content displayer: shows the collections and datasets within root collection
*/
class GraphLevelDisplayer extends React.Component {
  static propTypes = {
    graphDatasetAttributes: DatasetAttributesArrayForGraph.isRequired, // graph dataset attributes, required, but empty array is allowed
    descriptionProperties: DescriptionProperties.isRequired, // From description HOC
    isShowable: PropTypes.bool.isRequired, // is showable in current state?
    isLoading: PropTypes.bool.isRequired, // is loading
    isLastLevel: PropTypes.bool.isRequired, // is last level?
    hasError: PropTypes.bool.isRequired, // has fetch error
    collections: CatalogShapes.EntityList.isRequired,
    datasets: CatalogShapes.EntityList.isRequired,
    levelIndex: PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * Compares entities (-used)
   * @param {Entity} entity1 first entity
   * @param {Entity} entity2 second entity
   * @return {number} 1 if entity 1 is greater than entity 2, - 1 if it is lower, 0 if both entities are equal
   */
  static compareEntities({ content: { label: l1 } }, { content: { label: l2 } }) {
    return StringComparison.compare(l1, l2)
  }

  render() {
    const {
      graphDatasetAttributes, descriptionProperties, isShowable, isLoading,
      isLastLevel, hasError, collections, datasets, levelIndex,
    } = this.props
    const { user } = this.context.moduleTheme
    // note: is loading and has error are strictly exclusive (cannot be true at same time)
    const hasContent = size(collections) + size(datasets) > 0
    return (
      <ShowableAtRender show={isShowable}>
        <div style={user.level.styles}>
          <ShowableAtRender show={isLoading}>
            <GraphLevelLoadingDisplayer />
          </ShowableAtRender>
          <ShowableAtRender show={!isLoading && hasError}>
            <GraphLevelMessageDisplayer messageKey="search.graph.level.fetch.model.failed" />
          </ShowableAtRender>
          <ShowableAtRender show={!isLoading && !hasError && !hasContent}>
            <GraphLevelMessageDisplayer messageKey="search.graph.level.no.model" />
          </ShowableAtRender>
          <ShowableAtRender show={!isLoading && !hasError && hasContent}>
            { // collections
              values(collections).sort(GraphLevelDisplayer.compareEntities).map((collection) => (<CollectionItemContainer
                key={collection.content.id}
                collection={collection}
                descriptionProperties={descriptionProperties}
                levelIndex={levelIndex}
                isLastLevel={isLastLevel}
              />))
            }
            { // datasets
              values(datasets).sort(GraphLevelDisplayer.compareEntities).map((dataset) => (<DatasetItemContainer
                key={dataset.content.id}
                dataset={dataset}
                graphDatasetAttributes={graphDatasetAttributes}
                descriptionProperties={descriptionProperties}
                levelIndex={levelIndex}
              />))
            }
          </ShowableAtRender>
        </div>
      </ShowableAtRender>
    )
  }
}
export default GraphLevelDisplayer
