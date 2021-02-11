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
import { TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import { themeContextType } from '@regardsoss/theme'
import { TreeTableComponent, TreeTableRow } from '@regardsoss/components'
import { FormSection } from '../../../shapes/form/FormSections'
import { FORM_SECTIONS_ENUM } from '../../../domain/form/FormSectionsEnum'
import BrowsingTreeCellComponent from './BrowsingTreeCellComponent'

/**
 * Left browsing edition tree for module
 * @author Raphaël Mechali
 */
class BrowsingTreeComponent extends React.Component {
  static propTypes = {
    // navigation data
    navigationSections: PropTypes.arrayOf(FormSection).isRequired,
    // browse to page callback (section, page) => ()
    onBrowseToPage: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /** Static reference to tree columns, as they are unused by this component */
  static COLUMNS_FILLER = [<TableHeaderColumn key="singleColumnFiller" />]

  /**
   * Builds tree table rows
   * @param {[*]} navigationSections navigation sections as array (respects input prop type)
   * @return {[TreeTableRow]} tree table rows
   */
  buildTreeTableRows = (navigationSections) => navigationSections.map(this.buildSectionRow)

  /**
   * Builds tree table section row
   * @param {*} navigationSection navigation section, matching FormSection shape
   * @return {TreeTableRow} tree table row, where cells are an array of objects like: { section: FormSection, page: FormPage} (nota: page is null if section should be shown as parent)
   */
  buildSectionRow = (navigationSection) => {
    // 1 - specific cases: single section pages
    if (navigationSection.type === FORM_SECTIONS_ENUM.MAIN
      || navigationSection.type === FORM_SECTIONS_ENUM.RESTRICTIONS
      || navigationSection.type === FORM_SECTIONS_ENUM.FILTERS
      || navigationSection.type === FORM_SECTIONS_ENUM.SEARCH) {
      // build section row using page builder
      return this.buildPageRow(navigationSection, navigationSection.pages[0])
    }
    // 2 - common case: build a section with pages below
    return new TreeTableRow(navigationSection.type, [{ section: navigationSection }],
      navigationSection.pages.map((page) => this.buildPageRow(navigationSection, page)), true)
  }

  /**
   * Builds tree table page row
   * @param {*} section parent section, matches FormSection
   * @param {*} page page model for that row
   * @return {TreeTableRow}
   */
  buildPageRow = (section, page) => new TreeTableRow(`${section.type}/${page.type}`, [{ section, page }])

  /**
   * Builds a cell (here, first column as there is only one)
   * @param {*} cellValue cell value as built using buildTreeTableRows methods (and therefore buildSectionRow and buildPageRow)
   */
  buildCellComponent = ({ section, page }, level) => (
    <TableRowColumn key={`${section.type}/${page ? page.type : 'ROOT'}`}>
      <BrowsingTreeCellComponent
        section={section}
        page={page}
        level={level}
      />
    </TableRowColumn>)

  /**
   * A tree cell was clicked: provided
   * @param {TreeTableRow} row clicked row model
   * @param {*} cellData clicked cell data, as built previous
   */
  onCellClicked = (row, { section, page }) => {
    // notify parent that user clicked a navigable section, if it is navigable
    const { onBrowseToPage } = this.props
    // avoid selecting section or reselecting pages already selected
    if (page && !page.selected) {
      onBrowseToPage(section, page)
    }
  }

  render() {
    const { navigationSections } = this.props
    const { moduleTheme: { configuration: { tree: { table } } } } = this.context
    return (
      <TreeTableComponent
        model={navigationSections}
        buildTreeTableRows={this.buildTreeTableRows}
        buildCellComponent={this.buildCellComponent}
        columns={BrowsingTreeComponent.COLUMNS_FILLER}
        onCellClick={this.onCellClicked}
        stripeLevelColors={false}
        displayTableRowBorder={false}
        style={table}
        hideHeader
      />
    )
  }
}
export default BrowsingTreeComponent
