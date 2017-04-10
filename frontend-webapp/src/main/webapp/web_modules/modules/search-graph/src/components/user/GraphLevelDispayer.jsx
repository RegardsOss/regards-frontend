/**
* LICENSE_PLACEHOLDER
**/
import map from 'lodash/map'
import size from 'lodash/size'
import ScrollArea from 'react-scrollbar'
import { CatalogEntity } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/components'
import DatasetItemContainer from '../../containers/user/DatasetItemContainer'
import CollectionItemContainer from '../../containers/user/CollectionItemContainer'
import GraphLevelLoadingDisplayer from './GraphLevelLoadingDisplayer'
import GraphLevelMessageDisplayer from './GraphLevelMessageDisplayer'

/**
* A collection content displayer: shows the collections and datasets within root collection
*/
class GraphLevelDispayer extends React.Component {

  static propTypes = {
    isShowable: React.PropTypes.bool.isRequired, // is showable in current state?
    isLoading: React.PropTypes.bool.isRequired, // is loading
    hasError: React.PropTypes.bool.isRequired, // has fetch error
    collections: React.PropTypes.objectOf(CatalogEntity).isRequired,
    datasets: React.PropTypes.objectOf(CatalogEntity).isRequired,
    levelIndex: React.PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { isShowable, isLoading, hasError, collections, datasets, levelIndex } = this.props
    const { user } = this.context.moduleTheme
    // note: is loading and has error are strictly exclusive (cannot be true at same time)
    const hasContent = size(collections) + size(datasets) > 0
    return (
      <ShowableAtRender show={isShowable}>
        <div style={levelIndex ? user.level.styles : user.level.styles} >
          <ShowableAtRender show={isLoading}>
            <GraphLevelLoadingDisplayer />
          </ShowableAtRender>
          <ShowableAtRender show={hasError}>
            <GraphLevelMessageDisplayer messageKey="search.graph.level.fetch.model.failed" />
          </ShowableAtRender>
          <ShowableAtRender show={!hasError && !isLoading && !hasContent}>
            <GraphLevelMessageDisplayer messageKey="search.graph.level.no.model" />
          </ShowableAtRender>
          <ShowableAtRender show={!hasError && !isLoading && hasContent}>
            <ScrollArea
              horizontal={false}
              vertical
              verticalContainerStyle={user.scrolling.verticalScrollContainer.styles}
              verticalScrollbarStyle={user.scrolling.verticalScrollbar.styles}
              style={{ height: user.scrolling.height }}
            >
              {
                map(collections, collection =>
                  <CollectionItemContainer
                    key={collection.content.ipId}
                    collection={collection}
                    levelIndex={levelIndex}
                  />)
              }
              {
                map(datasets, dataset =>
                  <DatasetItemContainer key={dataset.content.ipId} dataset={dataset} levelIndex={levelIndex} />)
              }
            </ScrollArea>
          </ShowableAtRender>
        </div>
      </ShowableAtRender >
    )
  }
}
export default GraphLevelDispayer
