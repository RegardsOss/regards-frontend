/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { CommonShapes, IngestShapes } from '@regardsoss/shape'
import { TableSelectionModes } from '@regardsoss/components'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import RequestOperationsMenuComponent from '../../components/requests/RequestOperationsMenuComponent'
import { requestAbortActions } from '../../clients/RequestAbortClient'

/**
 * Request operations menu container
 * @author Raphaël Mechali
 */
export class RequestOperationsMenuContainer extends React.Component {
  static propTypes = {
    pageMeta: CommonShapes.PageMetadata.isRequired,
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,
    tableSelection: PropTypes.arrayOf(IngestShapes.RequestEntity),
    onSelectVersionOption: PropTypes.func.isRequired,
    onRetrySelection: PropTypes.func.isRequired,
    onDeleteSelection: PropTypes.func.isRequired,
    // from mapStateToProps
    availableEndpoints: PropTypes.arrayOf(PropTypes.string).isRequired,
    // from mapDispatchToProps
    // aborts all requests ("debug mode...")
    sendAbortRequests: PropTypes.func.isRequired,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      availableEndpoints: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      sendAbortRequests: () => dispatch(requestAbortActions.sendSignal('PUT')),
    }
  }

  render() {
    const {
      pageMeta, availableEndpoints, selectionMode, tableSelection,
      onSelectVersionOption, onRetrySelection,
      onDeleteSelection, sendAbortRequests,
    } = this.props
    return (
      <RequestOperationsMenuComponent
        pageMeta={pageMeta}
        availableEndpoints={availableEndpoints}
        selectionMode={selectionMode}
        tableSelection={tableSelection}
        onSelectVersionOption={onSelectVersionOption}
        onRetrySelection={onRetrySelection}
        onDeleteSelection={onDeleteSelection}
        onAbort={sendAbortRequests}
      />
    )
  }
}
export default connect(
  RequestOperationsMenuContainer.mapStateToProps,
  RequestOperationsMenuContainer.mapDispatchToProps)(RequestOperationsMenuContainer)
