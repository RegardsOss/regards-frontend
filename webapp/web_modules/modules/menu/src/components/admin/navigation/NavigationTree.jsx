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
import isNumber from 'lodash/isNumber'
import { TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import { AccessDomain, UIDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  TreeTableComponent, TreeTableRow, ModuleIcon, ModuleTitleText,
} from '@regardsoss/components'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../../domain/NavigationItemTypes'
import { HOME_ICON_TYPES_ENUM } from '../../../domain/HomeIconType'
import { HomeConfigurationShape, NavigationEditionItem } from '../../../shapes/ModuleConfiguration'
import NewSectionOption from './options/NewSectionOption'
import EditOption from './options/EditOption'
import DeleteOption from './options/DeleteSectionOption'
import NewLinkOption from './options/NewLinkOption'
import DeleteLinkOption from './options/DeleteLinkOption'
import defaultHomeIconURL from '../../../img/home.svg'
import defaultSectionIconURL from '../../../img/section.svg'
import defaultLinkIconURL from '../../../img/link.svg'
import { VISIBILITY_MODES_ENUM } from '../../../domain/VisibilityModes'

/** Possible items warnings */
const ITEM_WARNINGS_ENUM = {
  NONE: 'NONE',
  DISABLED_MODULE: 'DISABLED_MODULE',
  EMPTY_SECTION: 'EMPTY_SECTION',
}

/**
 * Shows navigation edition tree
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class NavigationTree extends React.Component {
  static propTypes = {
    homeConfiguration: HomeConfigurationShape,
    dynamicModules: AccessShapes.ModuleArray,
    navigationItems: PropTypes.arrayOf(NavigationEditionItem).isRequired,
    // on create section callback: () => {}
    onCreateSection: PropTypes.func.isRequired,
    // on edit callback: (id, itemType) => {}
    onEdit: PropTypes.func.isRequired,
    // on delete section callback: (id) => {}
    onDeleteSection: PropTypes.func.isRequired,
    onCreateLink: PropTypes.func.isRequired,
    onDeleteLink: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Holds columns index */
  static COLUMNS_INDEX = {
    ICON_AND_TITLE: 0,
    TYPE: 1,
    VISIBILITY: 2,
    WARNINGS: 3,
    EDIT_OPTION: 4,
    DELETE_OPTION: 5,
  }

  /**
   * Builds a link tree table row
   * @param {EditionModule} moduleItem module item
   * @return {TreeTableRow} built row
   */
  static buildLinkTreeTableRow({
    id, title, icon,
    visibilityMode, visibleForRole,
  }) {
    return new TreeTableRow(`link.${id}`, [
      {
        iconCellValue: { defaultIconURL: defaultLinkIconURL, iconDisplayMode: icon.type, customIconURL: icon.url },
        titleCellValue: { title },
      },
      { type: NAVIGATION_ITEM_TYPES_ENUM.LINK, parameter: null },
      { visibilityMode, visibleForRole },
      ITEM_WARNINGS_ENUM.NONE,
      { type: NAVIGATION_ITEM_TYPES_ENUM.LINK, id, canEdit: true }, // edit options parameters
      { id, type: NAVIGATION_ITEM_TYPES_ENUM.LINK }, // delete options parameters
    ])
  }

  /**
   * Builds a module tree table row
   * @param {EditionModule} moduleItem module item
   * @return {TreeTableRow} built row
   */
  static buildModuleTreeTableRow({ id, visibilityMode, visibleForRole }, dynamicModules, homeConfiguration) {
    // 1 - retrieve corresponding module
    const moduleModel = dynamicModules.find(({ content: { id: moduleId } }) => moduleId === id)
    if (!moduleModel) { // happens only while parent field is changing value
      return null
    }

    // 2 - resolve icon (taking home fields in account)
    const moduleIconCell = {
      defaultIconURL: UIDomain.getModuleDefaultIconURL(moduleModel.content.type),
      iconDisplayMode: get(moduleModel, 'content.page.iconType', AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT),
      moduleCustomIconURL: get(moduleModel, 'content.page.customIconURL', AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT),
    }
    // for modules that are not home: default to module props
    let iconCellValue = moduleIconCell
    const titleCellValue = {
      title: get(moduleModel, 'content.page.title'),
      description: get(moduleModel, 'content.description'),
    }
    const isHome = get(moduleModel, 'content.page.home', false)
    if (isHome) {
      // for home module, use home configuration directly (note: we need here to redirect onto a module icon)
      let defaultIconURL = defaultHomeIconURL
      let iconDisplayMode
      let customIconURL = null
      switch (homeConfiguration.icon.type) {
        case HOME_ICON_TYPES_ENUM.CUSTOM_URL_ICON:
          // Home custom icon URL
          iconDisplayMode = AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.CUSTOM
          customIconURL = homeConfiguration.icon.url
          break
        case HOME_ICON_TYPES_ENUM.MODULE_ICON:
          // Module (might be any module configuration, just report it)
          defaultIconURL = moduleIconCell.defaultIconURL
          iconDisplayMode = moduleIconCell.iconDisplayMode
          customIconURL = moduleIconCell.customIconURL
          break
        case HOME_ICON_TYPES_ENUM.NONE:
          iconDisplayMode = AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.NONE
          break
        case HOME_ICON_TYPES_ENUM.DEFAULT_HOME_ICON:
        default:
          iconDisplayMode = AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT
      }
      iconCellValue = { iconDisplayMode, defaultIconURL, customIconURL } // cell value is ModuleIcon component pamareters
      titleCellValue.title = homeConfiguration.title
    }

    return new TreeTableRow(`module.${id}`, [
      { iconCellValue, titleCellValue },
      { type: NAVIGATION_ITEM_TYPES_ENUM.MODULE, moduleType: get(moduleModel, 'content.type') }, // Type (with module type as parameter)
      { visibilityMode, visibleForRole },
      get(moduleModel, 'content.active') ? ITEM_WARNINGS_ENUM.NONE : ITEM_WARNINGS_ENUM.DISABLED_MODULE,
      { type: NAVIGATION_ITEM_TYPES_ENUM.MODULE, id, canEdit: !isHome },
      {}, // delete options parameters: none for modules
    ])
  }

  /**
   * Builds table columns
   * @return [React.Component] built elements
   */
  buildColumns = () => {
    const { intl: { formatMessage }, moduleTheme: { admin: { navigation: { table: { optionColumnStyle } } } } } = this.context
    return [
      // 1 - Title fr column
      <TableHeaderColumn key="icon">{formatMessage({ id: 'menu.form.navigation.table.column.title.label' })}</TableHeaderColumn>,
      // 2 - Type column (module type / column)
      <TableHeaderColumn key="type">{formatMessage({ id: 'menu.form.navigation.table.column.type.label' })}</TableHeaderColumn>,
      // 3 - Visibility mode column
      <TableHeaderColumn key="visibilty">{formatMessage({ id: 'menu.form.navigation.table.column.visibility.label' })}</TableHeaderColumn>,
      // 4 - Warning column
      <TableHeaderColumn key="warnings">{formatMessage({ id: 'menu.form.navigation.table.column.warnings.label' })}</TableHeaderColumn>,
      // 5 - Edit option column
      <TableHeaderColumn key="edit.option" style={optionColumnStyle} />,
      // 6 - Delete option column
      <TableHeaderColumn key="delete.option" style={optionColumnStyle} />,
    ]
  }

  /**
   * Builds tree table rows from model (the fields). Note: it is recusively called by the buildSectionTreeTableRow function
   * @param {[NavigationEditionItem]} navigationEditionItems navigation items (initially redux form fields)
   * @return {[TreeTableRow]} built rows
   */
  buildTreeTableRows = (navigationItems) => navigationItems.map((item) => {
    const { dynamicModules, homeConfiguration } = this.props
    switch (item.type) {
      case NAVIGATION_ITEM_TYPES_ENUM.MODULE:
        return NavigationTree.buildModuleTreeTableRow(item, dynamicModules, homeConfiguration)
      case NAVIGATION_ITEM_TYPES_ENUM.SECTION:
        return this.buildSectionTreeTableRow(item)
      case NAVIGATION_ITEM_TYPES_ENUM.LINK:
        return NavigationTree.buildLinkTreeTableRow(item)
      default:
        throw new Error(`Unknown field type ${item.type} in field ${JSON.stringify(item)}`)
    }
  }).filter((row) => !!row) // delete here the elements that could not be retrieved (temporary state)

  /**
   * Builds a section tree table row
   * @param {EditionModule} moduleItem module item
   * @return {TreeTableRow} built row with sub rows
   */
  buildSectionTreeTableRow = ({
    id, title, icon,
    visibilityMode, visibleForRole,
    children,
  }) => new TreeTableRow(`section.${id}`, [
    {
      iconCellValue: { defaultIconURL: defaultSectionIconURL, iconDisplayMode: icon.type, customIconURL: icon.url },
      titleCellValue: { title },
    },
    { type: NAVIGATION_ITEM_TYPES_ENUM.SECTION, parameter: null },
    { visibilityMode, visibleForRole },
    this.hasActiveChild(children) ? ITEM_WARNINGS_ENUM.NONE : ITEM_WARNINGS_ENUM.EMPTY_SECTION,
    { type: NAVIGATION_ITEM_TYPES_ENUM.SECTION, id, canEdit: true }, // edit options parameters
    { id, type: NAVIGATION_ITEM_TYPES_ENUM.SECTION }, // delete options parameters
  ], this.buildTreeTableRows(children), true) // build sub rows recursively

  /**
   * Searches in a section items to find an active child
   * @param {[NavigationEditionItem]} items items to search
   * @return {boolean} true if at least one module is active in section
   */
  hasActiveChild = (items) => {
    const { dynamicModules } = this.props
    return !!items.find((currentChild) => {
      switch (currentChild.type) {
        case NAVIGATION_ITEM_TYPES_ENUM.MODULE: {
          const model = dynamicModules.find(({ content: { id } }) => currentChild.id === id)
          return get(model, 'content.active', false)
        }
        case NAVIGATION_ITEM_TYPES_ENUM.SECTION: {
          return this.hasActiveChild(currentChild.children) // search in sub section items
        }
        case NAVIGATION_ITEM_TYPES_ENUM.LINK: {
          return true
        }
        default: {
          throw new Error(`Unknown navigation item type ${currentChild.type} in ${JSON.stringify(currentChild)}`)
        }
      }
    })
  }

  /**
   * Renders the cell for a given cell value, et level and column as parameter
   * @param {*} value cell value
   * @param {number} level level in tree
   * @param {number} column current column
   * @return {React.Component} built component
   */
  renderCellComponent = (value, level, column) => {
    const {
      intl: { formatMessage }, moduleTheme: {
        admin: {
          navigation: {
            table: { iconStyle, optionColumnStyle, warningCell },
          },
        },
      },
    } = this.context
    const { onEdit, onDeleteSection, onDeleteLink } = this.props
    let cellContent = null
    let cellStyle
    switch (column) {
      case NavigationTree.COLUMNS_INDEX.TYPE: {
        if (value.type === NAVIGATION_ITEM_TYPES_ENUM.SECTION) {
          cellContent = formatMessage({ id: 'menu.form.navigation.table.column.type.section.message' })
        } else if (value.type === NAVIGATION_ITEM_TYPES_ENUM.MODULE) {
          cellContent = formatMessage({ id: 'menu.form.navigation.table.column.type.module.message' }, { moduleType: value.moduleType })
        } else {
          cellContent = formatMessage({ id: 'menu.form.navigation.table.column.type.link.message' })
        }
        break
      }
      case NavigationTree.COLUMNS_INDEX.ICON_AND_TITLE: {
        // show both icon and title
        cellContent = (
          <div>
            <ModuleIcon style={iconStyle} {...value.iconCellValue} />
            <ModuleTitleText {...value.titleCellValue} />
          </div>)
        break
      }
      case NavigationTree.COLUMNS_INDEX.VISIBILITY: {
        switch (value.visibilityMode) {
          case VISIBILITY_MODES_ENUM.ALWAYS:
            cellContent = formatMessage({ id: 'menu.form.navigation.table.column.visibility.always.message' })
            break
          case VISIBILITY_MODES_ENUM.NEVER:
            cellContent = formatMessage({ id: 'menu.form.navigation.table.column.visibility.never.message' })
            break
          default:
            cellContent = formatMessage({ id: 'menu.form.navigation.table.column.visibility.for.profile.message' }, { role: value.visibleForRole })
        }
        break
      }
      case NavigationTree.COLUMNS_INDEX.WARNINGS: {
        switch (value) {
          case ITEM_WARNINGS_ENUM.DISABLED_MODULE: {
            cellContent = formatMessage({ id: 'menu.form.navigation.table.column.warnings.disabled.message' })
            cellStyle = warningCell
            break
          }
          case ITEM_WARNINGS_ENUM.EMPTY_SECTION: {
            cellContent = formatMessage({ id: 'menu.form.navigation.table.column.warnings.empty.section.message' })
            cellStyle = warningCell
            break
          }
          default: {
            cellContent = formatMessage({ id: 'menu.form.navigation.table.column.warnings.none.message' })
          }
        }
        break
      }
      case NavigationTree.COLUMNS_INDEX.EDIT_OPTION: {
        cellContent = <EditOption onEdit={onEdit} {...value} />
        cellStyle = optionColumnStyle
        break
      }
      case NavigationTree.COLUMNS_INDEX.DELETE_OPTION: {
        if (value.type === NAVIGATION_ITEM_TYPES_ENUM.SECTION) {
          cellContent = isNumber(value.id) ? <DeleteOption id={value.id} onDeleteSection={onDeleteSection} /> : null
        } else if (value.type === NAVIGATION_ITEM_TYPES_ENUM.LINK) {
          cellContent = isNumber(value.id) ? <DeleteLinkOption id={value.id} onDeleteLink={onDeleteLink} /> : null
        }
        cellStyle = optionColumnStyle
        break
      }
      default: {
        throw new Error(`Unknown column index ${column}`)
      }
    }
    return (
      <TableRowColumn style={cellStyle} key={`cell-${column}`}>
        {cellContent}
      </TableRowColumn>)
  }

  render() {
    const { onCreateSection, navigationItems, onCreateLink } = this.props
    const { moduleTheme: { admin: { navigation: { table: { style }, buttonsGrid: { displayStyle } } } } } = this.context
    return (
      <div style={style}>
        <TreeTableComponent
          model={navigationItems}
          buildTreeTableRows={this.buildTreeTableRows}
          buildCellComponent={this.renderCellComponent}
          columns={this.buildColumns()}
        />
        <div style={displayStyle}>
          <NewSectionOption onCreateSection={onCreateSection} />
          <NewLinkOption onCreateLink={onCreateLink} />
        </div>
      </div>
    )
  }
}

export default NavigationTree
