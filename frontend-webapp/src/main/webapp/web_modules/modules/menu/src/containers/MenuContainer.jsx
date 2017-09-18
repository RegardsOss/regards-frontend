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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import reduce from 'lodash/reduce'
import { connect } from '@regardsoss/redux'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import { AccessProjectClient, OrderClient } from '@regardsoss/client'
import { AccessShapes } from '@regardsoss/shape'
import { SelectLocaleContainer, i18nContextType } from '@regardsoss/i18n'
import { SelectThemeContainer, themeContextType } from '@regardsoss/theme'
import { AuthenticationClient } from '@regardsoss/authentication-manager'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { ModuleListContainer, modulesManager } from '@regardsoss/modules'
import AuthenticationMenuContainer from './AuthenticationMenuContainer'
import CartSelectorContainer from './CartSelectorContainer'

// get default layout client actions and reducers instances - we will use it to verify if containers are or not dynamic
const layoutSelectors = AccessProjectClient.LayoutSelectors()
// get default modules client actions and reducers instances - we will use it to verify if a basket exists AND if it is in a dynamic container
const modulesSelectors = AccessProjectClient.ModuleSelectors()
// build default basket actions to check if user has rights get its basket
const basketActionsGetDependencies = new OrderClient.OrderBasketActions().getDependencies('GET')

/**
 * Main component of module menu
 * @author Sébastien binda
 **/
export class MenuContainer extends React.Component {

  static USER_LAYOUT_NAME = 'user'

  static BASKET_DEPENDENCIES = basketActionsGetDependencies

  static mapStateToProps(state) {
    return {
      isAuthenticated: AuthenticationClient.authenticationSelectors.isAuthenticated(state),
      userLayout: layoutSelectors.getById(state, MenuContainer.USER_LAYOUT_NAME),
      modules: modulesSelectors.getList(state),
      availableEndpoints: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
    }
  }

  static propTypes = {
    // Set by module loader (LazyModuleComponent)
    project: PropTypes.string,
    appName: PropTypes.string.isRequired,
    // Module configuration.
    moduleConf: PropTypes.shape({
      title: PropTypes.string,
      displayAuthentication: PropTypes.bool,
      displayCartSelector: PropTypes.bool,
      displayLocaleSelector: PropTypes.bool,
      displayThemeSelector: PropTypes.bool,
    }),
    // from mapStateToProps
    isAuthenticated: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    userLayout: AccessShapes.Layout,
    // eslint-disable-next-line react/no-unused-prop-types
    modules: AccessShapes.ModuleList,
    // eslint-disable-next-line react/no-unused-prop-types
    availableEndpoints: PropTypes.arrayOf(PropTypes.string),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static DEFAULT_STATE = {
    displayCart: false,
    cartModuleId: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      moduleListOpen: false,
    }
  }

  /**
   * Lifecycle hook: component will mount, used here to update component state
   */
  componentWillMount = () => this.onPropertiesChanged({}, this.props)

