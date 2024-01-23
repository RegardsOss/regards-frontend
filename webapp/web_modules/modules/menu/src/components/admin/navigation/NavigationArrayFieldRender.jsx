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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../../domain/NavigationItemTypes'
import { HomeConfigurationShape, NavigationEditionItem } from '../../../shapes/ModuleConfiguration'
import {
  buildItemForModule, filterItems, findAllSections, findAllLinks,
  getItemPathIn, getItemByPathIn, removeItemAt, moveItemAtPath,
} from '../../../domain/NavigationTreeHelper'
import NavigationTree from './NavigationTree'
import { VISIBILITY_MODES_ENUM } from '../../../domain/VisibilityModes'
import NavigationItemEditionDialog from './dialogs/NavigationItemEditionDialog'

/**
 * Array field to edit navigation model
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class NavigationArrayFieldRender extends React.Component {
  /**
   * Builds initial edition model for modules (only modules initially)
   * @param {[NavigationEditionItem]} navigationItems edition model as retrieved (or empty)
   * @param {ModuleArray} dynamicModules dynamic modules
   * @return {[NavigationEditionItem]} field elements as NavigationEditionItem array
   */
  static updateEditionModel(navigationItems, dynamicModules) {
    // when updating, remove modules that do no longer exist and add new modules (keep home separately to add it as first module)
    const { items, homeItem, newModules } = filterItems(navigationItems, dynamicModules)
    const editionModelItems = []
    let filteredNewModules = newModules
    // 1 - Restore or create home module (exclude it from new modules list)
    if (homeItem) {
      // home item was found, add it as first module
      editionModelItems.push(homeItem)
    } else {
      // home item wasn't found, check in new modules
      const { modules: newModulesWitoutHome, home: homeModule } = newModules.reduce(({ modules, home }, module) => {
        if (!home && get(module, 'content.page.home')) { // home when not found before
          return { modules, home: module }
        }
        return { modules: [...modules, module], home }
      }, { modules: [], home: null })
      if (homeModule) {
        // home item was found, update items list and new modules list (home module must be removed from new modules list)
        filteredNewModules = newModulesWitoutHome
        editionModelItems.push(buildItemForModule(homeModule))
      }
    }
    // 2 - Restore edition items that could be retrieved
    editionModelItems.push(...items)
    // 3 - Create new items for each new module
    editionModelItems.push(...filteredNewModules.map(buildItemForModule))
    return editionModelItems
  }

  /**
   * Packs items for edition dialog: adds titles to modules (as the dialog itself cannot access dynamic moduleslist )
   * @param {en:string, fr:string} homeTitle configuration: home title from configuration
   * @param {[NavigationEditionItem]} items list
   * @return [NavigationEditionItem] packed items list
   */
  static packItemsForDialog(homeTitle, dynamicModules, items) {
    return items.map((item) => {
      let { title } = item
      let description = null
      let children = null
      const isModule = item.type === NAVIGATION_ITEM_TYPES_ENUM.MODULE
      if (isModule) { // A module retrieve title and description
        const correspondingModel = dynamicModules.find(({ content: { id } }) => id === item.id)
        if (get(correspondingModel, 'content.page.home')) {
          title = homeTitle
        } else {
          title = get(correspondingModel, 'content.page.title')
        }
        description = get(correspondingModel, 'content.description')
      } else if (item.type === NAVIGATION_ITEM_TYPES_ENUM.SECTION) { // A section: pack children items too
        children = this.packItemsForDialog(homeTitle, dynamicModules, item.children)
      }
      return {
        ...item, description, title, children,
      }
    })
  }

  /**
   * Computes if there is currently home
   * @param {[*]} dynamicModules Dynamic modules array
   * @return {boolean} true if there is home, false otherwise
   */
  static hasHome(dynamicModules) {
    return dynamicModules.some(({ content: { page = {} } }) => page.home) || false // do not return undefined
  }

  static propTypes = {
    dynamicModules: AccessShapes.ModuleArray,
    homeConfiguration: HomeConfigurationShape,
    navigationItems: PropTypes.arrayOf(NavigationEditionItem).isRequired,
    roleList: AdminShapes.RoleList.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    changeNavigationFieldValue: PropTypes.func.isRequired, // used only in onPropertiesUpdated
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  static onPropertiesUpdated(oldProps, newProps) {
    const { dynamicModules, navigationItems, changeNavigationFieldValue } = newProps
    // when modules are loaded, update conf (no problem here when there is no module, User application part will filter
    // missing modules)
    if (!isEqual(oldProps.dynamicModules, dynamicModules) && dynamicModules.length) {
      changeNavigationFieldValue(NavigationArrayFieldRender.updateEditionModel(navigationItems, dynamicModules))
    }
  }

  /** Initial state */
  state = {
    editionData: null,
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update this field value
   * */
  UNSAFE_componentWillMount() {
    NavigationArrayFieldRender.onPropertiesUpdated({}, this.props)
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => NavigationArrayFieldRender.onPropertiesUpdated(this.props, nextProps)

  /**
   * User asked to create a section: initialize new section model and show edition dialog
   */
  onCreateSection = () => {
    const { homeConfiguration, dynamicModules, navigationItems } = this.props
    // 1 - get sections to generate a unique ID greater than the last known section
    const newSectionId = 1 + findAllSections(navigationItems).reduce((foundMax, sectionItem) => sectionItem.id > foundMax ? sectionItem.id : foundMax, 0)
    // 2 - Pack edition data
    this.setState({
      editionData: {
        onDone: this.onEditDone,
        dialogTitleKey: 'menu.form.navigation.create.section.dialog.title',
        item: {
          id: newSectionId,
          type: NAVIGATION_ITEM_TYPES_ENUM.SECTION,
          visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
          visibleForRole: null,
          icon: { type: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT, url: '' },
          title: { en: 'New section', fr: 'Nouvelle section' }, // no need for i18n here
          children: [],
        },
        itemPath: [navigationItems.length], // added at end by default
        navigationItems: NavigationArrayFieldRender.packItemsForDialog(homeConfiguration.title, dynamicModules, navigationItems),
        hasHome: NavigationArrayFieldRender.hasHome(dynamicModules),
      },
    })
  }

  /**
   * User asked to create a link: initialize new link model and show edition dialog
   */
  onCreateLink = () => {
    const { homeConfiguration, dynamicModules, navigationItems } = this.props
    // 1 - get links to generate a unique ID greater than the last known link
    const newLinkId = 1 + findAllLinks(navigationItems).reduce((foundMax, linkItem) => linkItem.id > foundMax ? linkItem.id : foundMax, 0)
    // 2 - Pack edition data
    this.setState({
      editionData: {
        onDone: this.onEditDone,
        dialogTitleKey: 'menu.form.navigation.create.link.dialog.title',
        item: {
          id: newLinkId,
          type: NAVIGATION_ITEM_TYPES_ENUM.LINK,
          visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
          visibleForRole: null,
          icon: { type: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT, url: '' },
          title: { en: 'New link', fr: 'Nouveau lien' }, // no need for i18n here
          url: '',
        },
        itemPath: [navigationItems.length], // added at end by default
        navigationItems: NavigationArrayFieldRender.packItemsForDialog(homeConfiguration.title, dynamicModules, navigationItems),
        hasHome: NavigationArrayFieldRender.hasHome(dynamicModules),
      },
    })
  }

  /**
   * User asked to edit an element: show corresponding dialog
   * @param {string} type element type form NAVIGATION_ITEM_TYPES_ENUM
   * @param {number} id element ID
   */
  onEditItem = (type, id) => {
    // 1 - retrieve element
    const { homeConfiguration, dynamicModules, navigationItems } = this.props
    const itemPath = getItemPathIn(navigationItems, { type, id })

    // 2 - pack edition data for edit dialog
    let str = 'menu.form.navigation.edit.module.dialog.title'
    if (type === NAVIGATION_ITEM_TYPES_ENUM.SECTION) {
      str = 'menu.form.navigation.edit.section.dialog.title'
    } else if (type === NAVIGATION_ITEM_TYPES_ENUM.LINK) {
      str = 'menu.form.navigation.edit.link.button.label'
    }
    this.setState({
      editionData: {
        onDone: this.onEditDone,
        dialogTitleKey: str,
        item: getItemByPathIn(navigationItems, itemPath),
        itemPath,
        navigationItems: NavigationArrayFieldRender.packItemsForDialog(homeConfiguration.title, dynamicModules, navigationItems),
        hasHome: NavigationArrayFieldRender.hasHome(dynamicModules),
      },
    })
  }

  /**
   * On create section confirmed (edition dialog confirm callback)
   * @param {NavigationEditionItem} editedItem item as edited
   * @param {[number]} insertAtPath the path user selected for that item
   */
  onEditDone = (editedItem, insertAtPath) => {
    const { navigationItems } = this.props
    this.publishNewItems(moveItemAtPath(navigationItems, editedItem, insertAtPath))
    this.onEditClosed()
  }

  /**
   * On edit dialog closed
   */
  onEditClosed = () => this.setState({ editionData: null })

  /**
   * User asked to delete a section
   * @param {number} id : section id
   */
  onDeleteSection = (id) => {
    const { navigationItems, changeNavigationFieldValue } = this.props
    const sectionPath = getItemPathIn(navigationItems, { type: NAVIGATION_ITEM_TYPES_ENUM.SECTION, id })
    // 1 - gather all modules in section that will be deleted
    const sectionSubElements = sectionPath.reduce((itemsList, elementIndex) => itemsList[elementIndex].children, navigationItems)
    // 2 - we only want to get modules in the current section (we cannot use findAllModules)
    const reportedModules = sectionSubElements.filter((element) => element.type === NAVIGATION_ITEM_TYPES_ENUM.MODULE)
    // 3 - we only want to get sections in the current section (we cannot use findAllSections)
    const reportedSections = sectionSubElements.filter((element) => element.type === NAVIGATION_ITEM_TYPES_ENUM.SECTION)
    // 4 - We only want to get links in the current section (we cannot use findAllLinks)
    const reportedLinks = sectionSubElements.filter((element) => element.type === NAVIGATION_ITEM_TYPES_ENUM.LINK)
    // 5 - remove section in previous model
    const newNavigationItems = removeItemAt(navigationItems, sectionPath)
    // 6 - publish new field value with reported modules and without removed section and sub sections
    changeNavigationFieldValue([
      ...newNavigationItems, // report existing items as filtered
      ...reportedModules, // report the modules that were in the current section
      ...reportedSections, // report the sections that were in the current section
      ...reportedLinks, // report the links that were in the current section
    ])
  }

  /**
   * User asked to delete a link
   * @param {number} id : link id
   */
  onDeleteLink = (id) => {
    const { navigationItems, changeNavigationFieldValue } = this.props
    const linkPath = getItemPathIn(navigationItems, { type: NAVIGATION_ITEM_TYPES_ENUM.LINK, id })
    // 1 - remove link in previous model
    const newNavigationItems = removeItemAt(navigationItems, linkPath)
    // 2 - publish new field value
    changeNavigationFieldValue([
      ...newNavigationItems, // report existing items as filtered
    ])
  }

  /**
   * Publishes new items list in form
   * @param {[{NavigationEditionItem}]} newNavigationItems new items list
   */
  publishNewItems = (newNavigationItems) => this.props.changeNavigationFieldValue(newNavigationItems)

  render() {
    const {
      dynamicModules, homeConfiguration, navigationItems, roleList,
    } = this.props
    const { editionData } = this.state
    const { intl: { formatMessage }, moduleTheme: { admin: { navigation: { noElementMessageStyle } } } } = this.context

    return (
      <div>
        {/* insert edition dialog */}
        <NavigationItemEditionDialog roleList={roleList} onClose={this.onEditClosed} editionData={editionData} />
        { /* insert tree or no data view */
          navigationItems.length && dynamicModules.length ? (
            // Show navigation tree
            <NavigationTree
              homeConfiguration={homeConfiguration}
              navigationItems={navigationItems}
              dynamicModules={dynamicModules}
              onEdit={this.onEditItem}
              onCreateSection={this.onCreateSection}
              onDeleteSection={this.onDeleteSection}
              onCreateLink={this.onCreateLink}
              onDeleteLink={this.onDeleteLink}
            />) : (
              // no dynamic module found
              <div style={noElementMessageStyle}>{formatMessage({ id: 'menu.form.navigation.no.module.message' })}</div>
          )
        }
      </div>
    )
  }
}
export default NavigationArrayFieldRender
