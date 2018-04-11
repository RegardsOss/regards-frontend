/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessDomain, UIDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../../domain/NavigationItemTypes'
import { HomeConfigurationShape, NavigationEditionItem } from '../../../shapes/ModuleConfiguration'
import {
  buildItemForModule, filterItems, findAllModules, findAllSections,
  getItemPathIn, getItemByPathIn, removeItemAt, moveItemAtPath,
} from '../../../domain/NavigationTreeHelper'
import NavigationTree from './NavigationTree'
import NavigationItemEditionDialog from './dialogs/NavigationItemEditionDialog'

/**
 * Array field to edit navigation model
 * @author Raphaël Mechali
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
      const { modules: newModulesWitoutHome, home: homeModule } =
        newModules.reduce(({ modules, home }, module) => {
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
      } else { // A section: pack children items too
        children = this.packItemsForDialog(homeTitle, dynamicModules, item.children)
      }
      return {
        ...item, description, title, children,
      }
    })
  }

  static propTypes = {
    locale: PropTypes.oneOf(UIDomain.LOCALES).isRequired, // locale (for titles display)
    dynamicModules: AccessShapes.ModuleArray,
    homeConfiguration: HomeConfigurationShape,
    navigationItems: PropTypes.arrayOf(NavigationEditionItem).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    changeNavigationFieldValue: PropTypes.func.isRequired, // used only in onPropertiesUpdated
  }


  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Initial state */
  state = {
    editionData: null,
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update this field value
   * */
  componentWillMount() {
    this.onPropertiesUpdated({}, this.props)
  }

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
    const { dynamicModules, navigationItems, changeNavigationFieldValue } = newProps
    // when modules are loaded, update conf (no problem here when there is no module, User application part will filter
    // missing modules)
    if (!isEqual(oldProps.dynamicModules, dynamicModules) && dynamicModules.length) {
      changeNavigationFieldValue(NavigationArrayFieldRender.updateEditionModel(navigationItems, dynamicModules))
    }
  }

  /**
   * User asked to create a section: initialize new section model and show edition dialog
   */
  onCreateSection = () => {
    const { homeConfiguration, dynamicModules, navigationItems } = this.props
    // 1 - get sections to generate a unique ID greater than the last known section
    const newSectionId = 1 + findAllSections(navigationItems).reduce((foundMax, sectionItem) =>
      sectionItem.id > foundMax ? sectionItem.id : foundMax, 0)
    // 2 - Pack edition data
    this.setState({
      editionData: {
        onDone: this.onEditDone,
        dialogTitleKey: 'menu.form.navigation.create.section.dialog.title',
        item: {
          id: newSectionId,
          type: NAVIGATION_ITEM_TYPES_ENUM.SECTION,
          icon: { type: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT, url: '' },
          title: { en: 'New section', fr: 'Nouvelle section' }, // no need for i18n here
          children: [],
        },
        itemPath: [navigationItems.length], // added at end by default
        navigationItems: NavigationArrayFieldRender.packItemsForDialog(homeConfiguration.title, dynamicModules, navigationItems),
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
    const isModule = type === NAVIGATION_ITEM_TYPES_ENUM.MODULE
    this.setState({
      editionData: {
        onDone: this.onEditDone,
        dialogTitleKey: isModule ? 'menu.form.navigation.edit.module.dialog.title' : 'menu.form.navigation.edit.section.dialog.title',
        item: getItemByPathIn(navigationItems, itemPath),
        itemPath,
        navigationItems: NavigationArrayFieldRender.packItemsForDialog(homeConfiguration.title, dynamicModules, navigationItems),
      },
    })
  }

  /**
   * On create section confirmed (edition dialog confirm callback)
   * @param {NavigationEditionItem} initialItem initial item
   * @param {[number]} insertAtPath the path user selected for that item
   * @param {{type:string, url: string}} icon edited icon (only for sections)
   * @param {{en:string, fr: string}} title edited title (only for sections)
   */
  onEditDone = (initialItem, insertAtPath, icon, title) => {
    const { navigationItems } = this.props
    const newItem = initialItem.type === NAVIGATION_ITEM_TYPES_ENUM.MODULE ?
      initialItem : { // merge section values
        ...initialItem,
        icon,
        title,
      }
    this.publishNewItems(moveItemAtPath(navigationItems, newItem, insertAtPath))
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
    const reportedModules = findAllModules(sectionSubElements)
    // 2 - remove section in previous model
    const newNavigationItems = removeItemAt(navigationItems, sectionPath)
    // 3 - publish new field value with reported modules and without removed section and sub sections
    changeNavigationFieldValue([
      ...newNavigationItems, // report existing items as filtered
      ...reportedModules, // report the modules that were in section at the end of the navigation tree
    ])
  }

  /**
   * Publishes new items list in form
   * @param {[{NavigationEditionItem}]} newNavigationItems new items list
   */
  publishNewItems = newNavigationItems => this.props.changeNavigationFieldValue(newNavigationItems)

  render() {
    const {
      dynamicModules, homeConfiguration, navigationItems, locale,
    } = this.props
    const { editionData } = this.state
    const { intl: { formatMessage }, moduleTheme: { admin: { navigation: { noElementMessageStyle } } } } = this.context

    return (
      <div>
        {/* insert edition dialog */}
        <NavigationItemEditionDialog onClose={this.onEditClosed} editionData={editionData} locale={locale} />
        {/* insert tree or no data view */}
        {
          navigationItems.length && dynamicModules.length ? (
            // Show navigation tree
            <NavigationTree
              homeConfiguration={homeConfiguration}
              navigationItems={navigationItems}
              dynamicModules={dynamicModules}
              locale={locale}
              onEdit={this.onEditItem}
              onCreateSection={this.onCreateSection}
              onDeleteSection={this.onDeleteSection}
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
