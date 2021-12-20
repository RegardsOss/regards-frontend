/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { FemShapes } from '@regardsoss/shape'
import { FemDomain } from '@regardsoss/domain'
import RequestManagerComponent from '../components/RequestManagerComponent'

/**
 * RequestManagerContainer
 * @author Théo Lasserre
 */
export class RequestManagerContainer extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    featureManagerFilters: PropTypes.object.isRequired,
    paneType: PropTypes.oneOf(FemDomain.REQUEST_TYPES),
    // eslint-disable-next-line react/forbid-prop-types
    clients: PropTypes.object.isRequired,
    // from mapDistpathToProps
    fetchRequests: PropTypes.func.isRequired,
    clearSelection: PropTypes.func.isRequired,
    deleteRequests: PropTypes.func.isRequired,
    retryRequests: PropTypes.func.isRequired,
    // from mapStateToProps
    meta: PropTypes.shape({
      number: PropTypes.number,
    }),
    tableSelection: PropTypes.arrayOf(FemShapes.Request),
    selectionMode: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    // are all selected in current state?
    areAllSelected: PropTypes.bool.isRequired,
  }

  static PAGE_SIZE = STATIC_CONF.TABLE.PAGE_SIZE || 20

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps = (state, ownProps) => ({
    meta: ownProps.clients.selectors.getMetaData(state),
    tableSelection: ownProps.clients.tableSelectors.getToggledElementsAsList(state),
    selectionMode: ownProps.clients.tableSelectors.getSelectionMode(state),
    areAllSelected: ownProps.clients.tableSelectors.areAllSelected(state, ownProps.clients.selectors),
    isFetching: ownProps.clients.selectors.isFetching(state),
  })

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps = (dispatch, ownProps) => ({
    fetchRequests: (pageIndex, pageSize, pathParams, queryParams) => dispatch(ownProps.clients.actions.fetchPagedEntityList(pageIndex, pageSize, pathParams, queryParams)),
    clearSelection: () => dispatch(ownProps.clients.tableActions.unselectAll()),
    deleteRequests: (payload, type) => dispatch(ownProps.clients.deleteActions.sendSignal('DELETE', payload, { type })),
    retryRequests: (payload, type) => dispatch(ownProps.clients.retryActions.sendSignal('POST', payload, { type })),
  })

  onRefresh = (columnsSorting, contextRequestParameters) => {
    const {
      meta, clearSelection, fetchRequests, featureManagerFilters, paneType,
    } = this.props
    // compute page size to refresh all current entities in the table
    const lastPage = (meta && meta.number) || 0
    const fetchPageSize = (RequestManagerContainer.PAGE_SIZE) * (lastPage + 1)
    clearSelection()
    fetchRequests(0, fetchPageSize, { type: paneType }, { ...contextRequestParameters, ...featureManagerFilters })
  }

  render() {
    const {
      featureManagerFilters,
      tableSelection,
      deleteRequests,
      retryRequests,
      paneType,
      clients,
      selectionMode,
      areAllSelected,
      isFetching,
    } = this.props
    return (
      <RequestManagerComponent
        featureManagerFilters={featureManagerFilters}
        onRefresh={this.onRefresh}
        deleteRequests={deleteRequests}
        retryRequests={retryRequests}
        tableSelection={tableSelection}
        paneType={paneType}
        clients={clients}
        selectionMode={selectionMode}
        areAllSelected={areAllSelected}
        isFetching={isFetching}
      />
    )
  }
}
export default connect(
  RequestManagerContainer.mapStateToProps,
  RequestManagerContainer.mapDispatchToProps)(RequestManagerContainer)
