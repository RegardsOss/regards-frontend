/**
* LICENSE_PLACEHOLDER
**/
import isEqual from 'lodash/isEqual'
import { AttributeModelController } from '@regardsoss/domain/dam'
import { TagTypes } from '@regardsoss/domain/catalog'
import { CatalogEntity } from '@regardsoss/model'
import { connect } from '@regardsoss/redux'
import { DatasetAttributesArrayForGraph } from '../../model/DatasetAttributesForGraph'
import GraphContextActions from '../../model/graph/GraphContextActions'
import GraphContextSelectors from '../../model/graph/GraphContextSelectors'
import DatasetItem from '../../components/user/DatasetItem'
/** must be present in dataset links for it to be unlocked */
const accesGrantedRel = 'dataobjects'

/**
* An item entity container
*/
export class DatasetItemContainer extends React.Component {

  static mapStateToProps = (state, { levelIndex, dataset }) => {
    const levelSelection = GraphContextSelectors.getSelectionForLevel(state, levelIndex)
    // a dataset is locked when the user cannot acces a link with rel field 'dataobjects'
    const locked = !dataset.links.find(({ rel }) => rel.toLowerCase().includes(accesGrantedRel))
    const selected = !!levelSelection && levelSelection.ipId === dataset.content.ipId
    return {
      attributesVisible: GraphContextSelectors.areDatasetAttributesVisible(state),
      locked,
      selected,
    }
  }

  static mapDispatchToProps = (dispatch, { levelIndex, dataset }) => ({
    dispatchSelected: () => dispatch(GraphContextActions.selectEntity(levelIndex, dataset)),
    dispatchSetSearchTag: () => dispatch(GraphContextActions.setSearchTag({ type: TagTypes.DATASET, data: dataset })),
  })

  static propTypes = {
    attributesVisible: PropTypes.bool.isRequired, // are dataset attributes currently visible?
    graphDatasetAttributes: DatasetAttributesArrayForGraph.isRequired, // graph dataset attributes, required, but empty array is allowed
    dataset: CatalogEntity.isRequired,
    // from map state to props
    locked: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    // from map dispatch to props
    dispatchSelected: PropTypes.func.isRequired,
    dispatchSetSearchTag: PropTypes.func.isRequired,
  }


  componentWillMount = () => {
    // compute dataset attributes
    this.storeDatasetAttributes(this.props)
  }

  componentWillReceiveProps = (nextProps) => {
    const { dataset, graphDatasetAttributes } = this.props
    const { dataset: nextDataset, graphDatasetAttributes: nextAttributes } = nextProps
    if (!isEqual(dataset, nextDataset) || !isEqual(graphDatasetAttributes, nextAttributes)) {
      // update dataset attributes
      this.storeDatasetAttributes(nextProps)
    }
  }

  onSelected = () => {
    const { dispatchSelected, dispatchSetSearchTag, locked, dataset } = this.props
    if (!locked) {
      dispatchSelected()
      dispatchSetSearchTag({ type: TagTypes.DATASET, data: dataset })
    }
  }

  /**
   * Stores dataset attributes in state, to be used at render time
   * @param {dataset, graphDatasetAttributes} object (properties) holding the displayed dataset and
   * the graph dataset attributes as resolved by user module container
   */
  storeDatasetAttributes = ({ dataset, graphDatasetAttributes = [] }) => this.setState({
    // build dataset attributes with only useful data for component: label, render, value or null / undefined
    datasetAttributes: graphDatasetAttributes.map(({ label, render, attributePath }) => {
      const attributeValue = AttributeModelController.getEntityAttributeValue(dataset, attributePath)
      return {
        label,
        render,
        // prepare a render key for child mapping
        renderKey: attributePath,
        // render value, prepared for renderers
        renderValue: attributeValue ? { main: attributeValue } : null,
      }
    }),
  })

  render() {
    const { dataset, selected, locked, attributesVisible } = this.props
    const { datasetAttributes } = this.state
    return (
      <DatasetItem
        attributesVisible={attributesVisible}
        dataset={dataset}
        datasetAttributes={datasetAttributes}
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
