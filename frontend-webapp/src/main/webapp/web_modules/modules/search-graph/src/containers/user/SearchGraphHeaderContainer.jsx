/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { DatasetAttributesArrayForGraph } from '../../model/DatasetAttributesForGraph'
import GraphContextActions from '../../model/graph/GraphContextActions'
import GraphContextSelectors from '../../model/graph/GraphContextSelectors'
import SearchGraphHeader from '../../components/user/SearchGraphHeader'

/**
* Container for search graph header components
*/
export class SearchGraphHeaderContainer extends React.Component {

  static mapStateToProps(state) {
    return {
      datasetAttributesVisible: GraphContextSelectors.areDatasetAttributesVisible(state),
      moduleCollapsed: GraphContextSelectors.isModuleCollapsed(state),
    }
  }

  static mapDispatchToProps(dispatch) {
    return {
      dispatchSetDatasetAttributesVisible: visible => dispatch(GraphContextActions.setDatasetAttributesVisible(visible)),
      dispatchSetModuleCollapsed: collapsed => dispatch(GraphContextActions.setModuleCollapsed(collapsed)),
    }
  }

  static propTypes = {
    graphDatasetAttributes: DatasetAttributesArrayForGraph.isRequired, // graph dataset attributes, required, but empty array is allowed
    // from mapStateToProps
    datasetAttributesVisible: React.PropTypes.bool.isRequired,
    moduleCollapsed: React.PropTypes.bool.isRequired,
    // from mapDispatchToProps
    dispatchSetDatasetAttributesVisible: React.PropTypes.func.isRequired, // bool -> void
    dispatchSetModuleCollapsed: React.PropTypes.func.isRequired, // bool -> void
  }

  dispatchToggleModuleCollapsed = () => {
    const { dispatchSetModuleCollapsed, moduleCollapsed } = this.props
    dispatchSetModuleCollapsed(!moduleCollapsed)
  }

  render() {
    const { datasetAttributesVisible, moduleCollapsed,
      graphDatasetAttributes, dispatchSetDatasetAttributesVisible } = this.props

    return (
      <SearchGraphHeader
        areDatasetAttributesAvailable={graphDatasetAttributes.length > 0}
        datasetAttributesVisible={datasetAttributesVisible}
        moduleCollapsed={moduleCollapsed}
        onSetDatasetAttributesVisible={dispatchSetDatasetAttributesVisible}
        dispatchToggleModuleCollapsed={this.dispatchToggleModuleCollapsed}

      />
    )
  }
}
export default connect(
  SearchGraphHeaderContainer.mapStateToProps,
  SearchGraphHeaderContainer.mapDispatchToProps)(SearchGraphHeaderContainer)
