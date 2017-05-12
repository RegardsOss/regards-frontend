/**
* LICENSE_PLACEHOLDER
**/
import map from 'lodash/map'
import size from 'lodash/size'
import { CatalogEntity } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/components'
import { ScrollArea } from '@regardsoss/adapters'
import { DatasetAttributesArrayForGraph } from '../../model/DatasetAttributesForGraph'
import DatasetItemContainer from '../../containers/user/DatasetItemContainer'
import CollectionItemContainer from '../../containers/user/CollectionItemContainer'
import GraphLevelLoadingDisplayer from './GraphLevelLoadingDisplayer'
import GraphLevelMessageDisplayer from './GraphLevelMessageDisplayer'

/**
* A collection content displayer: shows the collections and datasets within root collection
*/
class GraphLevelDispayer extends React.Component {

  static propTypes = {
    graphDatasetAttributes: DatasetAttributesArrayForGraph.isRequired, // graph dataset attributes, required, but empty array is allowed
    isShowable: PropTypes.bool.isRequired, // is showable in current state?
    isLoading: PropTypes.bool.isRequired, // is loading
    isLastLevel: PropTypes.bool.isRequired, // is last level?
    hasError: PropTypes.bool.isRequired, // has fetch error
    collections: PropTypes.objectOf(CatalogEntity).isRequired,
    datasets: PropTypes.objectOf(CatalogEntity).isRequired,
    levelIndex: PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { graphDatasetAttributes, isShowable, isLoading, isLastLevel, hasError, collections, datasets, levelIndex } = this.props
    const { user } = this.context.moduleTheme
    // note: is loading and has error are strictly exclusive (cannot be true at same time)
    const hasContent = size(collections) + size(datasets) > 0
    return (
      <ShowableAtRender show={isShowable}>
        <div style={user.level.styles} >
          <ShowableAtRender show={isLoading}>
            <GraphLevelLoadingDisplayer />
          </ShowableAtRender>
          <ShowableAtRender show={!isLoading && hasError}>
            <GraphLevelMessageDisplayer messageKey="search.graph.level.fetch.model.failed" />
          </ShowableAtRender>
          <ShowableAtRender show={!isLoading && !hasError && !hasContent}>
            <GraphLevelMessageDisplayer messageKey="search.graph.level.no.model" />
          </ShowableAtRender>
          <ShowableAtRender show={!hasError && !isLoading && hasContent}>
            <ScrollArea
              horizontal={false}
              vertical
              style={{ height: user.scrolling.height }}
            >
              {
                map(collections, collection =>
                  (<CollectionItemContainer
                    key={collection.content.ipId}
                    collection={collection}
                    levelIndex={levelIndex}
                    isLastLevel={isLastLevel}
                  />))
              }
              {
                map(datasets, dataset =>
                  (<DatasetItemContainer
                    graphDatasetAttributes={graphDatasetAttributes}
                    key={dataset.content.ipId}
                    dataset={dataset}
                    levelIndex={levelIndex}
                  />))
              }
            </ScrollArea>
          </ShowableAtRender>
        </div>
      </ShowableAtRender >
    )
  }
}
export default GraphLevelDispayer
