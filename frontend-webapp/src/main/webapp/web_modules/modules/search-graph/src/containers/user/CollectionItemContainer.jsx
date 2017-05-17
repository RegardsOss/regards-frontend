/**
* LICENSE_PLACEHOLDER
**/
import { CatalogEntity } from '@regardsoss/model'
import { connect } from '@regardsoss/redux'
import GraphContextActions from '../../model/graph/GraphContextActions'
import GraphContextSelectors from '../../model/graph/GraphContextSelectors'
import CollectionItem from '../../components/user/CollectionItem'

/**
* Displays a collection
*/
export class CollectionItemContainer extends React.Component {

  static mapStateToProps = (state, { levelIndex, collection }) => {
    const levelSelection = GraphContextSelectors.getSelectionForLevel(state, levelIndex)
    const selected = levelSelection ? levelSelection.ipId === collection.content.ipId : false
    return {
      selected,
    }
  }

  static mapDispatchToProps = (dispatch, { levelIndex, collection }) => ({
    dispatchSelected: () => dispatch(GraphContextActions.selectEntity(levelIndex, collection)),
  })


  static propTypes = {
    collection: CatalogEntity.isRequired,
    isLastLevel: PropTypes.bool.isRequired,
    // from map state to props
    selected: PropTypes.bool.isRequired,
    // from map dispatch to props
    dispatchSelected: PropTypes.func.isRequired,
  }

  onSelected = () => {
    const { dispatchSelected } = this.props
    dispatchSelected()
  }

  render() {
    const { isLastLevel, collection, selected } = this.props
    return (
      <CollectionItem
        collection={collection}
        selected={selected}
        onSelect={this.onSelected}
        expensible={!isLastLevel}
      />
    )
  }
}
export default connect(
  CollectionItemContainer.mapStateToProps,
  CollectionItemContainer.mapDispatchToProps)(CollectionItemContainer)
