/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { Card } from 'material-ui/Card'
import NotLoggedIcon from 'material-ui/svg-icons/action/lock'
import { UIDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { HOCUtils, ShowableAtRender } from '@regardsoss/display-control'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { AuthenticationClient } from '@regardsoss/authentication-utils'
import { i18nContextType, i18nSelectors, withI18n } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType, SwitchThemeDecorator } from '@regardsoss/theme'
import { moduleExpandedStateActions, moduleExpandedStateSelectors } from './clients/ModuleExpandedStateClient'
import NoContentMessageInfo from '../cards/NoContentMessageInfo'
import UserInformationLoadingIcon from './UserInformationLoadingIcon'
import ModuleTitle from './ModuleTitle'
import styles from './styles'
import messages from './i18n'
import CardMediaWithCustomBG from './CardMediaWithCustomBG'


/** User app name */
const userAppName = 'user'

/**
 * Presents a dynamic module.
 * - It appends its own context to parent context
 * - It binds authentication and endpoints to check if it should show not authentified / not enough right messages
 * - It is intended to display dynamic modules user container. It can adapt to both user and admin interface (ie: user container
 * here is the 'view' part of the dynamic modules - legacy name)
 * - It resolves module title, icon, expandable and expanded state from module configuration (module fields)
 *
 * Expand / collapse state is controlled using redux client ModuleExpandedState and is therefore shared with
 * potential external controllers
 *
 * It uses moduleConf field for title, icon, expandable and expanded state
 *
 * Please note that expandable functionality is disabled for admin apps (module is shown expanded and not expandable)
 *
 * @author Raphaël Mechali
 */
export class DynamicModulePane extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { type, appName }) {
    return {
      // in admin apps, use default props (the action/reducer/selectors are only for user app modules)
      expandable: appName === userAppName ? moduleExpandedStateSelectors.isExpandable(state, type) : undefined,
      expanded: appName === userAppName ? moduleExpandedStateSelectors.isExpanded(state, type) : undefined,
      fetching: CommonEndpointClient.endpointSelectors.isFetching(state) ||
        AuthenticationClient.authenticationSelectors.isFetching(state),
      availableDependencies: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
      isAuthenticated: AuthenticationClient.authenticationSelectors.isAuthenticated(state),
      locale: i18nSelectors.getLocale(state),
    }
  }


  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { type, appName }) {
    // use store when in user app, ignore event in admin apps (not expandable when in admin app)
    return {
      dispatchSetInitialState: (expandable, expanded) =>
        appName === userAppName &&
        dispatch(moduleExpandedStateActions.initialize(type, expandable, expanded)),
      dispatchSetExpanded: expanded =>
        (appName === userAppName &&
          dispatch(moduleExpandedStateActions.setExpanded(type, expanded))),
    }
  }


  static propTypes = {
    // A - Module configuration related
    ...AccessShapes.runtimeDispayModuleFields,
    // B - Control and graphics related
    // optional module subtitle
    subtitle: PropTypes.string,
    // module title bar options
    options: PropTypes.arrayOf(PropTypes.node),
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
    // Title component: when provided, it replaces the module title and icon
    titleComponent: PropTypes.node,
    // from map state to props
    expandable: PropTypes.bool,
    expanded: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    fetching: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    availableDependencies: PropTypes.arrayOf(PropTypes.string), // async use
    // eslint-disable-next-line react/no-unused-prop-types
    isAuthenticated: PropTypes.bool.isRequired, // async use
    locale: PropTypes.oneOf(UIDomain.LOCALES).isRequired,
    // from map dispatch to props
    dispatchSetInitialState: PropTypes.func.isRequired,
    dispatchSetExpanded: PropTypes.func.isRequired,
  }

  static defaultProps = {
    // API
    options: [],
    requiresAuthentication: false,
    requiredDependencies: [],
    // map state to props
    availableDependencies: [],
    expandable: false, // default for admin or when not initialized
    expanded: true, // default for admin or when not initialized
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
    // children list
    children: null,
  }

  /**
   * Lifecycle method, used here to recompute authentication and dependencies state
   */
  componentWillMount = () => {
    // initialize redux store with this configuration
    const primaryPaneMode = get(this.props, 'moduleConf.primaryPane', UIDomain.MODULE_PANE_DISPLAY_MODES_ENUM.EXPANDED_COLLAPSIBLE)
    const expandable = primaryPaneMode !== UIDomain.MODULE_PANE_DISPLAY_MODES_ENUM.ALWAYS_EXPANDED
    const expanded = primaryPaneMode !== UIDomain.MODULE_PANE_DISPLAY_MODES_ENUM.COLLAPSED_EXPANDABLE
    this.props.dispatchSetInitialState(expandable, expanded)
    // let properties changed update this state
    this.onPropertiesChanged({}, this.props)
  }

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
      newState = {
        ...DynamicModulePane.DEFAULT_STATE,
      }
    }

    if (!isEqual(oldState, newState) || oldProps.children !== newProps.children) {
      this.setState(newState)
    }
  }

  onExpandChange = () => {
    const { expandable, expanded, dispatchSetExpanded } = this.props
    if (expandable) {
      // toggle expanded state
      dispatchSetExpanded(!expanded)
    }
  }

  render() {
    const {
      locale, description, page, subtitle, options, onKeyPress,
      type, titleComponent, expandable, expanded, children,
    } = this.props
    const {
      noData, loading, noDataTitleKey, noDataMessageKey,
    } = this.state
    const { intl: { formatMessage } } = this.context

    return (
      <Card expanded>
        <ModuleTitle
          type={type}
          locale={locale}
          description={description}
          page={page}
          titleComponent={titleComponent}
          subtitle={subtitle}
          options={options}
          expandable={expandable}
          expanded={expanded}
          onExpandChange={this.onExpandChange}
        />
        <SwitchThemeDecorator
          useMainTheme={false}
        >
          <ShowableAtRender show={expanded}>
            <CardMediaWithCustomBG onKeyPress={onKeyPress}>
              {/* prevent children to show when missing rights */}
              <NoContentMessageInfo
                noContent={noData || loading}
                title={formatMessage({ id: noDataTitleKey })}
                message={formatMessage({ id: noDataMessageKey })}
                Icon={loading ? UserInformationLoadingIcon : NotLoggedIcon}
              >
                {HOCUtils.renderChildren(children)}
              </NoContentMessageInfo>
            </CardMediaWithCustomBG>
          </ShowableAtRender>
        </SwitchThemeDecorator>
      </Card >
    )
  }
}

export default compose(
  connect(DynamicModulePane.mapStateToProps, DynamicModulePane.mapDispatchToProps),
  withI18n(messages, true), withModuleStyle(styles, true),
)(DynamicModulePane)
