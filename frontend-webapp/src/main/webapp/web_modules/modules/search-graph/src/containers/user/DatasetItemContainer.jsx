/**
* LICENSE_PLACEHOLDER
**/
import { CatalogEntity } from '@regardsoss/model'
import { connect } from '@regardsoss/redux'
import GraphSelectionActions from '../../model/graph/GraphSelectionActions'
import GraphSelectionSelectors from '../../model/graph/GraphSelectionSelectors'
import DatasetItem from '../../components/user/DatasetItem'

/** must be present in dataset links for it to be unlocked */
const accesGrantedRel = 'dataobjects'

/**
* An item entity container
*/
class DatasetItemContainer extends React.Component {

  static mapStateToProps = (state, { levelIndex, dataset }) => {
    const levelSelection = GraphSelectionSelectors.getSelectionForLevel(state, levelIndex)
    // a dataset is locked when the user cannot acces a link with rel field 'dataobjects'
    const locked = !dataset.links.find(({ rel }) => rel.toLowerCase().includes(accesGrantedRel))
    const selected = !!levelSelection && levelSelection.ipId === dataset.content.ipId
    return {
      locked,
      selected,
    }
  }

  static mapDispatchToProps = (dispatch, { levelIndex, dataset }) => ({
    dispatchSelected: () => dispatch(GraphSelectionActions.selectEntity(levelIndex, dataset)),
  })

  static propTypes = {
    dataset: CatalogEntity.isRequired,
    // from map state to props
    locked: React.PropTypes.bool.isRequired,
    selected: React.PropTypes.bool.isRequired,
    // from map dispatch to props
    dispatchSelected: React.PropTypes.func.isRequired,
  }

  onSelected = () => {
    const { dispatchSelected, locked } = this.props
    if (!locked) {
      dispatchSelected()
    }
  }

  render() {
    const { dataset, selected, locked } = this.props
    return (
      <DatasetItem
        dataset={dataset}
        locked={locked}
        selected={selected}
        onSelect={this.onSelected}
      />
    )
  }
}

export default connect(
  DatasetItemContainer.mapStateToProps,
  DatasetItemContainer.mapDispatchToProps)(DatasetItemContainer)
