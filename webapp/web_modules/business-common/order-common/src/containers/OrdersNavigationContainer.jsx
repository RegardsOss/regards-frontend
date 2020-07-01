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
import compose from 'lodash/fp/compose'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { OrderShapes } from '@regardsoss/shape'
import { AuthenticationClient, AuthenticateShape } from '@regardsoss/authentication-utils'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { OrdersNavigationActions } from '../model/OrdersNavigationActions'
import { OrdersNavigationSelectors } from '../model/OrdersNavigationSelectors'
import OrdersNavigationComponent from '../components/navigation/OrdersNavigationComponent'
import messages from '../i18n'
import styles from '../styles'

/**
 * Navigation context container for orders
 * @author Raphaël Mechali
 */
export class OrdersNavigationContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { navigationSelectors }) {
    return {
      authentication: AuthenticationClient.authenticationSelectors.getAuthentication(state),
      navigationPath: navigationSelectors.getNavigationPath(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, { navigationActions }) {
    return {
      dispatchResetToLevel: (level) => dispatch(navigationActions.resetToLevel(level)),
    }
  }

  static propTypes = {
    // root element title in navigation
    title: PropTypes.string.isRequired,
    // Root navigation icon
    rootIcon: PropTypes.node,
    // eslint-disable-next-line react/no-unused-prop-types
    navigationActions: PropTypes.instanceOf(OrdersNavigationActions).isRequired, // used in mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    navigationSelectors: PropTypes.instanceOf(OrdersNavigationSelectors).isRequired, // used in mapStateToProps
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    authentication: AuthenticateShape.isRequired, // used in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    navigationPath: PropTypes.arrayOf(PropTypes.oneOfType([ // used in onPropertiesUpdated
      OrderShapes.OrderWithContent, // context level 1
      OrderShapes.DatasetTask, // context level 2
    ])).isRequired,
    // from mapDispatchToProps
    dispatchResetToLevel: PropTypes.func.isRequired,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    // update path to set up a root dummy (used by component)
    if (!isEqual(oldProps.navigationPath, newProps.navigationPath)) {
      this.setState({
        navigationPath: [OrdersNavigationComponent.ROOT_MARKER, ...newProps.navigationPath],
      })
    }
    // when authentication changes, reset navigation levels to prevent another connected user seeing current detail
    if (!isEqual(oldProps.authentication, newProps.authentication)) {
      newProps.dispatchResetToLevel(0)
    }
  }

  render() {
    const { rootIcon, title, dispatchResetToLevel } = this.props
    const { navigationPath } = this.state
    return (
      <OrdersNavigationComponent
        title={title}
        rootIcon={rootIcon}
        navigationPath={navigationPath}
        onResetTolevel={dispatchResetToLevel}
      />
    )
  }
}
export default compose(
  connect(OrdersNavigationContainer.mapStateToProps, OrdersNavigationContainer.mapDispatchToProps),
  withI18n(messages, true),
  withModuleStyle(styles, true),
)(OrdersNavigationContainer)
