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
import isEqual from 'lodash/isEqual'
import { Card, CardMedia, CardHeader } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import NotLoggedIcon from 'material-ui/svg-icons/action/lock'
import ExpandedIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import CollapsedIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import { connect } from '@regardsoss/redux'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { AuthenticationClient } from '@regardsoss/authentication-manager'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import NoContentMessageInfo from '../cards/NoContentMessageInfo'
import UserInformationLoadingIcon from './UserInformationLoadingIcon'
import ModuleSubtitle from './ModuleSubtitle'
import styles from './styles'
import messages from './i18n'


/**
 * Presents a dynamic module.
 * - It appends its own context to parent context
 * - It binds authentication and endpoints to check if it should show not authentified / not enough right messages
 * - It is intended to display dynamic modules user container. It can adapt to both user and admin interface (ie: user container
 * here is the 'view' part of the dynamic modules - legacy name)
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
    // optional module subtitle compoent
    subtitle: PropTypes.number,
    // module title bar options
    options: PropTypes.arrayOf(PropTypes.node),
    // toggle expand callback
    onExpandChange: PropTypes.func.isRequired,
    // is expandable?
    expandable: PropTypes.bool,
    // is currently expanded?
    expanded: PropTypes.bool,
    // used to create callback on main module area
    onKeyPress: PropTypes.func,
    // does this module require authentication?
    // eslint-disable-next-line react/no-unused-prop-types
    requiresAuthentication: PropTypes.bool, // async use
    // required dependencies for this module
    // eslint-disable-next-line react/no-unused-prop-types
    requiredDependencies: PropTypes.arrayOf(PropTypes.string), // async use
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
    // API
    options: [],
    requiresAuthentication: false,
    requiredDependencies: [],
    // map state to props
    availableDependencies: [],
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static DEFAULT_STATE = {
    noData: false,
    loading: false,
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
    const oldState = this.state
    let newState
    const hasAllDependencies = newProps.requiredDependencies.reduce((acc, dependency) => acc && newProps.availableDependencies.includes(dependency), true)
    if (newProps.fetching) {
      // 1 - Block any update while authentication or resources are loading
      newState = {
        noData: false,
        loading: true,
        noDataTitleKey: 'dynamic.module.loading.title',
        noDataMessageKey: 'dynamic.module.loading.message',
      }
    } else if (!newProps.isAuthenticated && (newProps.requiresAuthentication || !hasAllDependencies)) {
      // 2 - we consider here the user should log in when:
      // A - authentication is required
      // B - he misses some dependencies
      newState = {
        noData: true,
        loading: false,
        noDataTitleKey: 'dynamic.module.not.authenticated.title',
        noDataMessageKey: 'dynamic.module.not.authenticated.message',
      }
    } else if (!hasAllDependencies) {
      // 3 -missing some dependencies
      newState = {
        noData: true,
        loading: false,
        noDataTitleKey: 'dynamic.module.unsufficient.rights.title',
        noDataMessageKey: 'dynamic.module.unsufficient.rights.message',
      }
    } else {
      // 4 - module can be shown
      newState = DynamicModule.DEFAULT_STATE
    }

    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }


  render() {
    const {
      title, options, subtitle, children,
      expandable, expanded, onExpandChange, onKeyPress,
    } = this.props
    const {
      moduleTheme: {
        module: {
          cardHeaderStyle, cardHeaderContentStyle, titleBarDivStyle,
          titleDivStyle, optionsDivStyle,
        },
      }, intl: { formatMessage },
    } = this.context
    const {
      noData, loading, noDataTitleKey, noDataMessageKey,
    } = this.state

    return (
      <Card
        expanded={expanded}
        onExpandChange={onExpandChange}
      >
        <CardHeader
          style={cardHeaderStyle}
          textStyle={cardHeaderContentStyle}
          showExpandableButton={false}
          title={/* render title, subtitle and options on the title bar */
            <div style={titleBarDivStyle}>
              <div style={titleDivStyle}>
                {title}
              </div>
              <div style={optionsDivStyle}>
                {options}
                { // add expand collapse option when available
                  expandable ? (
                    <IconButton key="expand.collapse" onTouchTap={onExpandChange}>
                      {
                        expanded ? <ExpandedIcon /> : <CollapsedIcon />
                      }
                    </IconButton>) : null
                }
              </div>
            </div>
          }
          subtitle={subtitle}
        />
        <CardMedia onKeyPress={onKeyPress} expandable>
          {/* prevent children to show when missing rights */}
          <NoContentMessageInfo
            noContent={noData || loading}
            title={formatMessage({ id: noDataTitleKey })}
            message={formatMessage({ id: noDataMessageKey })}
            Icon={loading ? UserInformationLoadingIcon : NotLoggedIcon}
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
  withI18n(messages, true), withModuleStyle(styles, true),
)(DynamicModule)
