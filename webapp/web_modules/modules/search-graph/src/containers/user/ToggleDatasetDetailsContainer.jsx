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
import { connect } from '@regardsoss/redux'
import { DatasetAttributesArrayForGraph } from '../../shapes/DatasetAttributesForGraph'
import graphContextActions from '../../model/graph/GraphContextActions'
import graphContextSelectors from '../../model/graph/GraphContextSelectors'
import ToggleDatasetDetails from '../../components/user/ToggleDatasetDetails'

/**
* Toggle dataset details container (fetches data and determinates if details are available)
* @author Raphaël Mechali
*/
export class ToggleDatasetDetailsContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      datasetAttributesVisible: graphContextSelectors.areDatasetAttributesVisible(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch) {
    return {
      dispatchSetDatasetAttributesVisible: (visible) => dispatch(graphContextActions.setDatasetAttributesVisible(visible)),
    }
  }

  static propTypes = {
    graphDatasetAttributes: DatasetAttributesArrayForGraph.isRequired, // graph dataset attributes, required, but empty array is allowed
    // from mapStateToProps
    datasetAttributesVisible: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    dispatchSetDatasetAttributesVisible: PropTypes.func.isRequired, // bool -> void
  }

  render() {
    const { datasetAttributesVisible, graphDatasetAttributes, dispatchSetDatasetAttributesVisible } = this.props
    return (
      <ToggleDatasetDetails
        areDatasetAttributesAvailable={graphDatasetAttributes.length > 0}
        datasetAttributesVisible={datasetAttributesVisible}
        onSetDatasetAttributesVisible={dispatchSetDatasetAttributesVisible}
      />
    )
  }
}
export default connect(
  ToggleDatasetDetailsContainer.mapStateToProps,
  ToggleDatasetDetailsContainer.mapDispatchToProps,
)(ToggleDatasetDetailsContainer)
