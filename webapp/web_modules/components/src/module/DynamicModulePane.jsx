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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import isNil from 'lodash/isNil'
import { Card } from 'material-ui/Card'
import NotLoggedIcon from 'mdi-material-ui/Lock'
import { UIDomain } from '@regardsoss/domain'
import { UIClient } from '@regardsoss/client'
import { AccessShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { HOCUtils, ShowableAtRender } from '@regardsoss/display-control'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { AuthenticationClient } from '@regardsoss/authentication-utils'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType, SwitchThemeDecorator } from '@regardsoss/theme'
import { moduleExpandedStateActions, moduleExpandedStateSelectors } from './clients/ModuleExpandedStateClient'
import NoContentMessageInfo from '../cards/NoContentMessageInfo'
import UserInformationLoadingIcon from './UserInformationLoadingIcon'
import ModuleTitle from './ModuleTitle'
import styles from './styles'
import messages from './i18n'
import CardMediaWithCustomBG from './CardMediaWithCustomBG'

/**
 * This module is intended to display dynamic modules user container. It can adapt to both user and admin interface (ie: user container
 * here is the 'view' part of the dynamic modules - legacy name)
 * - It appends its own context to parent context (i18n and styles)
 * - It binds authentication and endpoints to check if it should show not authentified / not enough right messages
 * - It resolves module title, icon and presentation state from module configuration (module fields)
 * - It initializes the module presentation state in redux if not already done, using ModuleExpandedState client
 *
 * It uses moduleConf field for title, icon, expandable and expanded state
 *
 * Please note that expandable functionality is disabled for admin apps (module is shown expanded and not expandable)
 *
 * @author Raphaël Mechali
 */
export class DynamicModulePane extends React.Component {
  static propTypes = {
    // A - Module configuration related
    ...AccessShapes.runtimeDispayModuleFields,
    // B - Control and graphics related
    mainModule: PropTypes.bool, // set to false to get a non growing dynamic module pane
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
    presentationState: PropTypes.oneOf(UIDomain.PRESENTATION_STATE),
    // raw presentation state from store, without default value, that is used to determine initialization state
    storedPresentationState: PropTypes.oneOf(UIDomain.PRESENTATION_STATE),
    // eslint-disable-next-line react/no-unused-prop-types
    fetching: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    availableDependencies: PropTypes.arrayOf(PropTypes.string), // async use
    // eslint-disable-next-line react/no-unused-prop-types
    isAuthenticated: PropTypes.bool.isRequired, // async use
    // from map dispatch to props
    dispatchSetInitialState: PropTypes.func.isRequired,
    dispatchSetMinimized: PropTypes.func.isRequired,
    dispatchSetNormal: PropTypes.func.isRequired,
    dispatchSetMaximized: PropTypes.func.isRequired,
  }

  static defaultProps = {
    // API
    options: [],
    requiresAuthentication: false,
    requiredDependencies: [],
    // map state to props
    availableDependencies: [],
    expandable: false, // default for admin or when not initialized
    presentationState: UIDomain.PRESENTATION_STATE_ENUM.NORMAL, // default for admin or when not initialized
    mainModule: true, // convenient default for auto driven modules
  }

  static contextTypes = {
    ...themeContextType,
  }

