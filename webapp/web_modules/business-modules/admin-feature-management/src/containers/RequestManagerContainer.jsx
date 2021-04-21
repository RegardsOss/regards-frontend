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
import { HateoasLinks } from '@regardsoss/display-control'
import { PANE_TYPES } from '../domain/PaneTypes'
import RequestManagerComponent from '../components/RequestManagerComponent'
import { requestDeleteActions } from '../clients/RequestDeleteClient'
import { requestRetryActions } from '../clients/RequestRetryClient'

/**
 * RequestManagerContainer
 * @author Théo Lasserre
 */
export class RequestManagerContainer extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    featureManagerFilters: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    requestFilters: PropTypes.object.isRequired,
    paneType: PropTypes.oneOf(PANE_TYPES),
    onApplyRequestFilter: PropTypes.func.isRequired,
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
    links: PropTypes.arrayOf(HateoasLinks),
    tableSelection: PropTypes.arrayOf(FemShapes.Request),
    selectionMode: PropTypes.string.isRequired,
    // are all selected in current state?
    areAllSelected: PropTypes.bool.isRequired,
  }

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
    links: ownProps.clients.selectors.getLinks(state),
    areAllSelected: ownProps.clients.tableSelectors.areAllSelected(state, ownProps.clients.selectors),
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
    deleteRequests: (payload, type) => dispatch(requestDeleteActions.sendSignal('DELETE', payload, { type })),
    retryRequests: (payload, type) => dispatch(requestRetryActions.sendSignal('POST', payload, { type })),
  })

  onRefresh = (columnsSorting, contextRequestParameters) => {
    const {
      meta, clearSelection, fetchRequests,
    } = this.props
    // compute page size to refresh all current entities in the table
    const lastPage = (meta && meta.number) || 0
    const fetchPageSize = STATIC_CONF.TABLE.PAGE_SIZE * (lastPage + 1)
    clearSelection()
    fetchRequests(0, fetchPageSize, {}, columnsSorting, { ...contextRequestParameters })
  }

  render() {
    const {
      featureManagerFilters,
      requestFilters,
      tableSelection,
      deleteRequests,
      retryRequests,
      onApplyRequestFilter,
      paneType,
      clients,
      links,
      selectionMode,
      areAllSelected,
    } = this.props
    return (
      <RequestManagerComponent
        featureManagerFilters={featureManagerFilters}
        requestFilters={requestFilters}
        onApplyRequestFilter={onApplyRequestFilter}
        onRefresh={this.onRefresh}
        deleteRequests={deleteRequests}
        retryRequests={retryRequests}
        tableSelection={tableSelection}
        paneType={paneType}
        clients={clients}
        selectionMode={selectionMode}
        links={links}
        areAllSelected={areAllSelected}
      />
    )
  }
}
export default connect(
  RequestManagerContainer.mapStateToProps,
  RequestManagerContainer.mapDispatchToProps)(RequestManagerContainer)
