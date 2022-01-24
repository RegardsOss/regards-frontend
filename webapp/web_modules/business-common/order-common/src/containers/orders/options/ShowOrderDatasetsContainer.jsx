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
import { OrderShapes } from '@regardsoss/shape'
import { OrdersNavigationActions } from '../../../model/OrdersNavigationActions'
import ShowOrderDatasetsComponent from '../../../components/orders/options/ShowOrderDatasetsComponent'

/**
* Show order datasets container
* @author Raphaël Mechali
*/
export class ShowOrderDatasetsContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, { entity, navigationActions }) {
    return {
      dispatchOrderSelected: () => dispatch(navigationActions.selectOrder(entity)),
    }
  }

  static propTypes = {
    // from table cell API
    // eslint-disable-next-line react/no-unused-prop-types
    entity: OrderShapes.OrderWithContent.isRequired, // used in mapDispatchToProps only
    // required actions to dispatch level change
    // eslint-disable-next-line react/no-unused-prop-types
    navigationActions: PropTypes.instanceOf(OrdersNavigationActions).isRequired, // used in mapDispatchToProps only
    // from mapDispatchToProps
    dispatchOrderSelected: PropTypes.func.isRequired,
  }

  render() {
    const { dispatchOrderSelected } = this.props
    return (
      <ShowOrderDatasetsComponent onSelectOrder={dispatchOrderSelected} />
    )
  }
}
export default connect(null, ShowOrderDatasetsContainer.mapDispatchToProps)(ShowOrderDatasetsContainer)
