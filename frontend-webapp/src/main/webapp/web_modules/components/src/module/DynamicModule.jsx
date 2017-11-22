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
import { Card, CardMedia, CardHeader } from 'material-ui/Card'
import NotLoggedIcon from 'material-ui/svg-icons/action/lock'
import { connect } from '@regardsoss/redux'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { AuthenticationClient } from '@regardsoss/authentication-manager'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import NoContentMessageInfo from '../cards/NoContentMessageInfo'
import styles from './styles'
import messages from './i18n'


/**
 * Presents a dynamic module.
 * - It appends its own context to parent context
 * - It binds authentication and endpoints to check if it should show not authentified / not enough right messages
 *
 * @author Raphaël Mechali
 */
export class DynamicModule extends React.Component {

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      fetching: CommonEndpointClient.endpointSelectors.isFetching(state) ||
        AuthenticationClient.authenticationSelectors.isFetching(state),
      availableDependencies: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
      isAuthenticated: AuthenticationClient.authenticationSelectors.isAuthenticated(state),
    }
  }

  static propTypes = {
    // module title component
    title: PropTypes.node.isRequired,
    // module title bar options
    options: PropTypes.arrayOf(PropTypes.node),
    // toggle expand callback
    onExpandChange: PropTypes.func.isRequired,
    // is currently expanded?
    expanded: PropTypes.bool,
    // used to create callback on main module area
    onKeyPress: PropTypes.func,
    // does this module require authentication?
    // eslint-disable-next-line react/no-unused-prop-types
    requiresAuthentication: PropTypes.bool.isRequired, // async use
    // required dependencies for this module
    // eslint-disable-next-line react/no-unused-prop-types
    requiredDependencies: PropTypes.arrayOf(PropTypes.string).isRequired, // async use
    // children here are the module content (none, one many)
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    // from map state to props
    // eslint-disable-next-line react/no-unused-prop-types
    fetching: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    availableDependencies: PropTypes.arrayOf(PropTypes.string), // async use
    // eslint-disable-next-line react/no-unused-prop-types
    isAuthenticated: PropTypes.bool.isRequired, // async use

  }

  static defaultProps = {
    options: [],
    requiresAuthentication: false,
    requiredDependencies: [],
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static DEFAULT_STATE = {
    noData: false,
    // any valid key is ok here
    noDataTitleKey: 'dynamic.module.not.authenticated.title',
    noDataMessageKey: 'dynamic.module.not.authenticated.message',
  }

  /**
   * Lifecycle method, used here to recompute authentication and dependencies state
   */
  componentWillMount = () => this.onPropertiesChanged({}, this.props)

  /**
   * Lifecycle method, used here to recompute authentication and dependencies state
   * @param nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesChanged(this.props, nextProps)

  onPropertiesChanged = (oldProps, newProps) => {
    if (newProps.fetching) {
      // limits 'blinking effects'
      return
    }

    const hasAllDependencies = newProps.requiredDependencies.reduce(
      (acc, dependency) => acc && newProps.availableDependencies.includes(dependency), true)
    let newState
    if (!newProps.isAuthenticated && (newProps.requiresAuthentication || !hasAllDependencies)) {
      // we consider here the user should log in when:
      // A - authentication is required
      // B - he misses some dependencies
      newState = {
        noData: true,
        noDataTitleKey: 'dynamic.module.not.authenticated.title',
        noDataMessageKey: 'dynamic.module.not.authenticated.message',
      }
    } else if (!hasAllDependencies) {
      // missing some dependencies
      newState = {
        noData: true,
        noDataTitleKey: 'dynamic.module.unsufficient.rights.title',
        noDataMessageKey: 'dynamic.module.unsufficient.rights.message',
      }
    } else {
      newState = DynamicModule.DEFAULT_STATE
    }
    this.setState(newState)
  }


  render() {
    const { title, options, children, onExpandChange, expanded, onKeyPress } = this.props
    const { moduleTheme: { module: { cardHeaderStyle, cardHeaderContentStyle, titleBarDivStyle,
      titleDivStyle, optionsDivStyle } }, intl: { formatMessage } } = this.context
    const { noData, noDataTitleKey, noDataMessageKey } = this.state
    return (
      <Card
        onExpandChange={onExpandChange}
        expanded={expanded}
      >
        <CardHeader
          style={cardHeaderStyle}
          textStyle={cardHeaderContentStyle}
          title={/* render title and options on the title bar */
            <div style={titleBarDivStyle}>
              <div style={titleDivStyle}>
                {title}
              </div>
              <div style={optionsDivStyle}>
                {options}
              </div>
            </div>
          }
          showExpandableButton
        />
        <CardMedia expandable onKeyPress={onKeyPress}>
          {/* prevent children to show when missing rights */}
          <NoContentMessageInfo
            noContent={noData}
            title={formatMessage({ id: noDataTitleKey })}
            message={formatMessage({ id: noDataMessageKey })}
            Icon={NotLoggedIcon}
          >
            {children}
          </NoContentMessageInfo>
        </CardMedia>
      </Card>
    )
  }

}

export default compose(
  connect(DynamicModule.mapStateToProps),
  withI18n(messages, true), withModuleStyle(styles, true))(DynamicModule)
