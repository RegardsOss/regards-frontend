/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isNil from 'lodash/isNil'
import { TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import { themeContextType } from '@regardsoss/theme'
import { ScrollArea } from '@regardsoss/adapters'
import { TreeTableComponent, TreeTableRow } from '@regardsoss/components'
import { BROWSING_SECTIONS_ENUM } from '../../../domain/BrowsingSections'
import { DescriptionEntity } from '../../../shapes/DescriptionState'
import SectionCellComponent from './cells/links/SectionCellComponent'
import FileCellComponent from './cells/links/FileCellComponent'
import TagCellComponent from './cells/links/TagCellComponent'
import EntityCellComponent from './cells/links/EntityCellComponent'
import VersionCellComponent from './cells/links/VersionCellComponent'
import SearchEntityCellComponent from './cells/options/SearchEntityCellComponent'
import SearchTagCellComonent from './cells/options/SearchTagCellComonent'
import DownloadCellComponent from './cells/options/DownloadCellComponent'

/**
 * Component to display main browsing tree
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class BrowsingTreeComponent extends React.Component {
  static propTypes = {
    allowSearching: PropTypes.bool,
    browsingTreeVisible: PropTypes.bool.isRequired,
    descriptionEntity: DescriptionEntity.isRequired,
    scrollAreaHeight: PropTypes.number,
    // is description allowed function, like (entity: CatalogShapes.Entity) => (boolean)
    isDescriptionAllowed: PropTypes.func.isRequired,
    // Callback: user selected an inner link. (section:BROWSING_SECTION_ENUM, child: number) => ()
    onSelectInnerLink: PropTypes.func.isRequired,
    // Callback: user selected an entity link. (entity:CatalogShapes.Entity) => ()
    onSelectEntityLink: PropTypes.func.isRequired,
    // Callback: user searched for a word tag (tag:string) => ()
    onSearchWord: PropTypes.func.isRequired,
    // Callback: user searched for an entity tag (tag:CatalogShapes.Entity) => ()
    onSearchEntity: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /** Possible cell types */
  static CELL_TYPES = {
    // Cell for sections
    ...BROWSING_SECTIONS_ENUM,
    // Cells for sub sections
    FILE: 'FILE',
    DOWNLOAD_FILE: 'DOWNLOAD_FILE',
    ENTITY: 'ENTITY',
    SEARCH_ENTITY: 'SEARCH_ENTITY',
    VERSION: 'VERSION',
    TAG: 'TAG',
    SEARCH_TAG: 'SEARCH_TAG',
    EMPTY_CELL: 'EMPTY_CELL',
  }

  /** Cell types of cells to be displayed in option column */
  static OPTION_COLUMN_CELL_TYPES = [
    BrowsingTreeComponent.CELL_TYPES.DOWNLOAD_FILE,
    BrowsingTreeComponent.CELL_TYPES.SEARCH_ENTITY,
    BrowsingTreeComponent.CELL_TYPES.SEARCH_TAG,
    BrowsingTreeComponent.CELL_TYPES.EMPTY_CELL,
  ]

  /**
   * Empty cell model
   */
  static EMPTY_CELL_MODEL = {
    type: BrowsingTreeComponent.CELL_TYPES.EMPTY_CELL,
  }

  /** Static reference to tree columns, as they are unused by this component */
  static COLUMNS_FILLER = [<TableHeaderColumn key="firstColumnFiller" />, <TableHeaderColumn key="secondColumnFiller" />]

  /**
   * Return true if given cell type is in option column
   * @param {string} type cell type
   * @return {boolean} true when cell, by its type, is in option column
   */
  static isInOptionColumn(type) {
    return BrowsingTreeComponent.OPTION_COLUMN_CELL_TYPES.includes(type)
  }

  /**
   * Is entry selected?
   * @param {string} sectionType entry section type from  BROWSING_SECTIONS_ENUM
   * @param {number} childIndex child index (null / undefined for a section entry)
   * @param {*} selectedTreeEntry currently selected tree entry, matching DescriptionState.TreeEntryPointer shape
   * @return {boolean} true when entry is selected, false otherwise
   */
  static isSelectedEntry(sectionType, childIndex, selectedTreeEntry) {
    return sectionType === selectedTreeEntry.section
      && ((isNil(childIndex) && isNil(selectedTreeEntry.child))
      || childIndex === selectedTreeEntry.child)
  }

  /**
   * Builds a link section section row (no sub rows)
   * @param {string} type section type, from BROWSING_SECTIONS_ENUM
   * @param {*} selectedTreeEntry currently selected tree entry, matching DescriptionState.TreeEntryPointer shape
   * @return {TreeTableRow} built tree table row for section or null when not available
   */
  static buildLinkSectionRow(type, selectedTreeEntry) {
    return new TreeTableRow(`SECTION.${type}`, [{
      type,
      selected: BrowsingTreeComponent.isSelectedEntry(type, null, selectedTreeEntry),
    }, BrowsingTreeComponent.EMPTY_CELL_MODEL], [], true)
  }

  /**
   * Builds an elements list section row with sub rows
   * @param {string} type section type, from BROWSING_SECTIONS_ENUM
   * @param {string} childType child cell type, from BrowsingTreeComponent.CELL_TYPES
   * @param {[*]} list of elements to show in section
   * @param {Function} buildOptionCellModel function to build option, like (element: *) => (cellModel: *)
   * @param {*} selectedTreeEntry currently selected tree entry, matching DescriptionState.TreeEntryPointer shape
   * @return {TreeTableRow} built tree table row for section or null when not available
   */
  static buildlListSectionRow(type, childType, list, buildOptionCellModel, selectedTreeEntry) {
    if (list.length) {
      return new TreeTableRow(`SECTION.${type}`, [{
        type,
        selected: BrowsingTreeComponent.isSelectedEntry(type, null, selectedTreeEntry),
      },
      // Second cell: no option
      BrowsingTreeComponent.EMPTY_CELL_MODEL],
      list.map(
        (element, index) => new TreeTableRow(`ELEMENT.${type}.${childType}.${index}`, [{
          type: childType,
          parentType: type,
          childIndex: index,
          selected: BrowsingTreeComponent.isSelectedEntry(type, index, selectedTreeEntry),
          data: element,
        },
        // Second cell: option or empty cell
        (buildOptionCellModel && buildOptionCellModel(element)) || BrowsingTreeComponent.EMPTY_CELL_MODEL])),
      [], true)
    }
    return null
  }

  /**
   * Builds cell model for file download option
   * @param {*} file file matching DescrtipionState.FileData
   * @return built cell model
   */
  static buildFileOptionCellModel(file) {
    return { type: BrowsingTreeComponent.CELL_TYPES.DOWNLOAD_FILE, data: file }
  }

  /**
   * Builds cell model for tag search option
   * @param {string} tag file
   * @return built cell model
   */
  static buildTagOptionCellModel(tag) {
    return { type: BrowsingTreeComponent.CELL_TYPES.SEARCH_TAG, data: tag }
  }

  /**
   * Builds cell model for tag search option
   * @param {*} file file
   * @return built cell model
   */
  static buildEntityOptionCellModel(entity) {
    return { type: BrowsingTreeComponent.CELL_TYPES.SEARCH_ENTITY, data: entity }
  }

  /**
   * Builds tree table rows for current description entity model
   * @param {*} descriptionEntity matching DescriptionState.DescriptionEntity
   * @return {[*]} rows to display
   */
  buildTreeTableRows = ({
    selectedTreeEntry,
    displayModel: {
      descriptionFiles,
      quicklookFiles,
      otherFiles,
      wordTags,
      couplingTags,
      linkedEntities,
      linkedDocuments,
      otherVersions,
    },
  }) => [
    // 1 - Parameters section row
    BrowsingTreeComponent.buildLinkSectionRow(BROWSING_SECTIONS_ENUM.PARAMETERS, selectedTreeEntry),
    // 2 - Information files section if there are any
    BrowsingTreeComponent.buildlListSectionRow(
      BROWSING_SECTIONS_ENUM.INFORMATION, BrowsingTreeComponent.CELL_TYPES.FILE, descriptionFiles,
      BrowsingTreeComponent.buildFileOptionCellModel, selectedTreeEntry),
    // 3 - Quicklooks
    quicklookFiles.length ? BrowsingTreeComponent.buildLinkSectionRow(BROWSING_SECTIONS_ENUM.QUICKLOOKS, selectedTreeEntry) : null,
    // 4 - Simple tags
    BrowsingTreeComponent.buildlListSectionRow(
      BROWSING_SECTIONS_ENUM.SIMPLE_TAGS, BrowsingTreeComponent.CELL_TYPES.TAG, wordTags,
      BrowsingTreeComponent.buildTagOptionCellModel, selectedTreeEntry),
    // 5 - Linked entities
    BrowsingTreeComponent.buildlListSectionRow(
      BROWSING_SECTIONS_ENUM.LINKED_ENTITIES, BrowsingTreeComponent.CELL_TYPES.ENTITY, linkedEntities,
      BrowsingTreeComponent.buildEntityOptionCellModel, selectedTreeEntry),
    // 6 - Coupling tags
    BrowsingTreeComponent.buildlListSectionRow(
      BROWSING_SECTIONS_ENUM.COUPLED_TAGS, BrowsingTreeComponent.CELL_TYPES.TAG, couplingTags,
      BrowsingTreeComponent.buildTagOptionCellModel, selectedTreeEntry),
    // 7 - Linked documents
    BrowsingTreeComponent.buildlListSectionRow(
      BROWSING_SECTIONS_ENUM.LINKED_DOCUMENTS, BrowsingTreeComponent.CELL_TYPES.ENTITY, linkedDocuments,
      BrowsingTreeComponent.buildEntityOptionCellModel, selectedTreeEntry),
    // 8 - Other files
    BrowsingTreeComponent.buildlListSectionRow(
      BROWSING_SECTIONS_ENUM.FILES, BrowsingTreeComponent.CELL_TYPES.FILE,
      otherFiles, BrowsingTreeComponent.buildFileOptionCellModel, selectedTreeEntry),
    // 9 - Other entity versions
    BrowsingTreeComponent.buildlListSectionRow(
      BROWSING_SECTIONS_ENUM.OTHER_VERSIONS, BrowsingTreeComponent.CELL_TYPES.VERSION, otherVersions,
      null, selectedTreeEntry),
  ].filter((row) => !!row) // remove null rows

  /**
   * Builds a cell (here, first column as there is only one)
   * @param {*} cellValue cell value as built using buildTreeTableRows methods (and therefore buildSectionRow and buildPageRow)
   */
  buildCellComponent = ({
    type, parentType, childIndex, selected, data,
  }) => {
    const { moduleTheme: { user: { main: { tree: { cell } } } } } = this.context
    return (
      <TableRowColumn
        key={isNil(childIndex)
          ? `section.row.${parentType}`
          : `element.row.${parentType}[${childIndex}]`}
        // Ensure options cells size
        style={BrowsingTreeComponent.isInOptionColumn(type) ? cell.optionCell : null}
      >
        { // IIFE: return directly the right cell for element
        (() => {
          const {
            allowSearching, isDescriptionAllowed,
            onSearchWord, onSearchEntity,
            onSelectInnerLink, onSelectEntityLink,
          } = this.props

          switch (type) {
            case BrowsingTreeComponent.CELL_TYPES.PARAMETERS:
            case BrowsingTreeComponent.CELL_TYPES.INFORMATION:
            case BrowsingTreeComponent.CELL_TYPES.QUICKLOOKS:
            case BrowsingTreeComponent.CELL_TYPES.SIMPLE_TAGS:
            case BrowsingTreeComponent.CELL_TYPES.LINKED_ENTITIES:
            case BrowsingTreeComponent.CELL_TYPES.COUPLED_TAGS:
            case BrowsingTreeComponent.CELL_TYPES.LINKED_DOCUMENTS:
            case BrowsingTreeComponent.CELL_TYPES.FILES:
            case BrowsingTreeComponent.CELL_TYPES.OTHER_VERSIONS:
              return <SectionCellComponent type={type} selected={selected} onSelectInnerLink={onSelectInnerLink} />
            case BrowsingTreeComponent.CELL_TYPES.ENTITY:
              return <EntityCellComponent
                entity={data}
                isDescriptionAllowed={isDescriptionAllowed}
                onSelectEntityLink={onSelectEntityLink}
              />
            case BrowsingTreeComponent.CELL_TYPES.SEARCH_ENTITY:
              return allowSearching ? <SearchEntityCellComponent entity={data} onSearchEntity={onSearchEntity} /> : null
            case BrowsingTreeComponent.CELL_TYPES.TAG:
              return <TagCellComponent tag={data} />
            case BrowsingTreeComponent.CELL_TYPES.SEARCH_TAG:
              return allowSearching ? <SearchTagCellComonent tag={data} onSearchWord={onSearchWord} /> : null
            case BrowsingTreeComponent.CELL_TYPES.FILE:
              return (
                <FileCellComponent
                  type={parentType}
                  index={childIndex}
                  file={data}
                  selected={selected}
                  onSelectInnerLink={onSelectInnerLink}
                />)
            case BrowsingTreeComponent.CELL_TYPES.DOWNLOAD_FILE:
              return <DownloadCellComponent file={data} />
            case BrowsingTreeComponent.CELL_TYPES.VERSION:
              return <VersionCellComponent
                entity={data}
                onSelectEntityLink={onSelectEntityLink}
              />
            case BrowsingTreeComponent.CELL_TYPES.EMPTY_CELL:
              return null
            default:
              throw new Error(`Unhandled cell type ${type}`)
          }
        })()
      }
      </TableRowColumn>)
  }

  render() {
    const { browsingTreeVisible, descriptionEntity, scrollAreaHeight } = this.props
    const { moduleTheme: { user: { main: { tree: { scrollArea, scrollAreaContent } } } } } = this.context

    // Compute scroll height area
    const style = {
      ...scrollArea,
      height: scrollAreaHeight,
    }

    return browsingTreeVisible ? (
      <ScrollArea vertical stopScrollPropagation contentStyle={scrollAreaContent} style={style}>
        <TreeTableComponent
          model={descriptionEntity}
          buildTreeTableRows={this.buildTreeTableRows}
          buildCellComponent={this.buildCellComponent}
          columns={BrowsingTreeComponent.COLUMNS_FILLER}
          stripeLevelColors={false}
          displayTableRowBorder={false}
          hideHeader
        />
      </ScrollArea>
    ) : null
  }
}
export default BrowsingTreeComponent
