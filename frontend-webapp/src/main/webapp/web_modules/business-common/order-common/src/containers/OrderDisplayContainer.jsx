/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import compose from 'lodash/fp/compose'
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { OrderShapes } from '@regardsoss/shape'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { ORDER_DISPLAY_MODES } from '../model/OrderDisplayModes'
import { OrdersNavigationActions } from '../model/OrdersNavigationActions'
import { OrdersNavigationSelectors } from '../model/OrdersNavigationSelectors'
import OrderListContainer from './orders/OrderListContainer'
import OrderDatasetsContainer from './datasets/OrderDatasetsContainer'
import DatasetFilesContainer from './files/DatasetFilesContainer'
import messages from '../i18n'
import styles from '../styles'

/**
* Root order display containers (switches sub component based on navigation state )
* @author Raphaël Mechali
*/
export class OrderDisplayContainer extends React.Component {

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { navigationSelectors }) {
    return {
      navigationPath: navigationSelectors.getNavigationPath(state),
    }
  }

  static propTypes = {
    displayMode: PropTypes.oneOf(values(ORDER_DISPLAY_MODES)).isRequired,
    commandsActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    commandsSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    orderFilesActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    orderFilesSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    navigationActions: PropTypes.instanceOf(OrdersNavigationActions).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    navigationSelectors: PropTypes.instanceOf(OrdersNavigationSelectors).isRequired, // used in mapStateToProps
    // from mapStateToProps
    navigationPath: PropTypes.arrayOf(PropTypes.oneOfType([
      OrderShapes.OrderWithContent, // context level 1
      OrderShapes.DatasetTask, // context level 2
    ])).isRequired,
  }

  render() {
    const { navigationActions, navigationPath, displayMode,
      commandsActions, commandsSelectors, orderFilesActions, orderFilesSelectors } = this.props
    switch (navigationPath.length) {
      case 0:
        // root level: all commands
        return (
          <OrderListContainer
            displayMode={displayMode}
            commandsActions={commandsActions}
            commandsSelectors={commandsSelectors}
            navigationActions={navigationActions}
          />)
      case 1:
        // first level: datasets in selected order
        return (
          <OrderDatasetsContainer
            order={navigationPath[0]}
            navigationActions={navigationActions}
          />)
      case 2:
        return (
          <DatasetFilesContainer
            order={navigationPath[0]}
            dataset={navigationPath[1]}
            orderFilesActions={orderFilesActions}
            orderFilesSelectors={orderFilesSelectors}
          />)
      default:
        throw new Error(`Unknown navigation level ${navigationPath.length}`)
    }
    // TODO swap container on navigation context
  }
}
export default compose(
  connect(OrderDisplayContainer.mapStateToProps),
  withI18n(messages, true), withModuleStyle(styles, true))(OrderDisplayContainer)
