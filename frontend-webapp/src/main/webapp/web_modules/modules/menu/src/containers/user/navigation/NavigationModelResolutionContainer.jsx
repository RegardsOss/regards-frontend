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
import { AccessDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { HOCUtils } from '@regardsoss/display-control'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../../domain/NavigationItemTypes'
import { HOME_ICON_TYPES_ENUM } from '../../../domain/HomeIconType'
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
 */
export class NavigationModelResolutionContainer extends React.Component {
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
   * @return {SectionNavigationItem} built section or null
   */
  static convertSection(navigationSectionItem, children) {
    return children.length ? {
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
   * Resolves edition module as parameter or return null (updates the available modules list)
   * @param {EditionModule} navigationModuleItem  navigation module item as edited by the user
   * @param {ModuleArray} dynamicModules current dynamic modules in application
   * @param {HomeConfigurationShape} homeConfiguration home configuration, respects the HomeConfigurationShape
   * @return {remainingDynamicModules: ModuleArray, navigationItem:{ModuleNavigationItem}, isHome:{boolean}}:
   * - remainingDynamicModules: list of dynamic modules without this one if it was found.
   * - navigationItem: ModuleNavigationItem built for runtime display (null if not active)
   * - isHome: true if this module is home
   */
  static resolveModule(navigationModuleItem, dynamicModules, homeConfiguration) {
    // retrieve module, add conversion fields when found
    return dynamicModules.reduce(
      ({ remainingDynamicModules, isHome, navigationItem }, currentDynamicModule) =>
        currentDynamicModule.content.id === navigationModuleItem.id ?
          // we found the model, convert it
          { remainingDynamicModules, ...this.convertModule(currentDynamicModule, homeConfiguration) } :
          // not the right model, keep it in remaining modules
          { remainingDynamicModules: [...remainingDynamicModules, currentDynamicModule], isHome, navigationItem }
      , { remainingDynamicModules: [], isHome: false, navigationItem: null })
  }

  /**
   * Resolves a list of items (filters the items that should be hidden)
   * It removes the found modules from remainingDynamicModules array and returns home module separately
   * @param {[NavigationEditionItem]} editedItems items array as edited by module administrator
   * @param {ModuleArray} dynamicModules current dynamic modules in application
   * @param {HomeConfigurationShape} homeConfiguration home configuration, respects the HomeConfigurationShape
   * @return {remainingDynamicModules: ModuleArray, items: [NavigationItem], homeItem: {ModuleNavigationItem}} :
   * - remainingDynamicModules: list of dynamic modules without this children modules
   * - items: items that should be displayed
   * - homeItem: ModuleNavigationItem built for home item if it was found in this section or in its children
   */
  static resolveItems(editedItems, dynamicModules, homeConfiguration) {
    return editedItems.reduce(({ remainingDynamicModules, items, homeItem }, item) => {
      if (item.type === NAVIGATION_ITEM_TYPES_ENUM.MODULE) {
        // recursive break case
        const { remainingDynamicModules: moduleRDM, navigationItem, isHome } =
          NavigationModelResolutionContainer.resolveModule(item, remainingDynamicModules, homeConfiguration)
        const isChild = !!navigationItem && !isHome
        return {
          remainingDynamicModules: moduleRDM,
          items: isChild ? [...items, navigationItem] : items, // preserve children order, don't push home in standard list
          homeItem: isHome ? navigationItem : homeItem, // preverve previously found home if not that module
        }
      }
      // section (recursively loop)
      const { remainingDynamicModules: sectionRDM, items: sectionItems, homeItem: sectionHomeItem } =
        NavigationModelResolutionContainer.resolveItems(item.children, remainingDynamicModules, homeConfiguration)
      const sectionItem = NavigationModelResolutionContainer.convertSection(item, sectionItems)
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
   * @return {[NavigationItem]} navigation items to display
   */
  static resolveNavigationModel(navigationConfiguration, dynamicModules, homeConfiguration) {
    // 1 - resolve modules that can be retrieved
    const { remainingDynamicModules, items = [], homeItem } =
      NavigationModelResolutionContainer.resolveItems(navigationConfiguration, dynamicModules, homeConfiguration)
    const resultingNavigationItems = []
    if (homeItem) {
      resultingNavigationItems.push(homeItem)
    }
    resultingNavigationItems.push(...items)

    // 2 - also create navigation elements for modules that was not defined last time administrator edited the menu configuration
    return remainingDynamicModules.reduce((navigationItems, module) => {
      // the home may have changed, and be undefined in items list. Therefore we also check here if we find it
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
      // found section: does it contain the selected module?
      const updatedChildren = NavigationModelResolutionContainer.updateSelection(item.children, selectedModuleId)
      return {
        ...item,
        children: updatedChildren,
        selected: !!updatedChildren.find(child => child.selected),
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
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    // Algorithm: if the navigation model changed (including selection state), reclone the children with new model
    // Note: selection state is handled separately as tree resolution is a long operation (we avoid to perform it
    // too many times)
    let navigationElements = null
    // 1 - detect children or modules list changes
    if (!isEqual(oldProps.dynamicModules, newProps.dynamicModules) ||
      !isEqual(oldProps.homeConfiguration, newProps.homeConfiguration) ||
      !isEqual(oldProps.navigationConfiguration, newProps.navigationConfiguration) ||
      oldProps.children !== newProps.children) {
      // 2 - convert modules and configuration into a navigation model
      const { dynamicModules, homeConfiguration, navigationConfiguration } = newProps
      navigationElements =
        NavigationModelResolutionContainer.resolveNavigationModel(navigationConfiguration, dynamicModules, homeConfiguration)
    }
    // 2 - detect selection changes or navigation tree changes to update selection in tree (note: navigation
    // elements is only set here when point 1 was previously executed)
    if (!isEqual(oldProps.currentModuleId, newProps.currentModuleId) || navigationElements) {
      // considered tree model: built at point 1 or previously built
      const currentNavigationElements = navigationElements || this.state.navigationElements
      navigationElements = NavigationModelResolutionContainer.updateSelection(currentNavigationElements, newProps.currentModuleId)
    }

    // 3 - When navigation tree changed, store in state children with navigation elements as property
    if (navigationElements) {
      this.setState({
        navigationElements,
        children: HOCUtils.cloneChildrenWith(newProps.children, { navigationElements }),
      })
    }
  }


  render() {
    const { children } = this.state
    return HOCUtils.renderChildren(children)
  }
}
export default NavigationModelResolutionContainer
