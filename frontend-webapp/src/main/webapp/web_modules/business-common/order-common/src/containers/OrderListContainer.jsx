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
import { connect } from '@regardsoss/redux'
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import OrderListComponent from '../components/OrderListComponent'
import messages from '../i18n'
import styles from '../styles'

/**
 * Order list container: It shows all orders in given context (configured using actions and selectors)
 * It provides tools to customize details subscreen.
 * Note: to be used, calling modules must install the model reducer
 * @author Raphaël Mechali
 */
export class OrderListContainer extends React.Component {

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { commandsSelectors }) {
    return {
      totalOrderCount: commandsSelectors.getResultsCount(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { commandsActions }) {
    return {
      // TODO dispatch navigation events
    }
  }

  static propTypes = {
    commandsActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    commandsSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    // from mapStateToProps

    totalOrderCount: PropTypes.number.isRequired,
    // from mapDispatchToProps
    // TODO
  }

  render() {
    const { commandsActions, commandsSelectors, totalOrderCount } = this.props
    // TODO swap component according with context!
    return (
      <OrderListComponent
        totalOrderCount={totalOrderCount}
        commandsActions={commandsActions}
        commandsSelectors={commandsSelectors}
      />
    )
  }
}

// export connected to module styles (but allow overriding)
export default compose(
  connect(OrderListContainer.mapStateToProps, OrderListContainer.mapDispatchToProps),
  withI18n(messages, true), withModuleStyle(styles, true))(OrderListContainer)
