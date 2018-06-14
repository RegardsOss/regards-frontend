/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FlatButton from 'material-ui/FlatButton'
import AddItemIcon from 'material-ui/svg-icons/av/playlist-add'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  InfiniteTableContainer, TableColumnBuilder, TableLayout, TableHeaderLine,
  TableHeaderOptionsArea, TableHeaderContentBox, TableHeaderOptionGroup,
  StringValueRender, TableNoDataMessage,
} from '@regardsoss/components'
import AttributesListHeaderMessage from './AttributesListHeaderMessage'
import AttributesRender from './AttributesRender'
import DeleteOption from './options/DeleteOption'
import EditOption from './options/EditOption'


/**
 * This component shows currently configured attribute list and edition options in a table
 * @author Raphaël Mechali
 */
class AttributeListTableComponent extends React.Component {
  static propTypes = {
    hintMessageKey: PropTypes.string.isRequired,
    attributesList: AccessShapes.AttributeListConfigurationModel,
    attributeModels: DataManagementShapes.AttributeModelArray.isRequired,
    allowAttributesRegroupements: PropTypes.bool.isRequired,
    allowLabel: PropTypes.bool.isRequired,

    // callbacks
    // on show add dialog: () => ()
    onAdd: PropTypes.func.isRequired,
    // on show edit dialog: (itemIndex:number) => ()
    onEdit: PropTypes.func.isRequired,
    // on show delete dialog: (itemIndex:number) => ()
    onDelete: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Builds table columns
   * @return {[*]} Table columns
   */
  buildColumns = () => {
    const {
      allowAttributesRegroupements, attributeModels, allowLabel, onEdit, onDelete,
    } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const { fixedColumnsWidth } = muiTheme.components.infiniteTable
    return [
      // 1 - Direct label column (that renders attributes label) when label functionnality is disabled on columns
      TableColumnBuilder.buildSimpleColumnWithCell(
        'label', formatMessage({ id: 'attributes.configuration.label.simple.column' }), {
          Constructor: AttributesRender,
          props: {
            attributeModels,
          },
        }, 1, !allowLabel),
      // 2 - English label when label functionnality is enabled for columns
      TableColumnBuilder.buildSimplePropertyColumn(
        'label.en', formatMessage({ id: 'attributes.configuration.label.english.column' }), 'label.en',
        2, allowLabel, StringValueRender),
      // 3 - French label when label functionnality is enabled for columns
      TableColumnBuilder.buildSimplePropertyColumn(
        'label.fr', formatMessage({ id: 'attributes.configuration.label.french.column' }), 'label.fr',
        3, allowLabel, StringValueRender),
      // 4 - Attributes column, when groups are allowed
      TableColumnBuilder.buildSimpleColumnWithCell(
        'attributes', formatMessage({ id: 'attributes.configuration.attributes.column' }), {
          Constructor: AttributesRender,
          props: {
            attributeModels,
          },
        }, 4, allowAttributesRegroupements),
      // 5 - Options columns
      TableColumnBuilder.buildOptionsColumn(
        formatMessage({ id: 'attributes.configuration.options.column' }), [{
          // 1 - edit option
          OptionConstructor: EditOption,
          optionProps: { onEdit },
        }, {
          // 2 - delete option
          OptionConstructor: DeleteOption,
          optionProps: { onDelete },
        }], true, fixedColumnsWidth, 'options', 5),
    ]
  }

  render() {
    const { hintMessageKey, attributesList, onAdd } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <TableLayout>
        <TableHeaderLine>
          {/* 1 - columns / elements count */}
          <TableHeaderContentBox>
            <AttributesListHeaderMessage
              count={attributesList.length}
            />
          </TableHeaderContentBox >
          {/* 2 - table options  */}
          <TableHeaderOptionsArea >
            <TableHeaderOptionGroup>
              {/* Add element  */}
              <FlatButton
                label={formatMessage({ id: 'attributes.configuration.add.item.label' })}
                icon={<AddItemIcon />}
                onClick={onAdd}
              />
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea >
        </TableHeaderLine>
        <InfiniteTableContainer
          columns={this.buildColumns()}
          emptyComponent={<TableNoDataMessage messageKey={hintMessageKey} />}
          entities={attributesList}
          minRowCount={0} // let the table grow and shrink with list elements count
          maxRowCount={Number.MAX_SAFE_INTEGER}
        />
      </TableLayout>
    )
  }
}
export default AttributeListTableComponent
