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
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  InfiniteTableContainer, TableColumnBuilder, TableLayout, TableHeaderLine,
  TableHeaderContentBox, TableHeaderText, TableNoDataMessage,
} from '@regardsoss/components'
import RemoveOption from './RemoveOption'
import AttributeRender from './AttributeRender'
import RendererSelectionRender from './RendererSelectionRender'

/**
 * Renders selected attributes
 * @author Raphaël Mechali
 */
class SelectedAttributesTable extends React.Component {
  static propTypes = {
    allowRendererSelection: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    error: PropTypes.string,
    selectedAttributes: PropTypes.arrayOf(AccessShapes.AttributeConfigurationData).isRequired,
    attributeModels: DataManagementShapes.AttributeModelArray.isRequired,
    // remove selected attribute callback: (row:number) => ()
    onRendererSelected: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  }

  /** Empty table component */
  static EMPTY_COMPONENT = <TableNoDataMessage messageKey="attribute.configuration.selected.attributes.no.data" />

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Builds table columns
   * @return {[*]} built columns
   */
  buildColumns = () => {
    const {
      allowRendererSelection, attributeModels, onRendererSelected, onRemove,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return [
      // 1 - attribute label
      new TableColumnBuilder('attribute')
        .label(formatMessage({ id: 'attribute.configuration.selected.attributes.table.attribute.column' }))
        .rowCellDefinition({
          Constructor: AttributeRender,
          props: { attributeModels },
        }).titleHeaderCell()
        .build(),
      // 2 - Renderer selection if enabled
      allowRendererSelection ? new TableColumnBuilder('renderer')
        .label(formatMessage({ id: 'attribute.configuration.selected.attributes.table.renderer.column' }))
        .rowCellDefinition({
          Constructor: RendererSelectionRender,
          props: { attributeModels, onRendererSelected },
        }).titleHeaderCell()
        .build() : null,
      // 3 - Options
      new TableColumnBuilder().optionsColumn([{
        OptionConstructor: RemoveOption,
        optionProps: { onRemove },
      }]).build(),
    ].filter((c) => !!c)
  }

  render() {
    const { selectedAttributes, invalid, error } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <TableLayout>
        <TableHeaderLine>
          {/* 1 - Header message */}
          <TableHeaderContentBox>
            <TableHeaderText
              error={invalid}
              text={error || formatMessage(
                { id: 'attribute.configuration.selected.attributes.header' },
                { count: selectedAttributes.length })}
            />
          </TableHeaderContentBox>
        </TableHeaderLine>
        {/* 2 - Table render */}
        <InfiniteTableContainer
          minRowCount={5}
          maxRowCount={5}
          columns={this.buildColumns()}
          entities={selectedAttributes}
          emptyComponent={SelectedAttributesTable.EMPTY_COMPONENT}
        />
      </TableLayout>
    )
  }
}
export default SelectedAttributesTable
