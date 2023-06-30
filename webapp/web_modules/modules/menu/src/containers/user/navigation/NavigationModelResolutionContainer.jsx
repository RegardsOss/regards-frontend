/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessDomain } from '@regardsoss/domain'
import { AccessShapes, AdminShapes } from '@regardsoss/shape'
import { HOCUtils } from '@regardsoss/display-control'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../../domain/NavigationItemTypes'
import { HOME_ICON_TYPES_ENUM } from '../../../domain/HomeIconType'
import { VISIBILITY_MODES_ENUM } from '../../../domain/VisibilityModes'
import { HomeConfigurationShape, NavigationEditionItem } from '../../../shapes/ModuleConfiguration'
import homeSVGPublicURL from '../../../img/home.svg' // consume home svg icon to let webpack bundle it

const EMPTY_PAGE = {
  home: false,
  title: {},
  iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
}

/**
 * Provides resolved navigation items list by comparing configuration with dynamic modules list.
 * Also resolves the home item with right label / icon
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
export class NavigationModelResolutionContainer extends React.Component {
  /** Standard public role */
  static PUBLIC_ROLE = 'PUBLIC'

  /** Standard project admin role (has rights to all modules) */
  static PROJECT_ADMIN = 'PROJECT_ADMIN'

  /** Virtual instance admin role, as it is not provided by the backend (has rights to all modules) */
  static INSTANCE_ADMIN_VIRTUAL_ROLE = {
    name: 'INSTANCE_ADMIN',
  }

  /**
   * Checks if role name stands for role or one of its parents
   * @param {string} roleName role name
   * @param {*} role
   */
  static isRoleOrParent(roleName, role) {
    if (!role) {
      // beak case: searched role is not part of that role hierarchy
      return false
    }
    return roleName === role.name || NavigationModelResolutionContainer.isRoleOrParent(roleName, role.parentRole)
  }

  /**
   * Computes if requested role is allowed for current role
   * @param {requestedRole}
   * @param {*} role current role from borrowable roles list, not provided when user isn't logged. Shape: Role.content
   * @param {boolean} true if role is above or is requested role itself
   */
  static hasRequestedRole(requestedRole = NavigationModelResolutionContainer.PUBLIC_ROLE, role = {}) {
    return (
      // A - Is requested role public?
      requestedRole === NavigationModelResolutionContainer.PUBLIC_ROLE)
      // B - Is current role the requested role or above
      || NavigationModelResolutionContainer.isRoleOrParent(requestedRole, role)
      // C - Is it instance admin virtual role? (always allowed)
      || role === NavigationModelResolutionContainer.INSTANCE_ADMIN_VIRTUAL_ROLE
      // D - Is it project admin or one of its children roles? (always allowed)
      || NavigationModelResolutionContainer.isRoleOrParent(NavigationModelResolutionContainer.PROJECT_ADMIN, role)
  }

  /**
   * Is navigation item as parameter available for current role
   * @param {*} item item
   * @param {*} role current role from borrowable roles list, not provided when user isn't logged. Shape: Role.content
   */
  static isNavigationItemAvailable(item, role) {
    switch (item.visibilityMode) {
      case VISIBILITY_MODES_ENUM.ALWAYS:
        return true
      case VISIBILITY_MODES_ENUM.NEVER:
        return false
      case VISIBILITY_MODES_ENUM.FOR_ROLE:
        return NavigationModelResolutionContainer.hasRequestedRole(item.visibleForRole, role)
      default:
        throw new Error(`Unknown visibility mode ${item.visibilityMode}`)
    }
  }

  /**
   * Converts a module edited item and into corresponding runtime navigation item using both model and home configuration
   * @param {Module} dynamicModule found dynamic module (with content) as model for this runtime item, null if not found
   * @param {HomeConfigurationShape} homeConfiguration home configuration, respects the HomeConfigurationShape
   * @return {navigationItem, isHome}
   * - navigationItem: ModuleNavigationItem built for runtime display (null if not active)
   * - isHome: true if this module is home
   */
  static convertModule(dynamicModule, homeConfiguration) {
    if (!get(dynamicModule, 'content.active')) {
      // disabled module or model not found (deleted module)
      return { navigationItem: null, isHome: false }
    }
    const {
      content: {
        id, type, description, page = EMPTY_PAGE,
      },
    } = dynamicModule
    // link properties: from module
    let { iconType, customIconURL, title } = page

    // when home page, change link properties to use page configuration
    if (page.home) {
      title = get(homeConfiguration, 'title')
      // we need to determinate here the right icon and icon type from configuration
      switch (get(homeConfiguration, 'icon.type', HOME_ICON_TYPES_ENUM.DEFAULT_HOME_ICON)) {
        case HOME_ICON_TYPES_ENUM.NONE:
          // no type nor URL
          iconType = AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.NONE
          break
        case HOME_ICON_TYPES_ENUM.MODULE_ICON:
          break // use configuration from module, nothing to do
        case HOME_ICON_TYPES_ENUM.CUSTOM_URL_ICON:
          // use custom configuration from home  (redirect onto configured URL)
          iconType = AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.CUSTOM
          customIconURL = get(homeConfiguration, 'icon.url')
          break
        case HOME_ICON_TYPES_ENUM.DEFAULT_HOME_ICON:
        default:
          // use default home icon (redirect onto local URL)
          iconType = AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.CUSTOM
          customIconURL = homeSVGPublicURL
      }
    }
    return {
      isHome: page.home,
      navigationItem: {
        key: `module.${id}`,
        type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
        title,
        iconType,
        customIconURL,
        selected: false,
        module: {
          id, type, description,
        },
      },
    }
  }

  /**
   * Converts a section edited item and into corresponding runtime navigation item, or null if it shouldn't be displayed (no child)
   * @param {EditionSection} navigationSectionItem section as edited by module administrator
   * @param {[NavigationItem]} children children
   * @param {string} role current role (null when user is not logged)
   * @param {RoleList} borrowableRoles user borrowable roles (to retrieve current one)
   * @return {SectionNavigationItem} built section or null
   */
  static convertSection(navigationSectionItem, children, role, borrowableRoles) {
    return children.length
      && NavigationModelResolutionContainer.isNavigationItemAvailable(navigationSectionItem, role) ? {
        key: `section.${navigationSectionItem.id}`,
        type: navigationSectionItem.type,
        title: navigationSectionItem.title,
        iconType: navigationSectionItem.icon.type,
        customIconURL: navigationSectionItem.icon.url,
        selected: false,
        children,
      } : null
  }

  /**
   * Converts a link edited item and into corresponding runtime navigation item, or null if it shouldn't be displayed (no child)
   * @param {EditionLink} navigationLinkItem link as edited by module administrator
   * @param {string} role current role (null when user is not logged)
   * @param {RoleList} borrowableRoles user borrowable roles (to retrieve current one)
   * @return {LinkNavigationItem} built link or null
   */
  static convertLink(navigationLinkItem, role, borrowableRoles) {
    return NavigationModelResolutionContainer.isNavigationItemAvailable(navigationLinkItem, role) ? {
      key: `link.${navigationLinkItem.id}`,
      type: navigationLinkItem.type,
      title: navigationLinkItem.title,
      iconType: navigationLinkItem.icon.type,
      customIconURL: navigationLinkItem.icon.url,
      selected: false,
      url: navigationLinkItem.url,
    } : null
  }

  /**
   * Resolves edition module as parameter or return null (updates the available modules list)
   * @param {EditionModule} navigationModuleItem  navigation module item as edited by the user
   * @param {ModuleArray} dynamicModules current dynamic modules in application
   * @param {HomeConfigurationShape} homeConfiguration home configuration, respects the HomeConfigurationShape
   * @param {*} role current role from borrowable roles list, not provided when user isn't logged. Shape: Role.content
   * @return {remainingDynamicModules: ModuleArray, navigationItem:{ModuleNavigationItem}, isHome:{boolean}}:
   * - remainingDynamicModules: list of dynamic modules without this one if it was found.
   * - navigationItem: ModuleNavigationItem built for runtime display (null if not active)
   * - isHome: true if this module is home
   */
  static resolveModule(navigationModuleItem, dynamicModules, homeConfiguration, role) {
    // retrieve module, add conversion fields when found (if forbidden, still consume the dynamic module
    // from list as the remaining modules list will be considered PUBLIC)
    return dynamicModules.reduce(
      ({ remainingDynamicModules, isHome, navigationItem }, currentDynamicModule) => {
        if (currentDynamicModule.content.id === navigationModuleItem.id) {
          // we found the model, convert it if it is allowed for current user role
          const isAllowedItem = NavigationModelResolutionContainer.isNavigationItemAvailable(navigationModuleItem, role)
          // note: to get a 'no module info', when forbidden, we simply provide no dynamic module to converter
          return {
            remainingDynamicModules,
            // append all converted fields
            ...this.convertModule(isAllowedItem ? currentDynamicModule : null, homeConfiguration),
          }
        }
        // not the right model, keep it in remaining modules
        return { remainingDynamicModules: [...remainingDynamicModules, currentDynamicModule], isHome, navigationItem }
      }, { remainingDynamicModules: [], isHome: false, navigationItem: null })
  }

  /**
   * Resolves a list of items (filters the items that should be hidden)
   * It removes the found modules from remainingDynamicModules array and returns home module separately
   * @param {[NavigationEditionItem]} editedItems items array as edited by module administrator
   * @param {ModuleArray} dynamicModules current dynamic modules in application
   * @param {HomeConfigurationShape} homeConfiguration home configuration, respects the HomeConfigurationShape
   * @param {*} role current role from borrowable roles list, not provided when user isn't logged. Shape: Role.content
   * @return {remainingDynamicModules: ModuleArray, items: [NavigationItem], homeItem: {ModuleNavigationItem}} :
   * - remainingDynamicModules: list of dynamic modules without this children modules
   * - items: items that should be displayed
   * - homeItem: ModuleNavigationItem built for home item if it was found in this section or in its children
   */
  static resolveItems(editedItems, dynamicModules, homeConfiguration, role) {
    return editedItems.reduce(({ remainingDynamicModules, items, homeItem }, item) => {
      if (item.type === NAVIGATION_ITEM_TYPES_ENUM.MODULE) {
        // recursive break case
        const { remainingDynamicModules: moduleRDM, navigationItem, isHome } = NavigationModelResolutionContainer.resolveModule(item, remainingDynamicModules, homeConfiguration, role)
        const isChild = !!navigationItem && !isHome
        return {
          remainingDynamicModules: moduleRDM,
          items: isChild ? [...items, navigationItem] : items, // preserve children order, don't push home in standard list
          homeItem: isHome ? navigationItem : homeItem, // preverve previously found home if not that module
        }
      }
      if (item.type === NAVIGATION_ITEM_TYPES_ENUM.LINK) {
        const navigationItem = NavigationModelResolutionContainer.convertLink(item, role)
        return {
          remainingDynamicModules,
          items: navigationItem ? [...items, navigationItem] : items, // preserve children order, don't push home in standard list
          homeItem, // preserve previously found home
        }
      }
      // section (recursively loop)
      const { remainingDynamicModules: sectionRDM, items: sectionItems, homeItem: sectionHomeItem } = NavigationModelResolutionContainer.resolveItems(item.children, remainingDynamicModules, homeConfiguration, role)
      const sectionItem = NavigationModelResolutionContainer.convertSection(item, sectionItems, role)
      return {
        remainingDynamicModules: sectionRDM,
        items: sectionItem ? [...items, sectionItem] : items, // preserve children order
        homeItem: sectionHomeItem || homeItem, // preverve previously found home if not that section
      }
    }, { remainingDynamicModules: dynamicModules, items: [], homeItem: null })
  }

  /**
   * Resolves navigation configuration
   * @param {[NavigationEditionItem]} navigationConfiguration list of configured navigation edition items
   * @param {ModuleArray} dynamicModules current dynamic modules in application
   * @param {HomeConfigurationShape} homeConfiguration home configuration, respects the HomeConfigurationShape
   * @param {*} role current role from borrowable roles list, not provided when user isn't logged. Shape: Role.content
   * @return {[NavigationItem]} navigation items to display
   */
  static resolveNavigationModel(navigationConfiguration, dynamicModules, homeConfiguration, role) {
    // 1 - resolve modules that can be retrieved
    const { remainingDynamicModules, items = [], homeItem } = NavigationModelResolutionContainer.resolveItems(navigationConfiguration, dynamicModules, homeConfiguration, role)
    const resultingNavigationItems = []
    if (homeItem) {
      resultingNavigationItems.push(homeItem)
    }
    resultingNavigationItems.push(...items)

    // 2 - also create navigation elements for modules that was not defined last time administrator edited the menu configuration
    return remainingDynamicModules.reduce((navigationItems, module) => {
      // the home may have changed, and be undefined in items list. Therefore we also check here if we find it
      // Note: when working with undefined modules, we consider visibility mode as being ALWAYS (no check performed)
      const { navigationItem, isHome } = NavigationModelResolutionContainer.convertModule(module, homeConfiguration)
      if (navigationItem) {
        // append at end, except if the found dynamic module is home
        return isHome ? [navigationItem, ...navigationItems] : [...navigationItems, navigationItem]
      }
      // disabled module
      return navigationItems
    }, resultingNavigationItems)
  }

  /**
   * Updates selection in current navigation tree (clones the tree to avoid editing the set properties)
   * @param {[NavigationItem]} navigationItems currently resolved navigation items
   */
  static updateSelection(navigationItems, selectedModuleId) {
    return navigationItems.map((item) => {
      if (item.type === NAVIGATION_ITEM_TYPES_ENUM.MODULE) {
        // found module, is it the selected one?
        return { ...item, selected: item.module.id === selectedModuleId }
      }
      if (item.type === NAVIGATION_ITEM_TYPES_ENUM.LINK) {
        return { ...item, selected: false } // a link is never selected
      }
      // found section: does it contain the selected module?
      const updatedChildren = NavigationModelResolutionContainer.updateSelection(item.children, selectedModuleId)
      return {
        ...item,
        children: updatedChildren,
        selected: !!updatedChildren.find((child) => child.selected),
      }
    })
  }

  static propTypes = {
    /* Currently selected module ID */
    // eslint-disable-next-line react/no-unused-prop-types
    currentModuleId: PropTypes.number,
    // home configuration (from edited module configuration)
    // eslint-disable-next-line react/no-unused-prop-types
    homeConfiguration: HomeConfigurationShape, // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    navigationConfiguration: PropTypes.arrayOf(NavigationEditionItem), // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    dynamicModules: PropTypes.arrayOf(AccessShapes.Module), // used only in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    roleList: AdminShapes.RoleList.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    currentRole: PropTypes.string, // used only in onPropertiesUpdated
  }

  static defaultProps = {
    dynamicModules: [],
    navigationConfiguration: [],
  }

  /** Initial state */
  state = {
    navigationElements: null,
    children: null,
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
    // Algorithm: if the navigation model changed (including selection state), reclone the children with new model
    // Note: selection state and children change are handled separately as tree resolution is a long operation
    let navigationElements = null
    // 1 - detect modules list, configuration or current user role change to update navigation items list
    const {
      dynamicModules, homeConfiguration, navigationConfiguration,
      currentRole, roleList, currentModuleId, children,
    } = newProps
    if (!isEqual(oldProps.dynamicModules, dynamicModules)
      || !isEqual(oldProps.homeConfiguration, homeConfiguration)
      || !isEqual(oldProps.navigationConfiguration, navigationConfiguration)
      || !isEqual(oldProps.currentRole, currentRole)
      || !isEqual(oldProps.roleList, roleList)) {
      // 1.a - retrieve role (or provide virtual ADMIN_INSTANCE role if admin instance)
      const roleData = currentRole === NavigationModelResolutionContainer.INSTANCE_ADMIN_VIRTUAL_ROLE.name
        ? NavigationModelResolutionContainer.INSTANCE_ADMIN_VIRTUAL_ROLE // provide virtual instance admin role
        : get(roleList, `${currentRole}.content`) // provide role from borrowable roles
      // 1.b - convert modules and configuration into a navigation model with rights management
      navigationElements = NavigationModelResolutionContainer.resolveNavigationModel(navigationConfiguration, dynamicModules, homeConfiguration, roleData)
    }
    // 2 - detect selection changes or navigation tree changes to update selection in tree (note: navigation
    // elements is only set here when point 1 was previously executed)
    if (!isEqual(oldProps.currentModuleId, currentModuleId) || navigationElements) {
      // considered tree model: built at point 1 or previously built
      const currentNavigationElements = navigationElements || this.state.navigationElements
      navigationElements = NavigationModelResolutionContainer.updateSelection(currentNavigationElements, currentModuleId)
    }

    // 3 - just for updating purposes: when children list changes, mimic a navigation tree update
    // note: it is not required when navigation elements were already updated
    if (oldProps.children !== children && !navigationElements) {
      navigationElements = this.state.navigationElements
    }

    // 4 - When navigation tree changed (or children changed, see previous step), update children and state
    if (navigationElements) {
      this.setState({
        navigationElements,
        children: HOCUtils.cloneChildrenWith(children, { navigationElements }),
      })
    }
  }

  render() {
    const { children } = this.state
    return HOCUtils.renderChildren(children)
  }
}
export default NavigationModelResolutionContainer
