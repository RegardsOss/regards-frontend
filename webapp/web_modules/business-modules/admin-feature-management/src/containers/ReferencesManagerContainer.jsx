/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { referencesSelectors, referencesActions } from '../clients/ReferencesClient'
import { referenceDeleteActions } from '../clients/ReferencesDeleteClient'
import { referenceNotifyActions } from '../clients/ReferencesNotifyClient'
import { referencesTableActions, referencesTableSelectors } from '../clients/ReferencesTableClient'
import ReferencesManagerComponent from '../components/ReferencesManagerComponent'

/**
  * Displays the references
  * @author Théo Lasserre
  */
export class ReferencesManagerContainer extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    featureManagerFilters: PropTypes.object.isRequired,
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapDistpathToProps
    fetchReferences: PropTypes.func.isRequired,
    clearSelection: PropTypes.func.isRequired,
    deleteReferences: PropTypes.func.isRequired,
    notifyReferences: PropTypes.func.isRequired,
    // from mapStateToProps
    meta: PropTypes.shape({
      number: PropTypes.number,
    }),
    tableSelection: PropTypes.arrayOf(FemShapes.Reference),
    selectionMode: PropTypes.string.isRequired,
    areAllSelected: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  static PAGE_SIZE = STATIC_CONF.TABLE.PAGE_SIZE || 20

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps = (state) => ({
    meta: referencesSelectors.getMetaData(state),
    tableSelection: referencesTableSelectors.getToggledElementsAsList(state),
    selectionMode: referencesTableSelectors.getSelectionMode(state),
    areAllSelected: referencesTableSelectors.areAllSelected(state, referencesSelectors),
    isFetching: referencesSelectors.isFetching(state),
  })

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = (dispatch) => ({
    fetchReferences: (pageIndex, pageSize, pathParams, queryParams) => dispatch(referencesActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, queryParams)),
    clearSelection: () => dispatch(referencesTableActions.unselectAll()),
    deleteReferences: (referenceIds) => dispatch(referenceDeleteActions.sendSignal('DELETE', referenceIds)),
    notifyReferences: (referenceIds) => dispatch(referenceNotifyActions.sendSignal('POST', referenceIds)),
  })

  onRefresh = (columnsSorting, contextRequestParameters) => {
    const {
      meta, clearSelection, fetchReferences, featureManagerFilters,
    } = this.props
    // compute page size to refresh all current entities in the table
    const lastPage = (meta && meta.number) || 0
    const fetchPageSize = (ReferencesManagerContainer.PAGE_SIZE) * (lastPage + 1)
    clearSelection()
    fetchReferences(0, fetchPageSize, {}, { ...contextRequestParameters, ...featureManagerFilters })
  }

  render() {
    const {
      featureManagerFilters,
      tableSelection,
      deleteReferences,
      notifyReferences,
      selectionMode,
      areAllSelected,
      isFetching,
    } = this.props
    return (
      <ReferencesManagerComponent
        featureManagerFilters={featureManagerFilters}
        onRefresh={this.onRefresh}
        deleteReferences={deleteReferences}
        notifyReferences={notifyReferences}
        tableSelection={tableSelection}
        selectionMode={selectionMode}
        areAllSelected={areAllSelected}
        isFetching={isFetching}
      />
    )
  }
}

export default connect(ReferencesManagerContainer.mapStateToProps, ReferencesManagerContainer.mapDispatchToProps)(ReferencesManagerContainer)
