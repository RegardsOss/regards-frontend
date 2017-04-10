/**
* LICENSE_PLACEHOLDER
**/
import { CatalogEntity } from '@regardsoss/model'
import { connect } from '@regardsoss/redux'
import GraphSelectionActions from '../../model/graph/GraphSelectionActions'
import GraphSelectionSelectors from '../../model/graph/GraphSelectionSelectors'
import CollectionItem from '../../components/user/CollectionItem'

/**
* Displays a collection
*/
class CollectionItemContainer extends React.Component {

  static mapStateToProps = (state, { levelIndex, collection }) => {
    const levelSelection = GraphSelectionSelectors.getSelectionForLevel(state, levelIndex)
    const selected = levelSelection ? levelSelection.ipId === collection.content.ipId : false
    return {
      selected,
    }
  }

  static mapDispatchToProps = (dispatch, { levelIndex, collection }) => ({
    dispatchSelected: () => dispatch(GraphSelectionActions.selectEntity(levelIndex, collection)),
  })


  static propTypes = {
    collection: CatalogEntity.isRequired,
    // from map state to props
    selected: React.PropTypes.bool.isRequired,
    // from map dispatch to props
    dispatchSelected: React.PropTypes.func.isRequired,
  }

  onSelected = () => {
    const { dispatchSelected } = this.props
    dispatchSelected()
  }

  render() {
    const { collection, selected } = this.props
    return (
      <CollectionItem
        collection={collection}
        selected={selected}
        onSelect={this.onSelected}
      />
    )
  }
}
export default connect(
  CollectionItemContainer.mapStateToProps,
  CollectionItemContainer.mapDispatchToProps)(CollectionItemContainer)