  static DEFAULT_STATE = {
    noData: false,
    loading: false,
    // any valid key is ok here
    noDataTitleKey: 'dynamic.module.not.authenticated.title',
    noDataMessageKey: 'dynamic.module.not.authenticated.message',
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { type, id }) {
    const presentationKey = UIClient.ModuleExpandedStateActions.getPresentationModuleKey(type, id)
    const presentationState = moduleExpandedStateSelectors.getPresentationState(state, presentationKey)
    return {
      expandable: moduleExpandedStateSelectors.isExpandable(state, presentationKey),
      presentationState,
      storedPresentationState: presentationState, // raw presentation state from redux
      fetching: CommonEndpointClient.endpointSelectors.isFetching(state) || AuthenticationClient.authenticationSelectors.isFetching(state),
      availableDependencies: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
      isAuthenticated: AuthenticationClient.authenticationSelectors.isAuthenticated(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, { type, id }) {
    const presentationKey = UIClient.ModuleExpandedStateActions.getPresentationModuleKey(type, id)
    // use store when in user app, ignore event in admin apps (not expandable when in admin app)
    return {
      dispatchSetInitialState: (expandable, expanded) => dispatch(moduleExpandedStateActions.initialize(presentationKey, expandable, expanded)),
      dispatchSetMinimized: () => dispatch(moduleExpandedStateActions.setMinimized(presentationKey)),
      dispatchSetNormal: () => dispatch(moduleExpandedStateActions.setNormal(presentationKey)),
      dispatchSetMaximized: () => dispatch(moduleExpandedStateActions.setMaximized(presentationKey)),
    }
  }

  /**
   * Lifecycle method, used here to recompute authentication and dependencies state
   */
  UNSAFE_componentWillMount = () => {
    const { storedPresentationState } = this.props
    // initialize redux store with this configuration, when layout options should be shown AND not yet initializd (keeps state while
    // user change pages)
    if (this.showLayoutOptions() && isNil(storedPresentationState)) {
      const primaryPaneMode = get(this.props, 'moduleConf.primaryPane', UIDomain.MODULE_PANE_DISPLAY_MODES_ENUM.EXPANDED_COLLAPSIBLE)
      const expansible = UIDomain.isModulePaneExpansible(primaryPaneMode)
      const expanded = UIDomain.isModulePaneExpanded(primaryPaneMode)
      this.props.dispatchSetInitialState(expansible, expanded)
    }
    // let properties changed update this state
    this.onPropertiesChanged({}, this.props)
  }

  /**
   * Lifecycle method, used here to recompute authentication and dependencies state
   * @param nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesChanged(this.props, nextProps)

  /**
   * On properties changed: used to detect changes in incoming component properties
   * @param {*} oldProps old component properties
   * @param {*} newProps new component properties
   */
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

    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  /**
   * @return applying module style for current presentation state
   */
  getModuleStyle = () => {
    const { presentationState, mainModule } = this.props
    const { maximizedStyle, growingStyle, defaultStyle } = this.context.moduleTheme.module
    if (presentationState === UIDomain.PRESENTATION_STATE_ENUM.MAXIMIZED) {
      return maximizedStyle // maximized
    }
    if (mainModule) {
      return growingStyle // growing vertically
    }
    return defaultStyle // default
  }

  /**
   * @return true if layout options should be shown
   */
  showLayoutOptions = () => this.props.appName === UIDomain.APPLICATIONS_ENUM.USER

  render() {
    const {
      description, page, subtitle, options, onKeyPress,
      type, titleComponent, expandable, presentationState, children,
      dispatchSetMinimized, dispatchSetNormal, dispatchSetMaximized,
    } = this.props
    const {
      noData, loading, noDataTitleKey, noDataMessageKey,
    } = this.state
    const {
      moduleTheme: {
        module: {
          cardRootContainerStyle,
          content: {
            moduleMediaRootStyle, moduleMediaStyle, moduleContentStyle,
          },
        },
      },
    } = this.context
    return (
      <Card
        style={this.getModuleStyle()}
        containerStyle={cardRootContainerStyle}
        expanded
      >
        <ModuleTitle
          type={type}
          description={description}
          page={page}
          titleComponent={titleComponent}
          subtitle={subtitle}
          options={options}
          expandable={expandable}
          presentationState={presentationState}
          onSetMinimized={dispatchSetMinimized}
          onSetNormalState={dispatchSetNormal}
          onSetMaximized={dispatchSetMaximized}
          showLayoutOptions={this.showLayoutOptions()}
        />
        <SwitchThemeDecorator
          useMainTheme={false}
        >
          <ShowableAtRender show={presentationState !== UIDomain.PRESENTATION_STATE_ENUM.MINIMIZED}>
            <CardMediaWithCustomBG
              style={moduleMediaRootStyle}
              mediaStyle={moduleMediaStyle}
              onKeyPress={onKeyPress}
            >
              {/* prevent children to show when missing rights  */}
              <NoContentMessageInfo
                noContent={noData || loading}
                titleKey={noDataTitleKey}
                messageKey={noDataMessageKey}
                Icon={loading ? UserInformationLoadingIcon : NotLoggedIcon}
              >
                <div style={moduleContentStyle}>
                  {HOCUtils.renderChildren(children)}
                </div>
              </NoContentMessageInfo>
            </CardMediaWithCustomBG>
          </ShowableAtRender>
        </SwitchThemeDecorator>
      </Card>
    )
  }
}

export default compose(
  connect(DynamicModulePane.mapStateToProps, DynamicModulePane.mapDispatchToProps),
  withI18n(messages, true), withModuleStyle(styles, true),
)(DynamicModulePane)
