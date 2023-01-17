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
import { RequestVerbEnum, BasicSelector } from '@regardsoss/store-utils'
import { AccessShapes, UIShapes } from '@regardsoss/shape'
import { FiltersActions } from '@regardsoss/components'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { projectUserActions, projectUserSelectors } from '../clients/ProjectUserClient'
import OrderListFiltersComponent from '../components/OrderListFiltersComponent'

// compute filter dependencies, show this panel only when all are available
const allFiltersDependencies = [
  projectUserActions.getDependency(RequestVerbEnum.POST),
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
          (partialEmail) => dispatch(projectUserActions.fetchPagedEntityListByPost(0, PAGE_SIZE, null, null, { partialEmail })),
          THROTTLE_DELAY_MS, { leading: false }),
    }
  }

  static propTypes = {
    isPaneOpened: PropTypes.bool.isRequired,
    onCloseFiltersPane: PropTypes.func.isRequired,
    updateRequestParameters: PropTypes.func.isRequired, // comes from TableFilterSortingAndVisibilibtyContainer
    // eslint-disable-next-line react/no-unused-prop-types
    filtersActions: PropTypes.instanceOf(FiltersActions).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    filtersSelectors: PropTypes.instanceOf(BasicSelector).isRequired,
    filtersI18n: UIShapes.FiltersI18nList.isRequired,

    // from mapStateToProps
    isFetching: PropTypes.bool.isRequired,
    users: AccessShapes.ProjectUserList,
    // from mapDispatchToProps
    dispatchGetUsers: PropTypes.func.isRequired,
  }

  render() {
    const {
      isFetching, users, isPaneOpened, filtersI18n,
      onCloseFiltersPane, updateRequestParameters,
      dispatchGetUsers, filtersActions, filtersSelectors,
    } = this.props
    return (
      <OrderListFiltersComponentWithRights
        resourceDependencies={allFiltersDependencies}
        matchingUsers={users}
        isFetching={isFetching}
        dispatchGetUsers={dispatchGetUsers}
        isPaneOpened={isPaneOpened}
        onCloseFiltersPane={onCloseFiltersPane}
        updateRequestParameters={updateRequestParameters}
        filtersActions={filtersActions}
        filtersSelectors={filtersSelectors}
        filtersI18n={filtersI18n}
      />
    )
  }
}

export default connect(
  OrderListFiltersContainer.mapStateToProps,
  OrderListFiltersContainer.mapDispatchToProps)(OrderListFiltersContainer)
