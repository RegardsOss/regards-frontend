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
import throttle from 'lodash/throttle'
import { connect } from '@regardsoss/redux'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { AccessShapes } from '@regardsoss/shape'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { projectUserActions, projectUserSelectors } from '../clients/ProjectUserClient'
import OrderListFiltersComponent from '../components/OrderListFiltersComponent'
import { REQUEST_FILTERS } from '../domain/requestFilters'

// compute filter dependencies, show this panel only when all are available
const allFiltersDependencies = [
  projectUserActions.getDependency(RequestVerbEnum.GET_LIST),
]
// a default page size
const PAGE_SIZE = 50
// throttle delay for users list request
const THROTTLE_DELAY_MS = 500
// Sub components with added rights
export const OrderListFiltersComponentWithRights = withResourceDisplayControl(OrderListFiltersComponent)

/**
 * Filters list container for order list
 * @author Raphaël Mechali
 */
export class OrderListFiltersContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      isFetching: projectUserSelectors.isFetching(state),
      users: projectUserSelectors.getList(state),
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
      // Note: we throttle here the emitted network requests to avoid dispatching for each key entered
      dispatchGetUsers:
        throttle(
          (partialEmail) => dispatch(projectUserActions.fetchPagedEntityList(0, PAGE_SIZE, null, { partialEmail })),
          THROTTLE_DELAY_MS, { leading: false }),
    }
  }

  static propTypes = {
    // table sorting, column visiblity & filters management
    filters: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    updateFilter: PropTypes.func.isRequired,
    updateValuesFilter: PropTypes.func.isRequired,
    updateDatesFilter: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,

    // from mapStateToProps
    isFetching: PropTypes.bool.isRequired,
    users: AccessShapes.ProjectUserList,
    // from mapDispatchToProps
    dispatchGetUsers: PropTypes.func.isRequired,
  }

  /** Component default state (controls the auto complete filter state) */
  state = {
    isInError: false,
  }

  /**
   * Called by auto complete filter box
   */
  onUpdateUsersFilter = (newText = '') => {
    const { dispatchGetUsers, updateFilter } = this.props
    // A - update filter text
    updateFilter(newText, REQUEST_FILTERS.OWNER, true)
    // B - dipatch get users list for text (it will provide the new matching users list)
    dispatchGetUsers(newText)
  }

  /**
   * Callback: the user selected a user mail or typed in some text
   * @param userEmail: user email or input text
   * @param isInUserList: true when the text match EXACTLY an existing user
   */
  onUserFilterSelected = (userEmail, isInUsersList) => {
    // A - Update text and error state
    this.setState({ isInError: !isInUsersList })
    // B - call parent handler (let the no data happen when no correct user is selected)
    this.props.updateFilter(userEmail, REQUEST_FILTERS.OWNER)
  }

  /**
   * Callback: user cleared the user mail filter
   */
  onUserFilterCleared = () => this.onUserFilterSelected('', true) // empty user is considered part of the list

  onUpdateWaitingForUserFilter = (newValue = '') => {
    const { updateFilter } = this.props
    updateFilter(newValue, REQUEST_FILTERS.WAITING_FOR_USER)
  }

  render() {
    const {
      isFetching, users, filters, updateValuesFilter,
      updateDatesFilter, clearFilters,
    } = this.props
    const { isInError } = this.state
    return (
      <OrderListFiltersComponentWithRights
        resourceDependencies={allFiltersDependencies}
        matchingUsers={users}
        isInError={isInError}
        isFetching={isFetching}
        onUpdateUsersFilter={this.onUpdateUsersFilter}
        onUserFilterSelected={this.onUserFilterSelected}
        onUserFilterCleared={this.onUserFilterCleared}
        filters={filters}
        updateValuesFilter={updateValuesFilter}
        updateDatesFilter={updateDatesFilter}
        clearFilters={clearFilters}
        onUpdateWaitingForUserFilter={this.onUpdateWaitingForUserFilter}
      />
    )
  }
}

export default connect(
  OrderListFiltersContainer.mapStateToProps,
  OrderListFiltersContainer.mapDispatchToProps)(OrderListFiltersContainer)