  /**
   * Lifecycle hook: component will receive props, used here to update component state
   * @param nextProps component next properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesChanged(this.props, nextProps)

  /**
   * Updates component state (recompute properties related elements)
   * @param oldProps previous component
   * @param newProps new component props
   */
  onPropertiesChanged = (oldProps, newProps) => {
    // when dependencies, modules, layout or authentication changes, update the state properties related to displaying cart
    // note that it may throw an exception to inform the administor that the module configuration is wrong
    const oldState = this.state
    let newState = oldState || MenuContainer.DEFAULT_STATE
    if (!isEqual(oldProps.isAuthenticated, newProps.isAuthenticated) ||
      !isEqual(oldProps.userLayout, newProps.userLayout) ||
      !isEqual(oldProps.modules, newProps.modules) ||
      !isEqual(oldProps.availableEndpoints, newProps.availableEndpoints)) {
      newState = this.computeCartState(newProps)
    }

    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  /**
   * Computes cart related state fields from component properties
   * @param {*} properties this component properties
   * @return {{displayCart: bool, cartModuleId: number | null}} next state cart fields
   */
  computeCartState = ({ isAuthenticated, modules, userLayout, moduleConf, availableEndpoints }) => {
    // A - Is option enabled?
    if (moduleConf.displayCartSelector) { // Yes
      // B - Check configuration (verify that there is ONE AND ONLY ONE order cart dynamic module)
      // B.1 - (optimization): find all dynamic containers (avoid computing them for each module)
      const allContainers = get(userLayout, 'content.layout.containers', [])
      const dynamicContainersIds = reduce(allContainers, (acc, { dynamicContent = false, id }) => dynamicContent ?
        [...acc, id] : acc, [])
      // B.2 - Is there one or more order cart modules set up in a dynamic container? (resolved in dynamicContainersIds).
      // Note: include only active modules!
      const dynamicOrderCartModules = reduce((modules || {}), (acc, module) => {
        const containerId = get(module, 'content.container', '')
        const moduleType = get(module, 'content.type', '')
        const isActiveModule = get(module, 'content.active', false)
        return isActiveModule && modulesManager.ModuleTypes.ORDER_CART === moduleType && dynamicContainersIds.includes(containerId) ?
          [...acc, module] : acc
      }, [])
      if (dynamicOrderCartModules.length !== 1) { // error case: wrong REGARDS UI configuration
        throw new Error('Menu module configuration error: there must be one and only one instance of active order-cart module when display cart selector option is enabled')
      }
      // C - check that user is authenticated and has enough rights to read the cart content from backend
      return {
        // TODO : enable back on first line: isAuthenticated &&
        displayCart: allMatchHateoasDisplayLogic(MenuContainer.BASKET_DEPENDENCIES, availableEndpoints),
        cartModuleId: dynamicOrderCartModules[0].content.id,
      }
    }
    // default: nope
    return MenuContainer.DEFAULT_STATE
  }


  displaySeparator = (elt) => {
    if (elt === null) {
      return {
        display: 'none',
      }
    }
    return {
      marginLeft: 0,
    }
  }

  displayModulesMenu = () => {
    if (this.props.appName === 'user') {
      const { intl } = this.context
      return (
        <div>
          <IconButton
            onTouchTap={this.handleToggle}
            title={intl.formatMessage({ id: 'menu.modules.list.button' })}
          >
            <MenuIcon />
          </IconButton>
          <ModuleListContainer
            project={this.props.project}
            open={this.state.moduleListOpen}
            onCloseMenu={this.handleClose}
          />
        </div>
      )
    }
    return null
  }

  /**
   * Toggle the sidebar containing modules
   */
  handleToggle = () => this.setState({ moduleListOpen: !this.state.moduleListOpen })

  /**
   * Close the sidebar containing modules
   */
  handleClose = () => this.setState({ moduleListOpen: false })

  render() {
    const { appName, project, moduleConf, isAuthenticated } = this.props
    const { displayCart, cartModuleId } = this.state
    const { moduleTheme, intl } = this.context

    const title = this.props.moduleConf.title ? this.props.moduleConf.title : ''
    const style = {
      headContainer: {
        styles: moduleTheme.bar,
      },
      title: moduleTheme.title,
    }
    let authentication = null
    if (moduleConf.displayAuthentication) {
      authentication = (
        <AuthenticationMenuContainer
          appName={appName}
          project={project}
          isAuthenticated={isAuthenticated}
        />
      )
    }

    let themeSelector = null
    if (moduleConf.displayThemeSelector) {
      themeSelector = (
        <SelectThemeContainer tooltip={intl.formatMessage({ id: 'user.menu.displaytheme' })} />
      )
    }

    let localeSelector = null
    if (moduleConf.displayLocaleSelector) {
      localeSelector = (
        <SelectLocaleContainer tooltip={intl.formatMessage({ id: 'user.menu.displaylocale' })} />
      )
    }

    let cartSelector = null
    if (displayCart) {
      cartSelector = (
        <CartSelectorContainer project={project} cartModuleId={cartModuleId} />
      )
    }

    const menu = this.displayModulesMenu()

    const toolBarStyle = { ...this.displaySeparator(menu), marginLeft: 10 }

    return (
      <Toolbar style={style.headContainer.styles}>
        <ToolbarGroup firstChild>
          <ToolbarTitle text={title} style={style.title} />
        </ToolbarGroup>
        <ToolbarGroup lastChild>
          {authentication}
          <ToolbarSeparator style={toolBarStyle} />
          {localeSelector}
          <ToolbarSeparator style={this.displaySeparator(localeSelector)} />
          {cartSelector}
          <ToolbarSeparator style={this.displaySeparator(cartSelector)} />
          {themeSelector}
          <ToolbarSeparator style={this.displaySeparator(themeSelector)} />
          {menu}
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default connect(MenuContainer.mapStateToProps)(MenuContainer)
